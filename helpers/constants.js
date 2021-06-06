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
  INTERNAL_SERVER_ERROR: 500
}

const limits = {
  LIMIT_CONTACTS: 20,
  LIMIT_JSON: 10000,
  LIMIT_TIME: 15 * 60 * 1000,
  LIMIT_REQUEST: 100
}

const limiterAPI = {
  windowMs: limits.LIMIT_TIME,
  max: limits.LIMIT_REQUEST,
  handler: (req, res, next) => {
    return res
      .status(HttpCode.TOO_MANY_REQUESTS)
      .json({
        status: 'error',
        code: HttpCode.TOO_MANY_REQUESTS,
        message: messages.TOO_MANY_REQUESTS,
    })
  },
}

const messages = {
  TOO_MANY_REQUESTS: 'User has sent too many requests recently',
  NOT_FOUND: 'error: Contact Not Found',
  BAD_REQUEST: 'error: missing fields',
  CONFLICT: 'Email in use',
  REMOVE: 'contact deleted',
  UNAUTHORIZED: 'Email or password is wrong',
}

const Subscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
}

module.exports = { HttpCode, Subscription, limits, limiterAPI, messages }
