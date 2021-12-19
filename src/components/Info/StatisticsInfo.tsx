import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState, userAnswerState, userInfoState } from "state";

import { makeStyles, Box } from "@material-ui/core";
import { Typography } from "components/Mui";
import { Image } from "components";

import { I18n } from "aws-amplify";
import { RatioBox } from "components/RatioBox";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  result_wrapper: {
    position: "relative",
    display: "flex",
    border: "solid 1px rgba(255, 255, 255, 0.3)",
    borderRadius: "40px",

    "& > *": {
      width: "50%",
      textAlign: "center",

      // whiteSpace: "normal",

      [theme.breakpoints.down("md")]: {
        // whiteSpace: "pre-wrap",
      },
    },
    "& > hr": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "60%",
      width: "1px",
    },
  },
}));

export const StatisticsInfo: React.FC = () => {
  const classes = useStyles();
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);
  const { lang, nickname } = useRecoilValue(userInfoState);
  const userAnswer = useRecoilValue(userAnswerState);

  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    let tmp = quiz.data.correct_answers.reduce(
      (acc: number, cur: number, idx: number) => (acc += +(cur === userAnswer[idx + 1])),
      0,
    );
    setCorrectCount(tmp);
  }, []);

  return (
    <Box display="flex" flexDirection="column" textAlign="left" minHeight="100%">
      <Typography variant="h4" color="textSecondary" fontWeight={500}>
        {I18n.get(`L00048`)}
      </Typography>
      <Typography
        my={{ xs: 2, sm: 2 }}
        variant="h2"
        fontWeight={700}
        wordBreak="break-word"
        style={{ color: "#ffd344" }}
      >
        {I18n.get(`L00049`).replace("__value__", nickname)}
      </Typography>

      <Box pt={{ xs: 3, sm: 4 }} flex="1" display="flex" flexDirection="column" justifyContent="center">
        <Box display="flex">
          <RatioBox mr={1} width="2.5rem">
            <Image src="/image/result.png" />
          </RatioBox>
          <Typography variant="h4" color="textSecondary" fontWeight={700}>
            {I18n.get(`L00050`).replace("__value__", quiz.data.correct_answers?.length)}
          </Typography>
        </Box>

        {lang === "ru" ? (
          <Typography
            mt={3}
            p={3}
            variant="h4"
            color="textSecondary"
            fontWeight={700}
            wordBreak="keep-all"
            textAlign="center"
            style={{ border: "solid 1px rgba(255, 255, 255, 0.3)", borderRadius: "40px" }}
          >
            {I18n.get(`L00151`).replace("__value__", ` ${correctCount}`)}
          </Typography>
        ) : lang === "pt" ? (
          <Box mt={3} px={1} py={3} className={classes.result_wrapper}>
            <Divider absolute orientation="vertical" />
            <Typography px={1} variant="h4" color="textSecondary" fontWeight={700} wordBreak="keep-all" whiteSpace="pre-line">
              <span style={{ color: "#78a8ff" }}>{I18n.get(`L00051`).split(":")?.[0]}</span>
              {"\n"}: {correctCount}
            </Typography>
            <Typography px={1} variant="h4" color="textSecondary" fontWeight={700} wordBreak="keep-all" whiteSpace="pre-line">
              <span style={{ color: "#f30000" }}>{I18n.get(`L00052`).split(":")?.[0]}</span>
              {"\n"}: {correctCount}
            </Typography>
          </Box>
        ) : (
          <Box mt={3} px={1} py={3} className={classes.result_wrapper}>
            <Divider absolute orientation="vertical" />
            <Typography px={1} variant="h5" color="textSecondary" fontWeight={700} wordBreak="keep-all" textAlign="center">
              <span style={{ color: "#78a8ff" }}>{I18n.get(`L00051`).replace("__value__", correctCount)}</span>
              {" \n"}
              {I18n.get(`L00151`)}
            </Typography>
            <Typography px={1} variant="h5" color="textSecondary" fontWeight={700} wordBreak="keep-all" textAlign="center">
              <span style={{ color: "#f30000" }}>
                {I18n.get(`L00052`).replace("__value__", quiz.data.correct_answers?.length - correctCount)}
              </span>
              {" \n"}
              {I18n.get(`L00152`)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
