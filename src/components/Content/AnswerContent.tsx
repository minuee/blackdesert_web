import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState, userAnswerState, userInfoState } from "state";

import { Box } from "@material-ui/core";
import { Typography } from "components/Mui";
import { Image, RatioBox } from "components";

import { I18n } from "aws-amplify";

export const AnswerContent: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);
  const userAnswer = useRecoilValue(userAnswerState);
  const { lang } = useRecoilValue(userInfoState);

  const isCorrect = userAnswer[quiz.data.quiz_no] === quiz.data.correct_answer;

  return (
    <Box py={4} display="flex" flexDirection={isWeb ? "row" : "column"} justifyContent="center" alignItems="center">
      <RatioBox width={isWeb ? "4rem" : "6rem"}>
        <Image src={`/image/${isCorrect ? "correct" : "wrong"}.png`} />
      </RatioBox>
      <Typography
        ml={{ xs: 0, sm: 4 }}
        mt={{ xs: 2, sm: 0 }}
        variant="h4"
        color="primary"
        fontWeight={700}
        whiteSpace={isWeb ? "normal" : "pre-line"}
        textAlign="center"
      >
        {I18n.get(`L0003${isCorrect ? "3" : "6"}`).replace(
          "__value__",
          `\n(${quiz.data.answers?.[quiz.data.correct_answer - 1]?.content?.[lang]})`,
        )}
      </Typography>
    </Box>
  );
};
