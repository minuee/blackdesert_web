import React from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState, userInfoState } from "state";

import { Box } from "@material-ui/core";
import { Typography } from "components/Mui";
import { Image, RatioBox } from "components";

import { I18n } from "aws-amplify";

export const RewardContent: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);
  const { lang } = useRecoilValue(userInfoState);

  return (
    <Box
      py={{ xs: lang === "pt" ? 4 : 0, sm: 2 }}
      width="100%"
      display="flex"
      flexDirection={isWeb ? "row" : "column"}
      alignItems="center"
    >
      <Box display={isWeb ? "table" : "none"} maxWidth={isWeb ? "150px" : undefined} textAlign="center">
        <Typography
          mr={{ xs: 2, sm: 0 }}
          variant={isWeb ? "h5" : "h5"}
          fontWeight={500}
          fontFamily="Strong Sword"
          style={{ color: "#205fd2" }}
        >
          Quiz {quiz.data.quiz_no || " "}
        </Typography>
        <Typography mt={{ xs: 0, sm: 1 }} variant={isWeb ? "h4" : "h5"} color="secondary" fontWeight={500}>
          {I18n.get(`L00030`)}
        </Typography>
      </Box>
      <Box
        mt={{ xs: 2, sm: 0 }}
        ml={{ xs: 0, sm: 4 }}
        display="flex"
        flexWrap="wrap"
        flex="1"
        flexDirection={isWeb ? "row" : "column"}
        width={isWeb ? undefined : "100%"}
        alignItems="center"
      >
        {quiz.data.reward.map((item: any, index: number) => {
          // if (lang === "pt" && index === 1) return null;
          const [reward_platform, ...reward] = item.desc[lang].split(" : ");

          return (
            <Box mx={{ xs: 0, sm: 1 }} width={{ xs: "100%", sm: "300px", md: "420px" }} display="flex" key={index}>
              <RatioBox width="29.5%" ratio={0.83}>
                <Image src="/image/reward_left.png" justifyContent="center" alignItems="center" display="flex">
                  <RatioBox width="40%" ratio={1}>
                    <Image src={item.img_url} />
                  </RatioBox>
                </Image>
              </RatioBox>
              <RatioBox width="69.5%" ratio={1.96}>
                <Image src="/image/reward_right.png" alignItems="center" display="flex">
                  <Box px={{ xs: 1.5, md: 2.5 }} width="100%" textAlign="center">
                    <Typography color="primary" variant={isWeb ? "body1" : "subtitle2"} fontWeight={500}>
                      {reward_platform}
                    </Typography>
                    <Typography mt={{ xs: 0.5, sm: 1 }} color="primary" variant={isWeb ? "h5" : "h6"} fontWeight={700}>
                      {reward.join(" : ")}
                    </Typography>
                  </Box>
                </Image>
              </RatioBox>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
