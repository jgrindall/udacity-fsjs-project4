const env = window.location.href.indexOf("amazonaws") >= 0 ? "PROD" : "DEV";

const API_PROD = 'http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/api';
const API_DEV = "http://localhost:3000/api";

export const API:string = (env == "PROD" ?  API_PROD : API_DEV);

export const HEADERS:Record<string, string> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
};
