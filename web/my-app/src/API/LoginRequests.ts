import axios from 'axios';
import { Credentials } from '../Types/Credentilas';
import { enqueueSnackbar } from 'notistack';
import { deleteCookie, getCookie } from '../Helpers/CookieHelper';

interface LoginResponse {
  data: {
    access_token?: string,
    msg?: string
  },
  status: number
}

export async function loginRequest1(credentials: Credentials) {
  fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    credentials: 'include', // Include cookies in the request
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": credentials.username,
      "password": credentials.password
    }),
})
}

export async function loginRequest(credentials: Credentials) {
  const response: LoginResponse = await axios({
    headers: {
      "Content-Type": 'application/json'
    },
    method: 'post',
    url: 'http://127.0.0.1:5000/login',
    data: {
      "username": credentials.username,
      "password": credentials.password
    },
    withCredentials: true,
    validateStatus(status) {
      return status < 500;
    },
  }).catch(function (error) {
    const response: LoginResponse = {
      data: {
        msg: 'Sorry, internal error occured'
      },
      status: error.status
    }
    return response
  }
  );
  return response
}


interface getUserResponse {
  data: {
    username?: string,
    msg?: string
  },
  status: number
}
export async function getUserRequest() {
  const accessTokenString = getCookie("access_token");
  const accessToken = accessTokenString ? JSON.parse(accessTokenString) : accessTokenString
  const response: getUserResponse = await axios({
    headers: {
      "Content-Type": 'application/json',
      "Authorization": "Bearer " + accessToken
    },
    method: 'get',
    url: 'http://127.0.0.1:5000/getUser',
    withCredentials: true,
    validateStatus(status) {
      return status < 500;
    },
  }).catch(function (error) {
    const response: LoginResponse = {
      data: {
        msg: 'Sorry, internal error occured'
      },
      status: error.status
    }
    return response
  }
  );
  return response
}


export function isSigned(): boolean {
  const accessTokenString = getCookie("access_token");
  const accessToken: boolean = accessTokenString ? JSON.parse(accessTokenString) : accessTokenString
  return !!accessToken;
}

export const LogoutAction = () => {
  deleteCookie("access_token");
}