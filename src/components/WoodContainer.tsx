import React from "react";
import { Box } from "@material-ui/core";
import { Image, ImageProps } from "components";

type WoodContainerProps = Omit<ImageProps, "src"> & {
  innerP?: number;
};

export const WoodContainer: React.FC<WoodContainerProps> = ({ children, innerP = 0.5, ...props }) => {
  return (
    <Image position="relative" src="/image/wood_background.png" repeat="repeat" boxShadow={6} {...props}>
      <Box p={innerP}>{children}</Box>
    </Image>
  );
};
