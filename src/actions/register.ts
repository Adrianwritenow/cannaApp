const API_URL = "https://dev-cannapages.pantheonsite.io";
var axios = require("axios");

export const register = (email: string, password: string) => {
  const data = JSON.stringify({
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
    method: "post",
    url: `${API_URL}/user/register?_format=json`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response: { data: any }) {
      return response;
    })
    .catch(function (error: { response: any }) {
      return error.response;
    });
};
