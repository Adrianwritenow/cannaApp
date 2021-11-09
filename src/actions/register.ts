const API_URL = process.env.API_URL;
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
<<<<<<< HEAD
    .catch(function (error: { response: any }) {
      return error.response;
=======
    .catch(function (error: any) {
      return error;
>>>>>>> fix:remove console.logs and use processENV
    });
};
