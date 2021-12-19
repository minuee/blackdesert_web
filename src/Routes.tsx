import React from "react";
import { useRecoilValue } from "recoil";
import { quizState, userInfoState } from "state";

import { Intro, Profile, Quiz, Finish } from "./page";

const Routes: React.FC = () => {
  const { status } = useRecoilValue(quizState);
  const { lang, platform, nickname } = useRecoilValue(userInfoState);

  if (status === "EVENT_DEFAULT" || status === "EVENT_WAIT" || !(lang && platform && nickname)) {
    if (!lang || !platform) return <Intro />;
    else return <Profile />;
  } else {
    if (status === "EVENT_END") return <Finish />;
    else return <Quiz />;
  }
};

export default Routes;
