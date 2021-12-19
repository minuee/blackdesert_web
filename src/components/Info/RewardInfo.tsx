import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState } from "state";

import { Box } from "@material-ui/core";
import { Typography } from "components/Mui";

import { I18n } from "aws-amplify";

export const RewardInfo: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" color="#ffd344">
      <Typography
        p={{ xs: 0.3, sm: 1 }}
        style={{ border: "solid 1px #ffd344", display: "table" }}
        variant={isWeb ? "h6" : "body1"}
        color="inherit"
        fontWeight={500}
      >
        {I18n.get(`L00031`)}
      </Typography>
      <Typography
        mt={{ xs: 1, sm: 4 }}
        color="inherit"
        variant={isWeb ? "h3" : "h5"}
        fontWeight={500}
        whiteSpace={isWeb ? "normal" : "pre-line"}
      >
        {I18n.get(`L00029`).replace("__value__", quiz.data.reward_rate)}
      </Typography>
    </Box>
  );
};
