import { Typography as MuiTypography, TypographyProps as MuiTypographyProps, BoxProps } from "@material-ui/core";
import { compose, style, typography, spacing, TypographyProps, SpacingProps } from "@material-ui/system";
import { styled } from "@material-ui/styles";

import { userInfoState } from "state";
import { useRecoilValue } from "recoil";

type CustomTypographyProps = MuiTypographyProps &
  TypographyProps &
  SpacingProps & {
    whiteSpace?: string;
    wordBreak?: string;
    fontFamily?: string;
  };
const font_lookup_table: { [index: string]: string } = {
  ko: "Strong Sword",
  en: "Strong Sword",
  ru: "El Messiri",
  th: "JS Chusri",
  tr: "Strong Sword",
  pt: "Strong Sword",
  zh: "Noto Sans TC",
  ja: "Noto Sans JP",
};

const whiteSpace = style({
  prop: "whiteSpace",
  cssProperty: "whiteSpace",
});
const wordBreak = style({
  prop: "wordBreak",
  cssProperty: "wordBreak",
});
const fontFamily = style({
  prop: "fontFamily",
  cssProperty: "fontFamily",
  transform: (value) => `${value}, sans-serif`,
});

const StyledTypography = styled(MuiTypography)(compose(typography, spacing, whiteSpace, wordBreak, fontFamily));

export const Typography: React.FC<CustomTypographyProps> = (props) => {
  const { lang } = useRecoilValue(userInfoState);
  return <StyledTypography fontFamily={font_lookup_table[lang || "en"]} {...props} />;
};
