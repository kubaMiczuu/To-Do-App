import {z} from 'zod'

export const profileSchema = z.object({
    username: z.string()
        .min(3, {message: 'username must be at least 3 characters'})
        .max(20, {message: 'username must be at most 20 characters'}),

    oldPassword: z.string()
        .min(8, {message: 'password must be at least 8 characters'}),

    newPassword: z.string()
        .min(8, {message: 'password must be at least 8 characters'}),

    confirmPassword: z.string()
        .min(1, {message: 'please confirm your password'})
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: 'password do not match',
    path: ["confirmPassword"],
});

export type ChangePasswordSchema = z.infer<typeof profileSchema>;