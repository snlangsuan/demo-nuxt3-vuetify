import { generateAccessToken, generateRefreshToken } from '~/server/utils/auth.utils'
import { getUserLogin } from '~/server/data/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const userId = getUserLogin(body.username, body.password)
  const accessTokenSecret = config.accessTokenPrivateKey
  const accessTokenExpiry = config.accessTokenExpiry
  const refreshTokenSecret = config.refreshTokenPrivateKey
  const refreshTokenExpiry = config.refreshTokenExpiry
  if (userId) {
    const accessToken = generateAccessToken(userId, accessTokenSecret, accessTokenExpiry)
    const refreshToken = generateRefreshToken(userId, refreshTokenSecret, refreshTokenExpiry)
    return {
      success: true,
      access_token: accessToken.token,
      refresh_token: refreshToken.token,
      expired: accessToken.exp,
    }
  }
  setResponseStatus(event, 400)
  return {
    success: false,
    message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
  }
})
