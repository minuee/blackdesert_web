import React from "react";
import ReactPlayer from "react-player";
import { useRecoilValue } from "recoil";
import { userInfoState, commonDataState } from "state";

import { Box, BoxProps } from "@material-ui/core";
import { RatioBox } from "components";

export const Player: React.FC<BoxProps> = (props) => {
  const { lang, platform } = useRecoilValue(userInfoState);
  const { streaming_dic } = useRecoilValue(commonDataState);

  const player_options = {
    playsinline: true,
    controls: true,
    width: "100%",
    height: "100%",
    playing: true,
  };

  return (
    <Box display="flex" alignItems="center" bgcolor="rgba(0, 0, 0, 0.8)" {...props}>
      <RatioBox ratio={1.78}>
        <ReactPlayer
          {...player_options}
          url={streaming_dic?.[lang || "en"][platform || "pc"]}
          config={{
            twitch: {
              options: {
                parent: ["localhost", "www.dkdic.com"],
              },
            },
          }}
        />
      </RatioBox>
    </Box>
  );
};
