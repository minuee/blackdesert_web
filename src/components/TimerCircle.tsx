import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState, timerState } from "state";

import { makeStyles, Box, BoxProps, CircularProgress } from "@material-ui/core";
import { Typography } from "components/Mui";

type TimerCircleProps = BoxProps;

const useStyles = makeStyles({
  top_circle: {
    position: "absolute",
    left: 0,
    top: 0,
    color: "#fff",
  },
  base_circle: {
    position: "absolute",
    left: 0,
    top: 0,
    color: "rgba(255, 255, 255, 0.2)",
  },
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "table",
  },
});

export const TimerCircle: React.FC<TimerCircleProps> = (props) => {
  const classes = useStyles();
  const isWeb = useRecoilValue(isWebState);
  const timer = useRecoilValue(timerState);
  const size = isWeb ? 80 : 60;

  return (
    <Box
      // display={timer <= 0 ? "none" : undefined}
      position="relative"
      width={size}
      height={size}
      {...props}
    >
      <CircularProgress className={classes.base_circle} size={size} value={100} variant="determinate" thickness={3} />
      <CircularProgress
        className={classes.top_circle}
        size={size}
        value={(timer / 60) * 100}
        variant="determinate"
        thickness={3}
      />
      <Typography
        variant={isWeb ? "h5" : "h6"}
        color="textSecondary"
        fontFamily="Strong Sword"
        fontWeight={700}
        className={classes.text}
      >
        {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}
      </Typography>
    </Box>
  );
};
