import { toast } from 'react-toastify';

interface ApiError extends Error {
  statusCode?: number;
  errorDetails?: {
    message: string | string[];
    error: string;
    statusCode: number;
  };
}

export const handleApiError = (
  error: unknown,
  defaultMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
) => {
  const apiError = error as ApiError;
  let message = defaultMessage;

  if (apiError.errorDetails?.message) {
    message = Array.isArray(apiError.errorDetails.message) ? apiError.errorDetails.message[0] : apiError.errorDetails.message;
  }

  toast.error(message);
  console.error('API Error:', error);
};
