import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState, userInfoState } from "state";

import { Typography } from "components/Mui";

export const QuestionInfo: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);
  const { lang } = useRecoilValue(userInfoState);

  return (
    <Typography
      mt={1}
      variant={isWeb ? "h4" : "h6"}
      whiteSpace={isWeb ? "normal" : "pre-line"}
      fontWeight={isWeb ? 700 : 500}
      style={{ color: "#ffd344" }}
    >
      {quiz.data.question[lang]}
    </Typography>
  );
};
