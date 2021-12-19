import "@testing-library/jest-dom";

import awsmobile from "./aws-exports";
import { Auth } from "@psyrenpark/auth";
import { Api } from "@psyrenpark/api";
import { Storage } from "@psyrenpark/storage";
Auth.setConfigure(awsmobile);
Api.setConfigure(awsmobile);
Storage.setConfigure(awsmobile);

import { Analytics, AWSKinesisFirehoseProvider } from "aws-amplify";
Analytics.addPluggable(new AWSKinesisFirehoseProvider());
Analytics.configure({
  AWSKinesisFirehose: {
    // OPTIONAL -  Amazon Kinesis Firehose service region
    region: "ap-northeast-1",

    // OPTIONAL - The buffer size for events in number of items.
    bufferSize: 5000,

    // OPTIONAL - The number of events to be deleted from the buffer when flushed.
    flushSize: 100,

    // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
    flushInterval: 300, // 5s

    // OPTIONAL - The limit for failed recording retries.
    resendLimit: 5,
  },
});

import { apiObject } from "api";
import { I18n } from "aws-amplify";
async function getCommonData() {
  let data = await apiObject.getCommonData();
  I18n.putVocabularies(data.data.lang_info_dic);
}
getCommonData();
