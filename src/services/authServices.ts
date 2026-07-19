import axios from 'axios'
import type { AuthFormValues } from '../types/auth'
import type { UseFormReset } from 'react-hook-form'

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
        throw new Error('Error al obtener el perfil')
    }
}

export const loginService = async () => {}

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
            alert('REGISTRO EXISTOSO DEL USUARIO')
            reset()
        }
    } catch (error) {
        alert('Error al registrarse')
        console.log(error)
    }
}

export const logoutService = async () => {}
