import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isWebState, quizState } from "state";
import { Box } from "@material-ui/core";

import { Player, WoodContainer, RatioBox, Image } from "components";
import { RewardInfo, QuestionInfo, QuizInfo, StatisticsInfo } from "components/Info";
import {
  WaitContent,
  RewardContent,
  QuestionContent,
  CheckContent,
  AnswerContent,
  StatisticsContent,
} from "components/Content";

export const Quiz: React.FC = () => {
  const isWeb = useRecoilValue(isWebState);
  const quiz = useRecoilValue(quizState);

  return (
    <Box my={isWeb ? "auto" : undefined} boxShadow={6}>
      <Box display="flex" flexDirection={isWeb ? "row" : "column"}>
        <Player width={isWeb ? "60%" : "100%"} />

        <Box
          display="flex"
          flexDirection="column"
          p={{ xs: 2, sm: 3, md: 4 }}
          width={{ xs: "100%", sm: "40%" }}
          bgcolor="#002c4a"
          textAlign="center"
        >
          {quiz.status !== "EVENT_START" && quiz.status !== "EVENT_STATISTICS" && <QuizInfo />}
          {quiz.status === "EVENT_STATISTICS" && <StatisticsInfo />}

          <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {quiz.status === "EVENT_QUIZ_REWARD" && <RewardInfo />}
            {(quiz.status === "EVENT_QUIZ_QUESTION" ||
              quiz.status === "EVENT_QUIZ_CHECK" ||
              quiz.status === "EVENT_QUIZ_ANSWER") && <QuestionInfo />}
          </Box>
        </Box>
      </Box>

      <WoodContainer innerP={1}>
        <Box
          width={isWeb ? "130px" : "25%"}
          position="absolute"
          top={isWeb ? -2 : 2}
          left={isWeb ? -2 : 0}
          zIndex={100}
        >
          <RatioBox ratio={1.2}>
            <Image src="/image/upper_ribbon.png" />
          </RatioBox>
        </Box>
        <Box
          width={isWeb ? "65px" : "15%"}
          position="absolute"
          bottom={isWeb ? 0 : 1}
          right={isWeb ? 1 : 2}
          zIndex={100}
        >
          <RatioBox ratio={0.9}>
            <Image src="/image/lower_ribbon.png" />
          </RatioBox>
        </Box>

        <Box
          p={{ xs: 2, sm: 3 }}
          pl={{ xs: 2, sm: 3, md: 6 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="230px"
          bgcolor="#fff"
        >
          {quiz.status === "EVENT_START" && <WaitContent />}
          {quiz.status === "EVENT_QUIZ_REWARD" && <RewardContent />}
          {quiz.status === "EVENT_QUIZ_QUESTION" && <QuestionContent />}
          {quiz.status === "EVENT_QUIZ_CHECK" && <CheckContent />}
          {quiz.status === "EVENT_QUIZ_ANSWER" && <AnswerContent />}
          {quiz.status === "EVENT_STATISTICS" && <StatisticsContent />}
        </Box>
      </WoodContainer>
    </Box>
  );
};
