import { Api } from "@psyrenpark/api";

const userType = "cust";
const projectName = "bde" + userType;
const projectEnv = "dev";

const v1Api = `${projectName}-${projectEnv}-api-v1`;
const v1Cdn = `${projectName}-${projectEnv}-cdn-v1`;
const v1NoneAuth = `${projectName}-${projectEnv}-noneauth-v1`;
const v1Cms = `${projectName}-${projectEnv}-cms-v1`;

export const apiObject = {
  getTest: () => {
    return Api.getAxios().get("https://www.google.com");
  },

  getTest2: ({ test, test2 }) => {
    return Api.getAxios().get("https://www.naver.com");
  },

  getCommonData: () => {
    return Api.getAxios().get("https://file.dkdic.com/data/bde-dev-data.json");
  },

  getCodeType: ({ locale }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/code-types";
    var myInit = {
      headers: {},
      queryStringParameters: {},
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  getCodeType2: ({ locale, uuid }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = `/custs/test/${uuid}`;
    var myInit = {
      headers: {},
      queryStringParameters: {},
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  getAdminMyInfo: ({ locale }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/admins/my-info";
    var myInit = {
      headers: {},
      queryStringParameters: {},
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  getCustMyInfo: ({ locale }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/custs/my-info";
    var myInit = {
      headers: {},
      queryStringParameters: {},
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  putCustInit: ({ uuid }, loadingCallback) => {
    var apiName = v1NoneAuth;
    var path = `/custs/init/${uuid}`;
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {},
    };
    return Api.put(apiName, path, myInit, loadingCallback);
  },

  getQuizStatus: ({ locale }, loadingCallback) => {
    var apiName = v1NoneAuth;
    var path = `/quiz-status/last`;
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {},
    };
    return Api.get(apiName, path, myInit, loadingCallback);
  },

  putUserInit: ({ uuid, nickname, language, device_type }, loadingCallback) => {
    var apiName = v1NoneAuth;
    var path = `/users/init/${uuid}`;
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        nickname,
        language,
        device_type,
      },
    };
    return Api.put(apiName, path, myInit, loadingCallback);
  },

  putUserQuiz: ({ quiz_no, user_uuid, choice }, loadingCallback) => {
    var apiName = v1NoneAuth;
    var path = `/user-quizzes/${quiz_no}`;
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        user_uuid,
        choice,
      },
    };
    return Api.put(apiName, path, myInit, loadingCallback);
  },
};
