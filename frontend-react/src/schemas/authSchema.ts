import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string()
        .min(3, {message: 'username must have at least 3 characters'})
        .max(20, {message: 'username must have at most 20 characters'}),

    password: z.string()
        .min(8, {message: 'password must have at least 8 characters'})
});

export const loginSchema = z.object({
    username: z.string()
        .min(1, {message: 'username is required'}),

    password: z.string()
        .min(1, {message: 'password is required'})
});

export type AuthFormData = z.infer<typeof registerSchema>;