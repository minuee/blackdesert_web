import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { isWebState, userInfoState, commonDataState, isOpenState } from "state";

import { makeStyles, Box, Grid } from "@material-ui/core";
import { Typography, Button } from "components/Mui";
import { RatioBox, Image, WoodContainer } from "components";

import { I18n } from "aws-amplify";

const isRealOpenFlag = true;

const useStyles = makeStyles((theme) => ({
  content_container: {
    background: "linear-gradient(180deg, #d6e7ee, #c4d7de)",
  },
}));

export const Intro: React.FC = () => {
  const classes = useStyles();
  const isWeb = useRecoilValue(isWebState);
  const { lang, platform } = useRecoilValue(userInfoState);

  return (
    <Box pt={8} pb={4} my="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <RatioBox width={isWeb ? "40%" : "55%"} ratio={4.4}>
        <Image src="/image/heidel_ball.png" />
      </RatioBox>
      <RatioBox mt={{ xs: 2, sm: 4 }} width={isWeb ? "70%" : "80%"} ratio={9}>
        <Image src="/image/live_quiz_show_intro.png" />
      </RatioBox>

      <Box width="100%" mt={{ xs: 6, sm: 8 }} textAlign="center">
        {!lang && <LangComponent />}
        {lang && !platform && <PlatformComponent />}
      </Box>
    </Box>
  );
};

const LangComponent: React.FC = () => {
  const classes = useStyles();
  const isWeb = useRecoilValue(isWebState);
  const { lang_code_list } = useRecoilValue(commonDataState);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [curLang, setCurLang] = useState("en");
  const isOpen = useRecoilValue(isOpenState);

  function handleLangSave() {
    if (!isOpen) {
      alert("이벤트 시작 전까지 대기해주세요!");
      return;
    }

    window.localStorage.setItem(
      "bde_userInfo",
      JSON.stringify({
        ...userInfo,
        lang: curLang,
      }),
    );
    setUserInfo((prev) => ({ ...prev, lang: curLang }));
  }

  useEffect(() => {
    if (navigator.language) {
      setCurLang(navigator.language.substring(0, 2));
    }
  }, []);

  return (
    <>
      <WoodContainer innerP={2}>
        <Box width={isWeb ? "22%" : "30%"} position="absolute" top={isWeb ? 0 : 6} left={isWeb ? 0 : 6} zIndex={100}>
          <RatioBox ratio={1.2}>
            <Image src="/image/upper_ribbon.png" />
          </RatioBox>
        </Box>
        <Box
          width={isWeb ? "14%" : "14%"}
          position="absolute"
          bottom={isWeb ? 0 : 8}
          right={isWeb ? 3 : 11}
          zIndex={100}
        >
          <RatioBox ratio={0.9}>
            <Image src="/image/lower_ribbon.png" />
          </RatioBox>
        </Box>

        <RatioBox ratio={isWeb ? 3 : 1.2} boxShadow={6}>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="100%"
            p={{ xs: 2, sm: 4 }}
            className={classes.content_container}
          >
            <Typography
              mt={{ xs: 2, sm: 0 }}
              mb={{ xs: 2, sm: 4 }}
              variant={isWeb ? "h5" : "h6"}
              color="primary"
              fontWeight={700}
              textAlign="center"
            >
              Language
            </Typography>
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
              <Grid container style={{ margin: "-2px" }}>
                {lang_code_list?.map((code: any, index: number) => {
                  const isCur = curLang === code;
                  return (
                    <Grid item style={{ flexBasis: isWeb ? "12.5%" : "25%", padding: "2px" }} key={index}>
                      <RatioBox
                        onClick={() => setCurLang(code)}
                        zIndex={200}
                        style={{ cursor: isWeb ? "pointer" : undefined }}
                        data-testid={`lang_${code}`}
                      >
                        <Box
                          style={{
                            background: isCur ? "linear-gradient(180deg, #5189d5, #2e569f)" : "rgba(0, 0, 0, 0)",
                          }}
                          border={isCur ? "solid 1px rgba(0, 0, 0, 0)" : "solid 1px rgb(136, 184, 212, 0.5)"}
                          height="100%"
                          display="flex"
                        >
                          <Image
                            src={`/image/lang/${code}_${isCur ? "white" : "black"}.png`}
                            height={code == "pt" ? "17%" : "20%"}
                            m="auto"
                          />
                        </Box>
                      </RatioBox>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </RatioBox>
      </WoodContainer>

      {isRealOpenFlag ? (
        <Button
          mt={{ xs: 2, sm: 4 }}
          py={{ xs: 2, sm: 2 }}
          px={{ xs: 8, sm: 12 }}
          disabled={!curLang || !isOpen}
          color="primary"
          onClick={handleLangSave}
          border="unset"
          style={{ background: curLang && isOpen ? "linear-gradient(180deg, #355fa9, #234392)" : undefined }}
        >
          <Typography color="textSecondary" variant="h6" fontWeight={700}>
            NEXT
          </Typography>
        </Button>
      ) : (
        <Button
          mt={{ xs: 2, sm: 4 }}
          py={{ xs: 2, sm: 2 }}
          px={{ xs: 8, sm: 12 }}
          // onClick={handleLangSave}
          color="primary"
          border="unset"
          disabled={true}
          // style={{ background: curLang && isOpen ? "linear-gradient(180deg, #355fa9, #234392)" : undefined }}
        >
          <Typography color="textSecondary" variant="h6" fontWeight={700}>
            NEXT
          </Typography>
        </Button>
      )}
    </>
  );
};
const PlatformComponent: React.FC = () => {
  const classes = useStyles();
  const isWeb = useRecoilValue(isWebState);
  const [curPlatform, setCurPlatform] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  function handleSavePlatform() {
    window.localStorage.setItem(
      "bde_userInfo",
      JSON.stringify({
        ...userInfo,
        platform: curPlatform,
      }),
    );
    setUserInfo((prev) => ({ ...prev, platform: curPlatform }));
  }

  return (
    <>
      <WoodContainer innerP={2}>
        <Box width={isWeb ? "22%" : "30%"} position="absolute" top={isWeb ? 0 : 9} left={isWeb ? 0 : 7} zIndex={100}>
          <RatioBox ratio={1.2}>
            <Image src="/image/upper_ribbon.png" />
          </RatioBox>
        </Box>
        <Box
          width={isWeb ? "14%" : "14%"}
          position="absolute"
          bottom={isWeb ? 0 : 8}
          right={isWeb ? 3 : 11}
          zIndex={100}
        >
          <RatioBox ratio={0.9}>
            <Image src="/image/lower_ribbon.png" />
          </RatioBox>
        </Box>

        <RatioBox ratio={isWeb ? 3 : 1.2} boxShadow={6}>
          <Box display="flex" flexDirection="column" width="100%" height="100%" className={classes.content_container}>
            <Typography
              mt={{ xs: 2, sm: 0 }}
              // pt={{ xs: 4, sm: 6 }}
              py={{ xs: 2, sm: 4 }}
              variant={isWeb ? "h5" : "h6"}
              color="primary"
              fontWeight={700}
              textAlign="center"
            >
              {I18n.get("L00002")}
            </Typography>
            <Box position="relative" display="flex" justifyContent="space-between" flex={1}>
              {[
                {
                  code: "pc",
                  content: "PC & Console",
                },
                {
                  code: "mobile",
                  content: "Mobile",
                },
              ].map((item, index) => {
                const isCur = curPlatform === item.code;

                return (
                  <RatioBox
                    width="50%"
                    ratio={isWeb ? 2.5 : 1.5}
                    zIndex={200}
                    onClick={() => setCurPlatform(item.code)}
                    style={{ cursor: isWeb ? "pointer" : undefined }}
                    data-testid={`platform_${item.code}`}
                    key={index}
                  >
                    <Box
                      display="flex"
                      flexDirection={isWeb ? "row" : "column"}
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      {isWeb ? (
                        <RatioBox width={index === 0 ? "30%" : "10%"} ratio={index === 0 ? 1.5 : 0.5} mb={1}>
                          <Image src={`/image/${item.code}_${isCur ? "color" : "white"}.png`} />
                        </RatioBox>
                      ) : (
                        <Image mb={2} height="40%" src={`/image/${item.code}_${isCur ? "color" : "white"}.png`} />
                      )}
                      <Box ml={{ xs: 0, sm: 4 }} textAlign={isWeb ? "left" : "center"}>
                        <Typography
                          variant={isWeb ? "h5" : "body2"}
                          color={isCur ? "primary" : "textPrimary"}
                          fontWeight={700}
                          whiteSpace="pre-line"
                        >
                          {I18n.get(`L0000${index === 0 ? 3 : 4}`)}
                        </Typography>
                      </Box>
                    </Box>
                  </RatioBox>
                );
              })}

              <Box
                position="absolute"
                bgcolor="rgba(255, 255, 255, 0.6)"
                width="1.5px"
                height="70%"
                left="50%"
                top="50%"
                style={{ transform: "translate(-50%, -50%)" }}
              />
            </Box>
          </Box>
        </RatioBox>
      </WoodContainer>

      <Button
        mt={{ xs: 2, sm: 4 }}
        py={{ xs: 2, sm: 2 }}
        px={{ xs: 8, sm: 12 }}
        disabled={!curPlatform}
        onClick={handleSavePlatform}
        border="unset"
        style={{ background: curPlatform ? "linear-gradient(180deg, #355fa9, #234392)" : undefined }}
      >
        <Typography color="textSecondary" variant="h6" fontWeight={700}>
          {I18n.get(`L00005`)}
        </Typography>
      </Button>
    </>
  );
};
