import React from "react";
import ReactDOM from "react-dom";
import "./style/global.css";
import App from "./App";

import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "style";

import Amplify, { PubSub, Auth as AuthToAmplify } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";

import awsmobile from "./aws-exports";

import { Auth } from "@psyrenpark/auth";
import { Api } from "@psyrenpark/api";
import { Storage } from "@psyrenpark/storage";

Auth.setConfigure(awsmobile);
Api.setConfigure(awsmobile);
Storage.setConfigure(awsmobile);

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root"),
);
