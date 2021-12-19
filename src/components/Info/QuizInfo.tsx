import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState, userInfoState } from "state";

import { Box } from "@material-ui/core";
import { Typography } from "components/Mui";
import { TimerCircle } from "components";

export const QuizInfo: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);

  const timerOn =
    quiz.status === "EVENT_QUIZ_QUESTION" || quiz.status === "EVENT_QUIZ_CHECK" || quiz.status === "EVENT_QUIZ_ANSWER";

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography mb={3} variant={isWeb ? "h4" : "h6"} color="textSecondary" fontWeight={500} fontFamily="Strong Sword">
        Quiz {quiz.data.quiz_no}
      </Typography>
      {timerOn && <TimerCircle />}
    </Box>
  );
};
