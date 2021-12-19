import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { RecoilRoot } from "recoil";
import { userInfoState, quizState, userAnswerState, commonDataState, isOpenState } from "state";

import App from "./App";
import { Intro, Profile } from "page";
import { sleep } from "common";

import { apiObject } from "api";
import { I18n } from "aws-amplify";
import { Analytics, AWSKinesisFirehoseProvider } from "aws-amplify";
import { Auth, CurrentAuthUiState, AuthType, UserState } from "@psyrenpark/auth";

const lookup_table: { [index: string]: any } = {
  userInfo: userInfoState,
  quiz: quizState,
  userAnswer: userAnswerState,
  commonData: commonDataState,
};

const RenderWithRecoil = (component: React.ReactElement, defaultStores?: any) => {
  async function initializeState({ set }: any) {
    set(isOpenState, true);

    // if (defaultStores?.length !== 0) {
    //   defaultStores.forEach((store: { atom: string; state: any }) => {
    //     const { atom, state } = store;
    //     set(lookup_table[atom], state);
    //   });
    // }
  }

  return <RecoilRoot initializeState={initializeState}>{component}</RecoilRoot>;
};

function sendSubscribeStatus(testData: any) {
  try {
    Analytics.record(
      {
        data: {
          occur_at: Date.now(),
          ...testData,
        },
        streamName: "bde-dev-test",
      },
      "AWSKinesisFirehose",
    );
  } catch (error) {
    console.log("kinesis send error", error);
  }
}

// const consoleLog = jest.spyOn(console, "log");

jest.setTimeout(100000);

// let container: any;

describe("getUserInfo", () => {
  beforeEach(() => {
    window.localStorage.removeItem("bde_userInfo");
  });
  afterEach(() => {
    window.localStorage.removeItem("bde_userInfo");
  });

  it("e2e", async () => {
    const { container } = render(RenderWithRecoil(<App />));

    const consoleLog = jest.spyOn(console, "log");

    const engLangButton = await screen.findByTestId("lang_en");
    fireEvent.click(engLangButton);
    fireEvent.click(screen.getByText("NEXT"));

    const platformButton = await screen.findByTestId("platform_mobile");
    fireEvent.click(platformButton);
    fireEvent.click(screen.getByText("Enter"));

    const nicknameInput = await screen.findByTestId("nickname_input");
    fireEvent.change(nicknameInput, { target: { value: "en-testtest" } });
    expect(nicknameInput).toHaveValue("en-testtest");
    fireEvent.keyDown(nicknameInput, { key: "Enter", code: "Enter" });

    await waitForElementToBeRemoved(nicknameInput, { timeout: 5000 });

    await act(() => sleep(5000));
    // expect(consoleLog).not.toHaveBeenCalledWith("mqtt subscribe error");

    const testData = container.querySelector("[data-testid='testdata']")?.textContent;
    sendSubscribeStatus(JSON.parse(testData || "{}"));

    await act(() => sleep(5000));

    // await waitFor(() => expect(consoleLog).toHaveBeenCalledWith("next status received"), { timeout: 20000 });
  });

  // it("get user lang/platform", async () => {
  //   render(RenderWithRecoil(<App />));

  //   const engLangButton = await screen.findByTestId("lang_en");
  //   fireEvent.click(engLangButton);
  //   fireEvent.click(screen.getByText("NEXT"));

  //   const platformButton = await screen.findByTestId("platform_mobile");
  //   fireEvent.click(platformButton);
  //   fireEvent.click(screen.getByText("Enter"));

  //   const { lang, platform } = JSON.parse(window.localStorage.getItem("bde_userInfo") || "{}");
  //   expect(lang).toBe("en");
  //   expect(platform).toBe("mobile");
  // });

  // it("get user nickname", async () => {
  //   const userInfo = {
  //     atom: "userInfo",
  //     state: {
  //       lang: "en",
  //       platform: "mobile",
  //     },
  //   };
  //   const quiz = {
  //     atom: "quiz",
  //     state: {
  //       data: {},
  //       status: "EVENT_WAIT",
  //     },
  //   };

  //   render(RenderWithRecoil(<App />, [userInfo, quiz]));

  //   I18n.setLanguage("en");

  //   const nicknameInput = await screen.findByTestId("nickname_input");
  //   fireEvent.change(nicknameInput, { target: { value: "en-testtest" } });
  //   expect(nicknameInput).toHaveValue("en-testtest");
  //   fireEvent.keyDown(nicknameInput, { key: "Enter", code: "Enter" });

  //   await waitForElementToBeRemoved(nicknameInput);
  // });
});
