import qs from "qs";

const API_URL = "https://dev-cannapages.pantheonsite.io";
var axios = require("axios");

export const register = (email: string, password: string) => {
  const data = qs.stringify({
    name: {
      value: email,
    },
    mail: {
      value: email,
    },
    pass: {
      value: password,
    },
  });
  const config = {
    method: "POST",
    url: `${API_URL}/user/register?_format=json`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config)
    .then(function (response: { data: any }) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
