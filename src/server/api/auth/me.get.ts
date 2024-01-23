export default defineEventHandler((event) => {
  if (!event.context.auth) {
    setResponseStatus(event, 401)
    return {
      success: false,
      message: 'โทเคนการเข้าถึงไม่ถูกต้อง',
    }
  }
  return event.context.auth
})
