import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState } from "state";

import { Box } from "@material-ui/core";
import { Typography } from "components/Mui";
import { Image, RatioBox } from "components";

import { I18n } from "aws-amplify";

export const StatisticsContent: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);

  return (
    <Box display="flex" flexDirection={isWeb ? "row" : "column"} justifyContent="center" alignItems="center">
      <RatioBox width="10rem">
        <Image src={`/image/black_spirit.png`} />
      </RatioBox>
      <Typography
        ml={{ xs: 0, sm: 4 }}
        mt={{ xs: 2, sm: 0 }}
        variant={isWeb ? "h4" : "h6"}
        color="primary"
        whiteSpace="pre-line"
        textAlign="center"
      >
        {I18n.get(`L00103`)}
      </Typography>
    </Box>
  );
};
