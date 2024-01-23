import type { UserProfile } from '~/typing'

const userIds = {
  'admin:admin': 1,
}

const userProfiles: Record<number, UserProfile> = {
  1: {
    id: 1,
    username: 'admin',
    display_name: 'admin',
    role: 'admin',
    status: 'active',
    picture_url: null,
  },
}

export const getUserLogin = (username: string, password: string): number => {
  const key = username + ':' + password
  const user = userIds[key as keyof typeof userIds]
  return user
}

export const getUserById = (id: number) => {
  return userProfiles[id as keyof typeof userProfiles]
}
