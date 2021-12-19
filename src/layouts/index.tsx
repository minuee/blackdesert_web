import React, { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { isWebState, quizState, userInfoState, userAnswerState, timerState } from "state";

import { makeStyles, Box, AppBar, Container, RootRef } from "@material-ui/core";
import { Button } from "components/Mui";
import { Image, RatioBox } from "components";

import { handleFullscreen } from "common";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minHeight: "100vh",

    "& > *": {
      width: "100%",
    },
  },
}));

const Dashboard: React.FC = ({ children }) => {
  const classes = useStyles();
  const rootRef = useRef<any>(null);

  const [quiz, setQuiz] = useRecoilState(quizState);
  const isWeb = useRecoilValue(isWebState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const { lang, platform, nickname } = userInfo;
  const isIntro = !(lang && platform);
  const isQuiz = lang && platform && nickname && quiz.status !== "EVENT_DEFAULT" && quiz.status !== "EVENT_WAIT";

  function handleReset() {
    window.localStorage.removeItem("bde_userInfo");
    window.localStorage.removeItem("bde_userAnswer");

    setUserInfo({ lang: "", platform: "", nickname: "", uuid: "" });
    setUserAnswer({});
    setQuiz({
      data: {},
      status: "EVENT_DEFAULT",
    });
  }

  return (
    <RootRef rootRef={rootRef}>
      <Image
        src={`/image/main_background_${isWeb ? "web" : "mobile"}.png`}
        objectFit="cover"
        objectPosition={isWeb ? "center" : "0 center"}
        position="relative"
        height="unset"
      >
        <AppBar color="secondary" style={{ display: isIntro ? "none" : undefined }}>
          <Box p={2} display="flex" justifyContent={isWeb ? "flex-start" : "center"}>
            <RatioBox width={isWeb ? "300px" : "60%"} ratio={12}>
              <Image src="/image/header.png" objectFit="contain" />
            </RatioBox>
          </Box>
        </AppBar>

        <Container maxWidth={!isQuiz ? "md" : "lg"} disableGutters={!isWeb} className={classes.content}>
          {!isIntro && (
            // header placeholder
            <Box py={2}>
              <RatioBox width={isWeb ? "300px" : "60%"} ratio={12} />
            </Box>
          )}

          <Box display="flex" flexDirection="column" flex={1} py={2}>
            {children}
          </Box>

          {isWeb && !isQuiz && (
            <Box py={2}>
              <RatioBox width={isWeb ? "20rem" : "50%"} ratio={6} mx="auto">
                <Image src={`/image/logo_black.png`} />
              </RatioBox>
            </Box>
          )}
          {!isWeb && (
            <Box py={2}>
              <RatioBox width={isWeb ? "20rem" : "50%"} ratio={6} mx="auto">
                <Image src={`/image/logo_white.png`} />
              </RatioBox>
            </Box>
          )}
        </Container>

        {/* debug tools */}
        {/* <Box position="absolute" right={40} bottom={40} zIndex={400} boxShadow={5}>
          <Button color="primary" onClick={handleReset} border="unset">
            초기화
          </Button>
        </Box> */}
      </Image>
    </RootRef>
  );
};
export default Dashboard;
