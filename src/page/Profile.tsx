import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { isWebState, userInfoState, isLoadingState } from "state";

import { makeStyles, Box, TextField, InputAdornment, ThemeProvider } from "@material-ui/core";
import { Typography, Button } from "components/Mui";
import { Image, RatioBox, Player, WoodContainer } from "components";

import { Auth as AuthToAmplify, I18n } from "aws-amplify";
import { apiObject } from "api";

import { sendErrorLog } from "common";
import useAllState from "customHook/useAllState";

const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiInputBase-root": {
      borderRadius: 0,
      padding: 0,
      fontWeight: 500,
      fontFamily: "Strong Sword",

      [theme.breakpoints.up("sm")]: {
        color: "#000",
        fontWeight: 700,
      },

      "& > *": {
        padding: theme.spacing(3, 2),
      },
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
    },
  },

  button_wrapper: {
    "& > *": {
      maxWidth: "130px",
      height: "100%",
      border: "unset",
      borderRadius: 0,
      background: "linear-gradient(180deg, #5189d5, #2e569f)",
    },

    "& .Mui-disabled": {
      background: "linear-gradient(180deg, #ddd, #555)",
    },
  },
}));

export const Profile: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const userInfo = useRecoilValue(userInfoState);

  return (
    <Box my={{ xs: 0, sm: "auto" }} display="flex" flexDirection="column" justifyContent="center">
      <Player mt={2} boxShadow={6} />

      <WoodContainer my={2} innerP={0.7}>
        <Box pt={{ xs: 2, sm: 0 }} pb={{ xs: 3, sm: 0 }} px={2} bgcolor="#fff">
          {userInfo.nickname ? (
            <Box py={5} textAlign="center">
              <Typography variant="h5" color="primary" whiteSpace={isWeb ? "normal" : "pre-line"}>
                {I18n.get(`L00019`)}
              </Typography>
            </Box>
          ) : (
            <Box
              pr={{ xs: 0, sm: 4 }}
              display="flex"
              flexDirection={isWeb ? "row" : "column"}
              alignItems={isWeb ? "center" : "flex-start"}
            >
              <Box display="flex" position="relative" mb={{ xs: 1, sm: 0 }}>
                <RatioBox mt={{ xs: -2.8, sm: -0.7 }} mr={2} width={isWeb ? "130px" : "60px"} ratio={0.91}>
                  <Image src="/image/nickname_badge.png" />
                </RatioBox>
                {!isWeb && (
                  <Typography mb={1} variant="h6" color="secondary" fontWeight={700}>
                    {I18n.get(`L00016`)}
                  </Typography>
                )}
              </Box>

              <NicknameInput />
            </Box>
          )}
        </Box>
      </WoodContainer>
    </Box>
  );
};

const NicknameInput: React.FC = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [curNickname, setCurNickname] = useState("");
  const [getAllState] = useAllState();

  async function handleNicknameSave() {
    setIsLoading(true);
    if (isLoading) return;
    try {
      const cognitoIdentityInfo = await AuthToAmplify.currentCredentials();
      const curUuid = cognitoIdentityInfo.identityId;

      const data = await apiObject.putUserInit(
        {
          uuid: curUuid,
          language: userInfo.lang,
          device_type: userInfo.platform,
          nickname: curNickname,
        },
        () => {},
      );

      const cur_info = {
        ...userInfo,
        nickname: curNickname,
        uuid: curUuid,
      };

      window.localStorage.setItem("bde_userInfo", JSON.stringify(cur_info));
      setUserInfo(cur_info);
      // throw new Error()
    } catch (error) {
      const state = getAllState();
      sendErrorLog("Profile.tsx", "putUserInit", error, state);
    }
    setIsLoading(false);
  }

  return (
    <Box flex="1" width={{ xs: "100%", sm: "unset" }} textAlign="center">
      <Box display="flex">
        <TextField
          className={classes.input}
          fullWidth
          placeholder={I18n.get(`L00017`)}
          value={curNickname}
          onChange={(e) => setCurNickname(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNicknameSave()}
          inputProps={{
            "data-testid": "nickname_input",
          }}
        />
        <Box className={classes.button_wrapper}>
          <Button
            px={{ xs: 1.5, sm: 2 }}
            color="primary"
            borderRadius={0}
            disabled={curNickname === ""}
            disableElevation
            onClick={handleNicknameSave}
          >
            <Typography color="textSecondary" fontFamily="Strong Sword Text" wordBreak="keep-all">
              {I18n.get(`L00018`)}
            </Typography>
          </Button>
        </Box>
      </Box>
      <Typography mt={{ xs: 3, sm: 1 }} color="secondary">
        {I18n.get("L00300")}
        {/* 입력란에 개인정보를 기입하지 않도록 주의해 주세요! */}
      </Typography>
    </Box>
  );
};
