import type {
  GetProfileResponseType,
  UpdateProfileLanguageRequestType,
  UpdateProfileLanguageResponseType,
  UpdateProfileNameRequestType,
  UpdateProfileNameResponseType,
  UpdateProfileNotificationRequestType,
  UpdateProfileThemeRequestType,
  UpdateProfileThemeResponseType,
} from "../../../types/profileServiceTypes";
import {
  getProfileRoute,
  updateProfileLanguageRoute,
  updateProfileNameRoute,
  updateProfileNotificationRoute,
  updateProfileThemeRoute,
} from "../../../utils/urlApi";
import { apiFetch } from "../client/apiClient";

const requestGetProfile = (
  acesstoken: string
): Promise<GetProfileResponseType> => {
  const response: Promise<GetProfileResponseType> = apiFetch(
    getProfileRoute.route,
    {
      method: getProfileRoute.method,
    },
    acesstoken
  );

  return response;
};

const requestUpdateProfileName = (
  data: UpdateProfileNameRequestType,
  acesstoken: string
): Promise<UpdateProfileNameResponseType> => {
  const response: Promise<UpdateProfileNameResponseType> = apiFetch(
    updateProfileNameRoute.route,
    {
      method: updateProfileNameRoute.method,
      body: JSON.stringify(data),
    },
    acesstoken
  );

  return response;
};

const requestUpdateProfileLanguage = (
  data: UpdateProfileLanguageRequestType,
  acesstoken: string
): Promise<UpdateProfileLanguageResponseType> => {
  const response: Promise<UpdateProfileLanguageResponseType> = apiFetch(
    updateProfileLanguageRoute.route,
    {
      method: updateProfileLanguageRoute.method,
      body: JSON.stringify(data),
    },
    acesstoken
  );

  return response;
};

const requestUpdateProfileTheme = (
  data: UpdateProfileThemeRequestType,
  accessToken: string
): Promise<UpdateProfileThemeResponseType> => {
  const response: Promise<UpdateProfileThemeResponseType> = apiFetch(
    updateProfileThemeRoute.route,
    {
      method: updateProfileThemeRoute.method,
      body: JSON.stringify(data),
    },
    accessToken
  );

  return response;
};

const requestUpdateProfileNotification = (
  data: UpdateProfileNotificationRequestType,
  accessToken: string
): Promise<UpdateProfileThemeResponseType> => {
  const response: Promise<UpdateProfileThemeResponseType> = apiFetch(
    updateProfileNotificationRoute.route,
    {
      method: updateProfileNotificationRoute.method,
      body: JSON.stringify(data),
    },
    accessToken
  );

  return response;
};

export {
  requestGetProfile,
  requestUpdateProfileName,
  requestUpdateProfileLanguage,
  requestUpdateProfileTheme,
  requestUpdateProfileNotification,
};
