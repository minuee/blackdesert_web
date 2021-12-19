import React from "react";
import { makeStyles, Box, BoxProps } from "@material-ui/core";

type RatioBoxProps = BoxProps & {
  width?: string | number;
  ratio?: string | number;
};

const useStyles = makeStyles({
  ratio_box: ({ width, ratio }: RatioBoxProps) => ({
    position: "relative",
    width: width,
    paddingTop: `calc(${width} / ${ratio})`,

    "& > *": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  }),
});

export const RatioBox: React.FC<RatioBoxProps> = ({ width = "100%", ratio = "1", children, zIndex, ...props }) => {
  const classes = useStyles({ width, ratio });

  return (
    <Box className={classes.ratio_box} {...props}>
      <Box zIndex={zIndex}>{children}</Box>
    </Box>
  );
};
