import JWT from 'jsonwebtoken'
import { verifyToken } from '~/server/utils/auth.utils'

export default defineEventHandler((event) => {
  try {
    const cookies = parseCookies(event)
    const query = getQuery(event)
    const refreshToken = cookies.refresh_token ?? query.refresh_token
    if (!refreshToken) {
      setResponseStatus(event, 400)
      return {
        success: false,
        message: 'ไม่พบรีเฟรชโทเคน',
      }
    }
    const authorization = getRequestHeader(event, 'Authorization')
    if (!authorization) {
      setResponseStatus(event, 401)
      return {
        success: false,
        message: 'โทเคนการเข้าถึงไม่ถูกต้อง',
      }
    }
    const token = authorization.replace('Bearer ', '').trim()
    try {
      const config = useRuntimeConfig()
      const accessTokenPublic = config.accessTokenPublicKey
      const accessTokenPrivate = config.accessTokenPrivateKey
      const refreshTokenPublic = config.refreshTokenPublicKey
      const refreshTokenPrivate = config.refreshTokenPrivateKey
      const accessTokenExpiry = config.accessTokenExpiry
      const refreshTokenExpiry = config.refreshTokenExpiry
      const accessTokenResult = verifyToken(token, accessTokenPublic, true)
      const refreshTokenResult = verifyToken(refreshToken, refreshTokenPublic)
      if (accessTokenResult && refreshTokenResult) {
        const newAccessToken = generateAccessToken(accessTokenResult.id, accessTokenPrivate, accessTokenExpiry)
        const newRefreshToken = generateRefreshToken(accessTokenResult.id, refreshTokenPrivate, refreshTokenExpiry)
        return {
          success: true,
          access_token: newAccessToken.token,
          refresh_token: newRefreshToken.token,
          expired: newAccessToken.exp,
        }
      }
    } catch (error) {
      if (error instanceof JWT.TokenExpiredError) {
        setResponseStatus(event, 400)
        return {
          message: 'โทเคนหมดอายุ',
        }
      }
      setResponseStatus(event, 500)
      return {
        message: 'เกิดข้อผิดพลาด',
      }
    }
  } catch (error) {}
})
