import AWS from "aws-sdk";

let s3: AWS.S3;
function initializeAWS() {
  s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: "us-east-1",
  });
}

export { s3, initializeAWS };
