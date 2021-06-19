const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
}

const limits = {
  LIMIT_AVATAR_SIZE: 250,
  LIMIT_FILE_SIZE: 2 * 1024 * 1024,
  LIMIT_CONTACTS: 20,
  LIMIT_JSON: 10 * 1024,
  LIMIT_TIME: 15 * 60 * 1000,
  LIMIT_REQUEST: 10,
  LIMIT_CREATE_ACC_TIME: 60 * 60 * 1000,
  LIMIT_CREATE_REQUEST: 5,
}

const messages = {
  OK: 'Verification successful',
  BAD_REQUEST: 'error: missing fields',
  BAD_REQUEST_USER: 'Verification has already been passed',
  CONFLICT: 'Email in use',
  CONFLICT_VERIFY: 'Email has been verified',
  INVALID_OBJ_ID: 'Invalid ObjectId',
  NOT_FOUND: 'error: Contact Not Found',
  REMOVE: 'contact deleted',
  RESUBMIT_OK: 'Verification email sent',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  TOO_MANY_REQUESTS: 'User has sent too many requests recently',
  UNAUTHORIZED: 'Email or password is wrong',
  WRONG_FORMAT: 'Use for avatar image file',
}

const Subscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
}

module.exports = { HttpCode, Subscription, limits, messages }
