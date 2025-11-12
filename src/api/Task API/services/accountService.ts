import type {
  DeleteAccountResponseTypes,
  LoginRequestTypes,
  LoginResponseTypes,
  LogoutResponseTypes,
  RefreshResponseTypes,
  RegisterRequestTypes,
  RegisterResponseTypes,
  ResetPasswordRequestTypes,
  ResetPasswordResponseTypes,
  ResetRequestTypes,
  ResetResponseTypes,
  UpdateAccountRequestTypes,
  UpdateAccountResponseTypes,
} from "../../../types/AccountServiceTypes";
import {
  deleteAccountRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  registerRoute,
  resetPasswordRoute,
  resetRequestRoute,
  updateAccountRoute,
} from "../../../utils/urlApi";
import { apiFetch, setAccessToken } from "../client/apiClient";

const requestRegister = async (
  data: RegisterRequestTypes
): Promise<RegisterResponseTypes> => {
  const response: RegisterResponseTypes = await apiFetch(registerRoute.route, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.accessToken) {
    setAccessToken(response.accessToken);
  }

  return response;
};

const requestLogin = async (
  data: LoginRequestTypes
): Promise<LoginResponseTypes> => {
  const response: LoginResponseTypes = await apiFetch(loginRoute.route, {
    method: loginRoute.method,
    body: JSON.stringify(data),
  });

  console.groupCollapsed("🚀 API Request: login");
  console.log("Data sent:", data);
  console.log("Response received:", response);
  console.groupEnd();

  if (response.accessToken) {
    setAccessToken(response.accessToken);
  }

  return response;
};

const requestLogout = (): Promise<LogoutResponseTypes> => {
  const response: Promise<LogoutResponseTypes> = apiFetch(logoutRoute.route, {
    method: logoutRoute.method,
  });

  return response;
};

const requestUpdateAccount = async (
  data: UpdateAccountRequestTypes
): Promise<UpdateAccountResponseTypes> => {
  const response: UpdateAccountResponseTypes = await apiFetch(
    updateAccountRoute.route,
    {
      method: updateAccountRoute.method,
      body: JSON.stringify(data),
    }
  );

  return response;
};

const requestRefresh = async (): Promise<RefreshResponseTypes> => {
  const response: Promise<RefreshResponseTypes> = await apiFetch(
    refreshRoute.route,
    {
      method: refreshRoute.method,
    }
  );

  return response;
};

const requestPasswordResetEmail = (
  data: ResetRequestTypes
): Promise<ResetResponseTypes> => {
  const response: Promise<ResetResponseTypes> = apiFetch(
    resetRequestRoute.route,
    {
      method: resetRequestRoute.method,
      body: JSON.stringify(data),
    }
  );

  return response;
};

const requestNewPassword = (
  data: ResetPasswordRequestTypes,
  token: string
): Promise<ResetPasswordResponseTypes> => {
  const response: Promise<ResetPasswordResponseTypes> = apiFetch(
    `${resetPasswordRoute.route}?token=${token}`,
    {
      method: resetPasswordRoute.method,
      body: JSON.stringify(data),
    }
  );

  return response;
};

const requestDeleteAccount = (): Promise<DeleteAccountResponseTypes> => {
  const response: Promise<DeleteAccountResponseTypes> = apiFetch(
    deleteAccountRoute.route,
    {
      method: deleteAccountRoute.method,
    }
  );

  return response;
};

export {
  requestLogin,
  requestLogout,
  requestRefresh,
  requestRegister,
  requestUpdateAccount,
  requestPasswordResetEmail,
  requestNewPassword,
  requestDeleteAccount,
};
