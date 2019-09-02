const checkStatusCode = statusCode => {
  switch (true) {
    case /^2[0-9]{2}/.test(statusCode):
      return ['success', true];

    case /^4[0-9]{2}/.test(statusCode):
      return [`Client Error, statusCode: ${statusCode}`, false];

    case /^5[0-9]{2}/.test(statusCode):
      return [`Server Error, statusCode: ${statusCode}`, false];

    default:
      return [`알 수 없는 에러입니다, statusCode: ${statusCode}`, false];
  }
};

export default checkStatusCode;
