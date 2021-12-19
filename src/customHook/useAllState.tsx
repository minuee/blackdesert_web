import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState, userInfoState, userAnswerState } from "state";

const useAllState = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);
  const userInfo = useRecoilValue(userInfoState);
  // const userAnswer = useRecoilValue(userAnswerState);

  const getAllState = () => {
    let quizLog = JSON.parse(JSON.stringify(quiz));

    ["reward_condition", "reward", "question", "answers", "correct_answers"].forEach((item) => {
      delete quizLog.data[item];
    });

    return {
      isWeb,
      quiz: quizLog,
      userInfo,
      // userAnswer,
    };
  };
  return [getAllState];
};

export default useAllState;
