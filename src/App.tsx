import React, { useEffect, useRef, useState } from "react";
import Routes from "Routes";
import DashBoard from "layouts";
import { Modal, CircularProgress, styled, useMediaQuery, CssBaseline } from "@material-ui/core";

import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  isWebState,
  quizState,
  userInfoState,
  isLoadingState,
  userAnswerState,
  timerState,
  commonDataState,
  isOpenState,
} from "state";

import { Auth, CurrentAuthUiState, AuthType, UserState } from "@psyrenpark/auth";
import Amplify, { PubSub, Auth as AuthToAmplify, I18n } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import { apiObject } from "./api";

import { Analytics, AWSKinesisFirehoseProvider } from "aws-amplify";
import { lang_package } from "data";

import { sendErrorLog, sleep } from "common";
import useAllState from "customHook/useAllState";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& .MuiCircularProgress-root": {
    outline: "none",
  },
});

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: "ap-northeast-1",
    aws_pubsub_endpoint: "wss://a1k6gboano130t-ats.iot.ap-northeast-1.amazonaws.com/mqtt",
    // aws_pubsub_endpoint: "wss://a1k6gboano130뷁-ats.iot.ap-northeast-1.amazonaws.com/mqtt",
    // aws_pubsub_endpoint:
    //   "wss://a2ji02xj2bqswr-ats.iot.ap-southeast-2.amazonaws.com/mqtt",
  }),
);

PubSub.configure({});
let current: any = null;

const App = () => {
  const mySubscribeRef = useRef(current);
  const [quiz, setQuiz] = useRecoilState(quizState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const setTimer = useSetRecoilState(timerState);
  const isLoading = useRecoilValue(isLoadingState);
  const [commonData, setCommonData] = useRecoilState(commonDataState);
  const setIsOpen = useSetRecoilState(isOpenState);
  const [isPooling, setIsPooling] = useState(false);

  const [testData, setTestData] = useState("");

  const isWeb = useMediaQuery("(min-width:601px)");
  const setIsWeb = useSetRecoilState(isWebState);

  const [getAllState] = useAllState();

  const checkAuth = async () => {
    console.log("auth check");
    try {
      let auth = await Auth.currentSession();
    } catch (error) {}
  };

  const getSavedData = () => {
    const savedUserInfo = JSON.parse(window.localStorage.getItem("bde_userInfo") || "{}");
    const savedUserAnswer = JSON.parse(window.localStorage.getItem("bde_userAnswer") || "{}");

    setUserAnswer(savedUserAnswer);
    setUserInfo(savedUserInfo);
  };

  const getQuizStatus = async () => {
    try {
      const resp: any = await apiObject.getQuizStatus({ locale: "ko" });
      let { quiz_status, quiz_data, is_open } = resp;
      quiz_status = quiz_status.replace(/_[\d]+$/, "");

      if (quiz_status === "EVENT_QUIZ_QUESTION") {
        let elapsed_time = Math.floor((Date.now() - quiz_data.time) / 1000);
        setTimer(Math.max(60 - elapsed_time, 0));
      }

      setQuiz({
        data: quiz_data,
        status: quiz_status,
      });
      setIsOpen(is_open);

      // throw new Error();
    } catch (error) {
      const state = getAllState();
      sendErrorLog("App.tsx", "getQuizStatus", error, state);
    }
  };

  const _mqttSubscribe = async () => {
    await getQuizStatus();

    if (mySubscribeRef?.current) {
      return null;
    }

    mySubscribeRef.current = PubSub.subscribe("bde_quiz").subscribe({
      start: (aa) => {
        console.log("aa", aa);
      },
      next: (resp) => {
        let { quiz_status, quiz_data } = resp.value;
        quiz_status = quiz_status.replace(/_[\d]+$/, "");

        console.log("next status received");
        console.log(quiz_status);

        if (quiz_status === "EVENT_QUIZ_QUESTION") {
          let elapsed_time = Math.floor((Date.now() - quiz_data.time) / 1000);
          setTimer(Math.max(60 - elapsed_time, 0));
        }

        setQuiz({ data: quiz_data, status: quiz_status });
      },
      error: (error) => {
        console.log("mqtt subscribe error");

        const state = getAllState();
        sendErrorLog("App.tsx", "PubSub subscribe", error, state);
      },
    });
  };

  const recursiveMqttSubscribe = async (retries: number) => {
    if (mySubscribeRef?.current) return;
    if (retries >= 2) {
      setIsPooling(true);
      return;
    }

    await getQuizStatus();

    mySubscribeRef.current = PubSub.subscribe("bde_quiz").subscribe({
      start: (aa) => {
        console.log("aa", aa);
      },
      next: (resp) => {
        let { quiz_status, quiz_data } = resp.value;
        quiz_status = quiz_status.replace(/_[\d]+$/, "");

        console.log("next status received");
        console.log(quiz_status);

        if (quiz_status === "EVENT_QUIZ_QUESTION") {
          let elapsed_time = Math.floor((Date.now() - quiz_data.time) / 1000);
          setTimer(Math.max(60 - elapsed_time, 0));
        }

        setQuiz({ data: quiz_data, status: quiz_status });
      },
      error: (error) => {
        console.log("mqtt subscribe error");

        const state = getAllState();
        sendErrorLog("App.tsx", "PubSub subscribe", error, state);
        mySubscribeRef.current = null;

        sleep(100);
        recursiveMqttSubscribe(retries + 1);
      },
    });
  };

  const _mqttRelease = () => {
    if (mySubscribeRef?.current) {
      mySubscribeRef.current.unsubscribe();
      mySubscribeRef.current = null;
    }
  };

  const getCommonData = async () => {
    try {
      let data: any = await apiObject.getCommonData();

      setCommonData(data.data);
      I18n.putVocabularies(data.data.lang_info_dic);
      // throw new Error();
    } catch (error) {
      console.log({ error });
      const state = getAllState();
      sendErrorLog("App.tsx", "getCommonData", error, state);
    }
  };

  function poolQuizStatus(callback: any, cycle: number, range: number) {
    if (isPooling) {
      setTimeout(() => {
        callback();
        poolQuizStatus(callback, cycle, range);
      }, (cycle - range + Math.random() * 2 * range) * 1000);
    }
  }

  const networkAlert = () => {
    alert("Your network connection is unstable. Please refresh the current page in your browser.");
  };

  useEffect(() => {
    Analytics.addPluggable(new AWSKinesisFirehoseProvider());

    Analytics.configure({
      AWSKinesisFirehose: {
        // OPTIONAL -  Amazon Kinesis Firehose service region
        region: "ap-northeast-1",

        // OPTIONAL - The buffer size for events in number of items.
        bufferSize: 5000,

        // OPTIONAL - The number of events to be deleted from the buffer when flushed.
        flushSize: 100,

        // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
        flushInterval: 300, // 5s

        // OPTIONAL - The limit for failed recording retries.
        resendLimit: 5,
      },
    });
  }, []);

  useEffect(() => {
    setIsWeb(isWeb);
  }, [isWeb]);

  useEffect(() => {
    if (userInfo.uuid) {
      // _mqttSubscribe();
      recursiveMqttSubscribe(0);
    }
  }, [userInfo.uuid]);

  useEffect(() => {
    I18n.setLanguage(userInfo.lang || "en");
  }, [userInfo.lang]);

  useEffect(() => {
    poolQuizStatus(getQuizStatus, 2, 1);
  }, [isPooling]);

  useEffect(() => {
    checkAuth();
    getSavedData();
    getCommonData();
    getQuizStatus();

    window.addEventListener("focus", getQuizStatus);
    window.addEventListener("offline", networkAlert);

    return () => {
      _mqttRelease();
      window.removeEventListener("focus", getQuizStatus);
      window.removeEventListener("offline", networkAlert);
    };
  }, []);

  // testing tool
  useEffect(() => {
    setTestData(
      JSON.stringify({
        uuid: userInfo.uuid,
        quis_status: quiz.status,
        is_subscribed: !isPooling,
      }),
    );
  }, [userInfo.uuid, quiz.status, isPooling]);

  return (
    <DashBoard>
      {/* testing tool */}
      <p data-testid="testdata" style={{ position: "absolute", display: "none" }}>
        {testData}
      </p>
      <CssBaseline />
      <StyledModal open={isLoading}>
        <CircularProgress color="primary" />
      </StyledModal>

      <Routes />
    </DashBoard>
  );
};

export default App;
