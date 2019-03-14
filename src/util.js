function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const parseError = errorResponse => {
  const handleMessage = message => {
    let wholeMessage = '';
    const errors = message;
    if (typeof errors === 'string') {
      wholeMessage = errors;
    } else if (errors.constructor === Array) {
      errors.forEach(error => {
        wholeMessage = `${wholeMessage}${error.message ? error.message : error}\n`;
      });
    } else if (errors.constructor === Object) {
      if (errors.message) {
        wholeMessage = `${wholeMessage}${errors.message}\n`;
      } else {
        Object.keys(errors).forEach(property => {
          errors[property].forEach(value => {
            wholeMessage = `${wholeMessage}${capitalizeFirstLetter(property)} ${value} \n`;
          });
        });
      }
    }
    return wholeMessage;
  };
  if (errorResponse.message) {
    return handleMessage(errorResponse.message);
  }
  if (errorResponse.full_messages) {
    return handleMessage(errorResponse.full_messages);
  }
  if (errorResponse.errors) {
    return handleMessage(errorResponse.errors);
  }
  if (errorResponse.error) {
    return handleMessage(errorResponse.error);
  }
  return 'Unknown error';
};

export const handleErrorRequest = error => {
  if (error.response === undefined) {
    return 'Service not available';
  }
  if (Object.keys(error.response.data).length === 0) {
    return error.toString();
  }
  return parseError(error.response.data);
};