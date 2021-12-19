import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { isWebState, userInfoState, userAnswerState, quizState } from "state";

import { Box } from "@material-ui/core";
import { Typography } from "components/Mui";
import { Image, RatioBox } from "components";

import { apiObject } from "api";
import { I18n } from "aws-amplify";

import { sendErrorLog } from "common";
import useAllState from "customHook/useAllState";

export const CheckContent: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);
  const { uuid } = useRecoilValue(userInfoState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const [getAllState] = useAllState();

  async function handleAnswer(answer: number) {
    if (userAnswer[quiz.data.quiz_no] === answer) return;

    try {
      const userQuiz = await apiObject.putUserQuiz({
        choice: answer,
        quiz_no: quiz.data.quiz_no,
        user_uuid: uuid,
      });

      let curAnswer = {
        ...userAnswer,
        [quiz.data.quiz_no]: answer,
      };

      window.localStorage.setItem("bde_userAnswer", JSON.stringify(curAnswer));
      setUserAnswer(curAnswer);
      // throw new Error();
    } catch (error) {
      const state = getAllState();
      sendErrorLog("CheckContent.tsx", "putUserQuiz", error, state);
    }
  }

  useEffect(() => {
    if (!userAnswer[+quiz.data.quiz_no]) {
      handleAnswer(-1);
    }
  }, []);

  return (
    <Box py={4} display="flex" flexDirection={isWeb ? "row" : "column"} justifyContent="center" alignItems="center">
      <RatioBox width="4rem" ratio={0.76}>
        <Image src="/image/wait.png" />
      </RatioBox>
      <Typography ml={{ xs: 0, sm: 2 }} mt={{ xs: 2, sm: 0 }} variant={isWeb ? "h4" : "h5"} color="primary">
        {I18n.get(`L00032`)}
      </Typography>
    </Box>
  );
};
