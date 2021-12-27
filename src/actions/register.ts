const API_URL = process.env.API_URL;
var axios = require("axios");

export const register = async (email: string, username: string, password: string) => {
  const data = JSON.stringify({
    mail: email,
    name: username,
    pass: password,
  });

  const config = {
    method: "post",
    url: `${API_URL}/rest/create-account`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await makeTheCall(config);
};

export const registerVerify = async (email: string, token: string) => {
  const data = JSON.stringify({
    mail: email,
    temp_token: token,
  });

  const config = {
    method: "post",
    url: `${API_URL}/rest/verify-account`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await makeTheCall(config);
};

export const registerResendVerification = async (email: string) => {
  const data = JSON.stringify({
    mail: email,
  });

  const config = {
    method: "post",
    url: `${API_URL}/rest/resend-token`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await makeTheCall(config);
};

async function makeTheCall (config: Object) {
  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    return error.response;
  }
}
