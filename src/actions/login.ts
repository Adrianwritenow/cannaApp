const API_URL = "https://dev-cannapages.pantheonsite.io";
var axios = require("axios");

export const login = (email: string, password: string) => {
  const data = JSON.stringify({
    name: email,
    pass: password,
  });
  const config = {
    method: "post",
    url: `${API_URL}/user/login?_format=json`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response: { data: any }) {
      return response.data;
    })
    .catch(function (error: any) {
      return error.response.data;
    });
};
