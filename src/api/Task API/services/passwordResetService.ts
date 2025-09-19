import { resetRequestRoute, resetTokenRoute } from "../../../utils/urlApi";
import { apiFetch } from "../client/apiClient";

const requestReset = (email: string): Promise<void> => {
  const response: Promise<void> = apiFetch(resetRequestRoute.route, {
    method: resetRequestRoute.method,
    body: JSON.stringify({ email }),
  });

  return response;
};

const requestChangePassword = (resetToken: string, newPassword: string): Promise<void> => {

  const endpoint = `${resetTokenRoute.route}${resetToken}`;

  const response: Promise<void> = apiFetch(endpoint, {
    method: resetTokenRoute.method,
    body: JSON.stringify({ newPassword }),
  });

  return response;
};

export { requestReset, requestChangePassword };
