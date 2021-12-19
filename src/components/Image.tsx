import React from "react";
import { makeStyles, Box, BoxProps } from "@material-ui/core";

export type ImageProps = BoxProps & {
  src: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  repeat?: string;
};

const useStyles = makeStyles({
  img: ({ src, objectFit, objectPosition, repeat }: ImageProps) => ({
    backgroundImage: `url(${src || "/image/no_image.png"})`,
    backgroundSize: objectFit || "contain",
    backgroundPosition: objectPosition || "center",
    backgroundRepeat: repeat || "no-repeat",
    backgroundOrigin: "content-box",
  }),
});

export const Image: React.FC<ImageProps> = ({ src, objectFit, objectPosition, repeat, className, ...props }) => {
  const classes = useStyles({
    src,
    objectFit,
    objectPosition,
    repeat,
  });

  return <Box className={`${classes.img} ${className}`} width="100%" height="100%" {...props} />;
};
