import axiosX from 'axios';

const axios = axiosX.create({
  timeout: 1000,
  baseURL: 'http://localhost:3004'
  // headers: {'X-Custom-Header': 'foobar'},
});


export default axios;


export function getaccountnumber(length: number = 5): string {
  let accountNumber = '';
  for (let i = 0; i < length; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString();
  }
  return accountNumber;
}
