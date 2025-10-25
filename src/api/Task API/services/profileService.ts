import type {
  GetProfileResponseType,
  UpdateProfileLanguageRequestType,
  UpdateProfileLanguageResponseType,
  UpdateProfileNameRequestType,
  UpdateProfileNameResponseType,
  UpdateProfileNotificationRequestType,
  UpdateProfileThemeRequestType,
  UpdateProfileThemeResponseType,
  UpdateProfileNotificationResponseType,
} from "../../../types/profileServiceTypes";
import {
  getProfileRoute,
  updateProfileLanguageRoute,
  updateProfileNameRoute,
  updateProfileNotificationRoute,
  updateProfileThemeRoute,
} from "../../../utils/urlApi";
import { apiFetch } from "../client/apiClient";

const requestGetProfile = (): Promise<GetProfileResponseType> => {
  console.groupCollapsed('🚀 API Request: getProfile');
  console.log('Requesting user profile...');
  console.groupEnd();

  const response: Promise<GetProfileResponseType> = apiFetch(
    getProfileRoute.route,
    {
      method: getProfileRoute.method,
    }
  );

  return response;
};

const requestUpdateProfileName = (
  data: UpdateProfileNameRequestType
): Promise<UpdateProfileNameResponseType> => {
  const response: Promise<UpdateProfileNameResponseType> = apiFetch(
    updateProfileNameRoute.route,
    {
      method: updateProfileNameRoute.method,
      body: JSON.stringify(data),
    }
  );

  return response;
};

const requestUpdateProfileLanguage = (
  data: UpdateProfileLanguageRequestType
): Promise<UpdateProfileLanguageResponseType> => {
  const response: Promise<UpdateProfileLanguageResponseType> = apiFetch(
    updateProfileLanguageRoute.route,
    {
      method: updateProfileLanguageRoute.method,
      body: JSON.stringify(data),
    },

  );

  return response;
};

const requestUpdateProfileTheme = (
  data: UpdateProfileThemeRequestType
): Promise<UpdateProfileThemeResponseType> => {
  const response: Promise<UpdateProfileThemeResponseType> = apiFetch(
    updateProfileThemeRoute.route,
    {
      method: updateProfileThemeRoute.method,
      body: JSON.stringify(data),
    },
  );

  return response;
};

const requestUpdateProfileNotification = (
  data: UpdateProfileNotificationRequestType
): Promise<UpdateProfileNotificationResponseType> => {
  const response: Promise<UpdateProfileNotificationResponseType> = apiFetch(
    updateProfileNotificationRoute.route,
    {
      method: updateProfileNotificationRoute.method,
      body: JSON.stringify(data),
    },
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
