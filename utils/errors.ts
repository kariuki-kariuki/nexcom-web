export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0]);
    }
    return formatErrorMessage(response.message);
  }
  return 'Unkown error occured';
};

const formatErrorMessage = (message: string) =>
  message.charAt(0).toUpperCase() + message.slice(1);
