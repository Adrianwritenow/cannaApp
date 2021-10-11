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

  console.log("DATA:::", data);

  return axios(config)
    .then(function (response: { data: any }) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log("ERR");
      console.log(error);
    });
};
