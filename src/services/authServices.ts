import axios from 'axios'
import type { AuthFormValues, AuthFormValuesLogin } from '../types/auth'
import type { UseFormReset } from 'react-hook-form'
import type { UserInfo, UserContextType } from '../types/user'

type LoginResult = {
    success: boolean
    message: string
}

const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
// http://localhost:3001/api/auth

// Para incluir las cookies en las peticiones
axios.defaults.withCredentials = true

export const getProfileService = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el perfil', {
            cause: error,
        })
    }
}

export const loginService = async (
    data: AuthFormValuesLogin,
    reset: UseFormReset<AuthFormValuesLogin>,
    setRedirect: (value: boolean) => void,
    setUserInfo: UserContextType['setUserInfo'],
): Promise<LoginResult> => {
    try {
        const response = await axios.post<UserInfo>(`${API_URL}/login`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, //para que viaje el token
        })

        //Comprobar si la respuesta es existosa
        // if (response.status === 200) {
        setUserInfo(response.data)
        reset()
        setRedirect(true)

        return {
            success: true,
            message: 'Inicio de sesión éxitoso',
        }
        // }
    } catch (error) {
        console.log('Error al logearse', error)
        return {
            success: false,
            message: 'Error al logearse',
        }
    }
}

export const registerService = async (
    data: AuthFormValues,
    reset: UseFormReset<AuthFormValues>,
    setRedirect: (value: boolean) => void,
    checkSession: () => Promise<void> | void,
) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        console.log('RESPUESTA:', response)
        if (response.status === 201 || response.status === 200) {
            // Verificar la sesión real del servidor después del registro
            await checkSession()
            reset()
            setRedirect(true)

            return {
                message: true,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: false,
        }
    }
}

export const logoutService = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response.data?.message || 'Error al cerrar la sesión',
            {
                cause: error,
            },
        )
    }
}
