
//export const API:string = 'http://localhost:3000/api';

console.log(window.location.href);

export const API:string = 'http://jgrindalludacity-dev.us-west-2.elasticbeanstalk.com/api';

export const HEADERS:Record<string, string> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
};
