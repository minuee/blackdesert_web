import { atom } from "recoil";

export const isOpenState = atom<boolean>({
  key: "isOpen",
  default: false,
});
export const isLoadingState = atom<boolean>({
  key: "isLoading",
  default: false,
});
export const isWebState = atom<boolean>({
  key: "isWeb",
  default: true,
});

export const quizState = atom<any>({
  key: "quiz",
  default: {
    data: {
      msg: "",
      quiz_no: -1,
      reward_condition: "",
      reward: [],
      question: "",
      answers: [],
      correct_answer: -1,
      correct_answers: [],
    },
    status: "EVENT_WAIT",
  },
});
export const userInfoState = atom<{ [index: string]: string }>({
  key: "userInfo",
  default: {
    lang: "",
    platform: "",
    nickname: "",
    uuid: "",
  },
});
export const userAnswerState = atom<{ [index: string]: number }>({
  key: "userAnswer",
  default: {},
});
export const timerState = atom<number>({
  key: "timer",
  default: 60,
});

export const commonDataState = atom<any>({
  key: "commonData",
  default: {},
});
