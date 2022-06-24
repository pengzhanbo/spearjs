export interface HttpCode {
  code: number
  message: string
}

const define = (code: number, message: string): HttpCode => ({ code, message })

export const httpCode: Record<string, HttpCode> = {
  success: define(200, '请求成功'),
  error: define(400, '服务器错误， 请重试'),
  unknownError: define(401, '未知错误'),
  requestError: define(402, '请求不合法'),
  forbidden: define(403, '没有执行操作权限'),
  notFound: define(404, '找不到请求资源'),
  tokenError: define(405, '验证失败'),
  paramsError: define(1000, '参数错误'),
}
