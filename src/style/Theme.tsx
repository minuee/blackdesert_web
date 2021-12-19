import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#11517c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },
    text: {
      primary: "#999",
      secondary: "#fff",
    },

    action: {
      disabledBackground: "#bbb",
    },

    divider: "#ddd",
  },

  props: {
    MuiButton: {
      variant: "contained",
    },
    MuiTextField: {
      variant: "outlined",
      FormHelperTextProps: {
        style: { display: "none" },
      },
    },
    MuiSelect: {
      variant: "outlined",
    },
    MuiAvatar: {
      variant: "square",
    },
  },

  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#fff",
        color: "#000",
        border: "solid 1px #bbb",
      },
      containedPrimary: {
        color: "#fff",
      },
    },
    MuiTextField: {
      root: {
        backgroundColor: "#fff",
      },
    },
    MuiDivider: {
      root: {
        height: "2px",
      },
    },
  },

  typography: {
    fontFamily: "'Strong Sword', sans-serif",

    h1: { fontWeight: 400 },
    h2: { fontWeight: 400 },
    h3: { fontWeight: 400 },
    h4: { fontWeight: 400 },
    h5: { fontWeight: 400 },
    h6: { fontWeight: 400 },
    caption: { color: "red" },
  },
});
