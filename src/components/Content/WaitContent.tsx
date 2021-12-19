import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState } from "state";

import { Box } from "@material-ui/core";
import { Typography } from "components/Mui";

import { I18n } from "aws-amplify";

export const WaitContent: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);

  return (
    <Box textAlign="center">
      <Typography variant="h4" color="primary" whiteSpace={isWeb ? "normal" : "pre-line"}>
        {I18n.get(`L00019`)}
      </Typography>
    </Box>
  );
};
