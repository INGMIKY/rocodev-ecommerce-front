import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import type { AuthFormValues } from '../../types/auth'
import { registerService } from '../../services/authServices'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AuthFormValues>({
        mode: 'onChange', //validacion en tiempo real
    })

    // Estado para mostrar contrasenia u ocultar
    const [showPassword, setShowPassword] = useState(true)

    const onSubmit = (data: AuthFormValues) => {
        // Registrando al usuario
        registerService(data, reset)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
        >
            <div>
                <input
                    {...register('username', {
                        required: 'El nombre de usuario es requerido',
                        minLength: {
                            value: 3,
                            message: 'Minimo 3 caracteres',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Maximo de 20 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${errors.username ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Nombre de usuario"
                />
                {errors.username && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.username.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('email', {
                        required: 'El Correo electronico es requerido',
                        pattern: {
                            value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/,
                            message: 'Correo electronico invalido',
                        },
                        minLength: {
                            value: 6,
                            message: 'Minimo de 6 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message: 'Maximo de 254 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${errors.email ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Correo electronico"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="relative">
                <input
                    {...register('password', {
                        required:
                            'La contraseña es requerida [6-254 caracteres de longitud]',
                        minLength: {
                            value: 6,
                            message: 'Minimo 6 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message: 'Maximo 254 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${errors.password ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="contraseña"
                />
                <button
                    className="cursor-pointer absolute right-4 top-[20px] transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword((prev) => !prev)}
                    type="button"
                    aria-label={
                        showPassword
                            ? 'Ocultar contraseña'
                            : 'Mostrar contraseña'
                    }
                >
                    {showPassword ? (
                        <FaEyeSlash size={23} />
                    ) : (
                        <FaEye size={23} />
                    )}
                </button>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <button className="btn btn-primary" type="submit">
                Registrarse
            </button>
        </form>
    )
}

export default RegisterForm
