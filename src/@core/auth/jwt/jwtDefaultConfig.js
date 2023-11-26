import { apiBaseUrl } from "../../../configs/apiConfig"

// ** Auth Endpoints
export default {
  loginEndpoint: apiBaseUrl + "/api/user/login/",
  // loginEndpoint: "http://localhost:8000" + "/api/user/login/",
  registerEndpoint: apiBaseUrl + "/api/user/register/",
  createOrganizationEndpoint: apiBaseUrl + "/api/user/create-tanent",
  refreshEndpoint: "/jwt/refresh-token",
  logoutEndpoint: "/jwt/logout",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
}
