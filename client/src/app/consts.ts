const env = window.location.href.indexOf("amazonaws") >= 0 ? "PROD" : "DEV";

export const API:string = (env == "PROD" ? 'http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/api' : "http://localhost:3000/api";

export const HEADERS:Record<string, string> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
};
