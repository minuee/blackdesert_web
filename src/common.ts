import { Analytics } from "aws-amplify";

export const handleFullscreen = (rootRef: any) => {
  if (rootRef.current.requestFullscreen) {
    rootRef.current.requestFullscreen();
  } else if (rootRef.current.mozRequestFullScreen) {
    rootRef.current.mozRequestFullScreen();
  } else if (rootRef.current.webkitRequestFullscreen) {
    rootRef.current.webkitRequestFullscreen();
  } else if (rootRef.current.msRequestFullscreen) {
    rootRef.current.msRequestFullscreen();
  }
};

export const sendErrorLog = (fileName: string, functionName: string, error: any, state: any) => {
  const occurr_at = new Date().toISOString();
  // console.log({
  //   occurr_at: occurr_at,
  //   file_name: fileName,
  //   // error_msg: functionName,
  //   function_name: functionName,
  //   error: error,
  //   state: state,
  // });

  try {
    Analytics.record(
      {
        data: {
          occurr_at: occurr_at,
          file_name: fileName,
          // error_msg: functionName,
          function_name: functionName,
          error: error,
          state: state,
        },
        streamName: "bde-dev-data",
      },
      "AWSKinesisFirehose",
    );
  } catch (error) {
    console.log("log -> ------------------------------------");
    console.log("log -> ~ sendErrorLog ~ error", error);
    console.log("log -> ------------------------------------");
  }
};

export function sleep(ms: number): any {
  return new Promise((r) => setTimeout(r, ms));
}
