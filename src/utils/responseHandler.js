// ======== Model Data =========
const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

// ======== Response Data with 200 =========
const ok = (res, data) => responseWithData(res, 200, data);

const noContent = (res, message) => {
  responseWithData(res, 204, {
    status: 204,
    message,
  });
};

const created = (res, data) => responseWithData(res, 201, data);

const updated = (res, data) => responseWithData(res, 201, data);

const badrequest = (res, message) => {
  responseWithData(res, 400, {
    status: 400,
    message,
  });
};

const unauthorize = (res, message) => {
  responseWithData(res, 401, {
    status: 401,
    message,
  });
};

const forbidden = (res, message) =>
  responseWithData(res, 403, {
    status: 403,
    message,
  });

const notfound = (res, message) =>
  responseWithData(res, 404, {
    status: 404,
    message,
  });

const dataConflict = (res, message) => {
  responseWithData(res, 409, {
    status: 409,
    message,
  });
};

const validation = (res, error) =>
  responseWithData(res, 422, {
    status: 422,
    message: error,
  });

// ======== Response Data with 400 =========
const error = (res, message) => {
  responseWithData(res, 500, {
    status: 500,
    message,
  });
};

module.exports = {
  ok,
  updated,
  created,

  error,
  badrequest,
  noContent,
  unauthorize,
  dataConflict,
  notfound,
  forbidden,
  validation,
};
