export const isRequired = (errorMessage) => {
  return (value) => {
    const validInfo = {
      isValid: true,
      error: null,
    };
    if (!value.trim()) {
      validInfo.isValid = false;
      validInfo.error = {
        errorMessage,
      };
    }
    return validInfo;
  };
};

export const isEmailValid = (errorMessage) => {
  return (value) => {
    const validInfo = {
      isValid: true,
      error: null,
    };
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(value)) {
      validInfo.isValid = false;
      validInfo.error = {
        errorMessage,
      };
    }
    return validInfo;
  };
};

export const hasAtLeastCharacters = (min, errorMessage) => {
  return (value) => {
    const validInfo = {
      isValid: true,
      error: null,
    };
    if (value.length < min) {
      validInfo.isValid = false;
      validInfo.error = {
        errorMessage,
      };
    }
    return validInfo;
  };
};

export const isValueBetween = (min, max, errorMessage) => {
  return (value) => {
    const validInfo = {
      isValid: true,
      error: null,
    };
    if (value.length < min || value.length > max) {
      validInfo.isValid = false;
      validInfo.error = {
        errorMessage,
      };
    }
    return validInfo;
  };
};

export const hasUpperCase = (errorMessage) => {
  return (value) => {
    const validInfo = {
      isValid: true,
      error: null,
    };
    const reg = /[A-Z]/;
    if (!reg.test(value)) {
      validInfo.isValid = false;
      validInfo.error = {
        errorMessage,
      };
    }
    return validInfo;
  };
};

export const hasDigit = (errorMessage) => {
  return (value) => {
    const validInfo = {
      isValid: true,
      error: null,
    };
    const reg = /\d/;
    if (!reg.test(value)) {
      validInfo.isValid = false;
      validInfo.error = {
        errorMessage,
      };
    }
    return validInfo;
  };
};

export const hasSpecialCharacter = (special, errorMessage) => {
  return (value) => {
    const validInfo = {
      isValid: false,
      error: null,
    };
    for (let letter of value) {
      if (letter === special) {
        validInfo.isValid = true;
        break;
      }
    }
    if (!validInfo.isValid) {
      validInfo.isValid = false;
      validInfo.error = {
        errorMessage,
      };
    }
    return validInfo;
  };
};
