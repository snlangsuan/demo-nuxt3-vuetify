import dayjs from 'dayjs'
import JWT from 'jsonwebtoken'

interface IGenerateToken {
  token: string
  iat: number
  exp: number
}

interface ITokenResult {
  id: number
  uid: string
  iat: number
}

export const generateAccessToken = (uid: number, privateKey: JWT.Secret, expiry: number = 1800000): IGenerateToken => {
  const iat = dayjs().unix()
  const token = JWT.sign({ uid, iat }, privateKey, {
    algorithm: 'RS256',
    expiresIn: expiry,
  })
  const exp = dayjs.unix(iat).add(30, 'minute').unix()
  return {
    token,
    iat,
    exp,
  }
}

export const verifyToken = (token: string, publicKey: JWT.Secret, ignore: boolean = false): ITokenResult | void => {
  const payload = JWT.verify(token, publicKey, {
    algorithms: ['RS256'],
    ignoreExpiration: ignore,
  })
  return payload as ITokenResult
}

export const generateRefreshToken = (
  uid: number,
  privateKey: JWT.Secret,
  expiry: number = 25200000
): IGenerateToken => {
  const iat = dayjs().unix()
  const token = JWT.sign({ uid, iat }, privateKey, {
    algorithm: 'RS256',
    expiresIn: expiry,
  })
  const exp = dayjs.unix(iat).add(30, 'minute').unix()
  return {
    token,
    iat,
    exp,
  }
}
