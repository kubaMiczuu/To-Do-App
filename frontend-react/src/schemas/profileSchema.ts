import {z} from 'zod'

export const profileSchema = z.object({
    username: z.string()
        .min(3, {message: 'username must have at least 3 characters'})
        .max(20, {message: 'username must have at most 20 characters'}),

    oldPassword: z.string()
        .min(8, {message: 'password must have at least 8 characters'}),

    newPassword: z.string()
        .min(8, {message: 'password must have at least 8 characters'}),

    confirmPassword: z.string()
        .min(1, {message: 'please confirm your password'})
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: 'password do not match',
    path: ["confirmPassword"],
})
    .refine((data) => data.newPassword !== data.oldPassword, {
        message: 'new password should be different than your old password',
        path: ["newPassword"],
    });

export type ProfileSchema = z.infer<typeof profileSchema>;