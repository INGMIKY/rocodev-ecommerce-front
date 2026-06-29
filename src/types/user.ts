// import type { Dispatch, SetStateAction } from 'react'

export type UserInfo = {
    id: string
    username: string
    email: string
    isAdmin?: boolean
}

// export type UserContextType = {
//     userInfo: UserInfo | null
//     setUserInfo: Dispatch<SetStateAction<UserInfo | null>>
//     loading: boolean
//     checkSession: () => Promise<void>
//     getUserId: () => string | null
//     isAuthenticated: () => boolean
// }
