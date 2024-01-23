type TAfterCallBack = () => void
type TOnErrorCallback = (error: Error) => void

export interface IOnActionArgs {
  name: string
  after: (cb: TAfterCallBack) => void
  onError: (cb: TOnErrorCallback) => void
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    accessTokenPrivateKey: string
    accessTokenPublicKey: string
    accessTokenExpiry: number
    refreshTokenPrivateKey: string
    refreshTokenPublicKey: string
    refreshTokenExpiry: number
  }
  interface PublicRuntimeConfig {
    apiBase: string
  }
}

export type UserRole = 'admin' | 'user'

export type UserStatus = 'active' | 'inactive'

export interface UserProfile {
  id?: number
  username: string
  display_name: string
  role: UserRole
  status: UserStatus
  picture_url?: string | null
}
