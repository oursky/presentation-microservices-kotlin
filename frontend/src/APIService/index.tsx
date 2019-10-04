import LoginData from "../interfaces/LoginData";
import RegisterData from "../interfaces/RegisterData";
import { LoginResult, RegisterResult } from "../interfaces/APIResponses";
const API_ENDPOINT = "http://localhost:8080";
const API_PATH = {
  AUTH: "/auth",
  PRODUCT: "/product/",
};
const HEADER = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const AUTH_HEADER = (token: String) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

const AUTH_PATH = (isMerchant: boolean) => (isMerchant ? "/merchant" : "/user");

const APIService = {
  Auth: {
    login: (data: LoginData): Promise<LoginResult> =>
      fetch(`${API_ENDPOINT}${API_PATH.AUTH}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: HEADER,
      }).then(res => res.json()),

    register: (
      data: RegisterData,
      isMerchant: boolean
    ): Promise<RegisterResult> =>
      fetch(`${API_ENDPOINT}${API_PATH.AUTH}${AUTH_PATH(isMerchant)}/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: HEADER,
      }).then(res => res.json()),

    verifyAccessToken: (token: String): Promise<number> =>
      fetch(`${API_ENDPOINT}${API_PATH.AUTH}/verify`, {
        method: "GET",
        headers: {
          ...HEADER,
          ...AUTH_HEADER(token),
        },
      }).then(res => res.status),
  },

  Products: {
    delete: (id: number, token: String) =>
      fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}${id}`, {
        method: "DELETE",
        headers: AUTH_HEADER(token),
      }).then(res => res.json()),

    list: () =>
      fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}`)
        .then(res => res.json())
        .then(result => result.products),

    add: (data: FormData, token: String) => {
      return fetch(`${API_ENDPOINT}${API_PATH.PRODUCT}`, {
        method: "POST",
        body: data,
        headers: AUTH_HEADER(token),
      }).then(res => res.json());
    },
  },
};

export default APIService;
