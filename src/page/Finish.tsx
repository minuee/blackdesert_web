import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { isWebState, userInfoState, commonDataState } from "state";

import { makeStyles, Box, Grid } from "@material-ui/core";
import { Typography, Button } from "components/Mui";
import { RatioBox, Image } from "components";

import { I18n } from "aws-amplify";

export const Finish: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const { lang, platform } = useRecoilValue(userInfoState);
  const { redirect_dic } = useRecoilValue(commonDataState);

  return (
    <Box my="auto" py={{ xs: 6, sm: 12 }} px={{ xs: 4, sm: 8 }} bgcolor="#fff" boxShadow={6} textAlign="center">
      <Typography variant={isWeb ? "h2" : "h3"} color="primary" whiteSpace={isWeb ? "normal" : "pre-line"}>
        {I18n.get(`L00104`).split("\n")?.[0]}
      </Typography>
      <Typography mt={4} variant={isWeb ? "h5" : "h5"} fontWeight={500} style={{ color: "#ed0b1f" }}>
        {/* {I18n.get(`L00105`)} */}
        {I18n.get(`L00104`).split("\n")?.[1]}
      </Typography>

      <Box mt={8}>
        <Grid container spacing={2} justify="center">
          {redirect_dic?.[lang || "en"][platform || "pc"].map((item: any, index: number) => (
            <Grid xs={10} sm={4} item key={index}>
              {item.title ? (
                <Box mt={4}>
                  <Typography mb={2} variant={isWeb ? "h4" : "h3"} color="secondary" fontWeight={700}>
                    {item.title}
                  </Typography>
                  {item.links.map((child_item: any, index: number) => (
                    <Button
                      mt={1}
                      fullWidth
                      disableElevation
                      borderColor="transparent"
                      onClick={() => window.open(child_item.url)}
                      key={index}
                    >
                      <RatioBox ratio={1.8}>
                        <Image src={`/image/${child_item.type}_link.png`} />
                      </RatioBox>
                    </Button>
                  ))}
                </Box>
              ) : (
                <Button fullWidth disableElevation borderColor="transparent" onClick={() => window.open(item.url)}>
                  <RatioBox ratio={1.8}>
                    <Image src={`/image/${item.type}_link.png`} />
                  </RatioBox>
                </Button>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
