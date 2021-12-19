import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { isWebState, quizState, userAnswerState, userInfoState, isLoadingState, timerState } from "state";

import { Box, Grid } from "@material-ui/core";
import { Typography } from "components/Mui";
import { RatioBox } from "components";

import { apiObject } from "api";
import { I18n } from "aws-amplify";

import { CheckContent } from "./";

import { sendErrorLog } from "common";
import useAllState from "customHook/useAllState";

export const QuestionContent: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const [timer, setTimer] = useRecoilState(timerState);
  const { lang, uuid } = useRecoilValue(userInfoState);
  const [getAllState] = useAllState();

  async function handleAnswer(answer: number) {
    if (userAnswer[quiz.data.quiz_no] === answer) return;

    setIsLoading(true);
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
      // throw new Error()
    } catch (error) {
      const state = getAllState();
      sendErrorLog("QuestionContent.tsx", "putUserQuiz", error, state);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 0 ? prev : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0 && !userAnswer[+quiz.data.quiz_no]) {
      handleAnswer(-1);
    }
  }, [timer]);

  return (
    <>
      {timer > 0 ? (
        <Box width="100%" display="flex" flexDirection={isWeb ? "row" : "column"} alignItems="center">
          <Box display={isWeb ? "flex" : "none"} flexDirection={isWeb ? "column" : "row"} textAlign="center">
            <Typography
              mr={2}
              variant={isWeb ? "h5" : "h5"}
              fontWeight={500}
              fontFamily="Strong Sword"
              style={{ color: "#205fd2" }}
            >
              Quiz {quiz.data?.quiz_no || " "}
            </Typography>
            <Typography
              mt={{ xs: 0, sm: 1 }}
              variant={isWeb ? "h4" : "h5"}
              color="secondary"
              fontWeight={700}
              fontFamily="Strong Sword"
            >
              Answer
            </Typography>
          </Box>
          <Box mt={{ xs: 4, sm: 0 }} pb={{ xs: 2, sm: 0 }} display="flex" width="100%">
            <Grid container justify={isWeb ? "flex-end" : "flex-start"} spacing={1}>
              {quiz.data.answers.map((item: any, index: number) => {
                let isCur = userAnswer[quiz.data.quiz_no] === index + 1;
                let contentVariant: any;

                if (item.content[lang].length >= 25) {
                  if (isWeb) contentVariant = "subtitle2";
                  else contentVariant = "h6";
                } else {
                  if (isWeb) contentVariant = "h6";
                  else contentVariant = "h5";
                }

                return (
                  <Grid item style={{ flexBasis: isWeb ? "150px" : "50%" }} key={index}>
                    <RatioBox
                      ratio={1.2}
                      boxShadow={1}
                      boxSizing="content-box"
                      onClick={() => handleAnswer(index + 1)}
                      border={isCur ? "solid 0.3px transparent" : "solid 0.3px #ddd"}
                      style={{
                        background: isCur ? "linear-gradient(180deg, #7399d9, #24418d)" : "#f0f1f5",
                        cursor: isWeb ? "pointer" : "none",
                      }}
                    >
                      <Box position="relative" height="100%" display="flex" justifyContent="center" alignItems="center">
                        <Typography
                          variant={contentVariant}
                          color={isCur ? "textSecondary" : "textPrimary"}
                          fontWeight={700}
                          style={{
                            userSelect: "none",
                          }}
                          align="center"
                          wordBreak="normal"
                          p={2}
                        >
                          {item.content[lang]}
                        </Typography>
                      </Box>
                    </RatioBox>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      ) : (
        <CheckContent />
      )}
    </>
  );
};
