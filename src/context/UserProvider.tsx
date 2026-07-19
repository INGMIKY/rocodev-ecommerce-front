import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import type { ReactNode } from 'react'
import type { UserInfo } from '../types/user'
import { getProfileService } from '../services/authServices'

type UserContextProviderProps = {
    children: ReactNode
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [loading, setLoading] = useState(true)

    // Función para verificar la sesión del usuario
    const checkSession = async () => {
        try {
            setLoading(true)
            const userData = await getProfileService()
            setUserInfo(userData)
        } catch (error) {
            console.log('No hay sesión activa', error)
            setUserInfo(null)
        } finally {
            setLoading(false)
        }
    }

    // Función para obtener el id del usuario autenticado
    const getUserId = () => {
        return userInfo?.id || null
    }

    // Verificar si el usuario está autenticado o no
    const isAuthenticated = () => {
        return !!userInfo?.id // el doble signo lo comvierte en booleano
    }

    useEffect(() => {
        checkSession()
    }, [])
    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                loading,
                checkSession,
                getUserId,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
