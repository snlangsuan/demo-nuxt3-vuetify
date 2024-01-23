import { verifyToken } from '~/server/utils/auth.utils'
import { getUserById } from '~/server/data/user'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const req = getRequestURL(event)
  if (req.pathname === '/api/auth/refresh') return
  const accessTokenSecret = config.accessTokenPublicKey
  const authorization = getRequestHeader(event, 'Authorization')
  if (!authorization) return
  const token = authorization.replace('Bearer ', '').trim()
  try {
    const result = verifyToken(token, accessTokenSecret)
    if (!result) return
    const uid = result.id
    const user = getUserById(uid)
    event.context.auth = user
  } catch (_error) {}
})
