import {registerSchema, loginSchema} from "./authSchema.ts";
import type {AuthFormData} from "./authSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface AuthPageProps {
    mode: 'register' | 'login'
}

const AuthPage = ({ mode }: AuthPageProps) => {

    const currentSchema = mode === 'register' ? registerSchema : loginSchema;
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<AuthFormData>({
        resolver: zodResolver(currentSchema),
        mode: "onTouched"
    });

    const onSubmit = async (data: AuthFormData) => {
        try {
            if (mode === 'login') {
                login();
                navigate("/dashboard");
            } else {
                console.log("Sending register to API:", data);
            }
        } catch (error) {
            console.error("Authorization error:", error);
        }
    };

    return (
        <div className={`flex min-h-[75vh] items-center justify-center`}>
            <div className={`w-full max-w-md bg-white border border-slate-100 shadow-sm shadow-slate-200/40 p-8 cursor-default rounded-lg`}>

                <h2 className={`text-2xl font-bold text-slate-800 mb-6 text-center`}>
                    {mode === 'register' ? 'Register' : 'Login'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4`}>

                    <div className={`flex flex-col gap-1`}>
                        <input type={'text'} placeholder={'Username'} {...register('username')}
                        className={`text-slate-800 px-4 py-2 rounded-xl focus:outline-none transition duration-200 border border-slate-100 ${errors.username ? 'bg-rose-200 focus:bg-rose-200' : 'bg-white focus:bg-sky-50'}`}/>
                        {errors.username && (
                            <p className={`text-xs font-medium text-rose-500 pl-1`}>{errors.username.message}</p>
                        )}
                    </div>

                    <div className={`flex flex-col gap-1`}>
                        <input type={'password'} placeholder={'Password'} {...register('password')}
                        className={`text-slate-800 px-4 py-2 rounded-xl focus:outline-none transition duration-200 border border-slate-100 ${errors.password ? 'bg-rose-200 focus:bg-rose-200' : 'bg-white focus:bg-sky-50'}`}/>
                        {errors.password && (
                            <p className={`text-xs font-medium text-rose-500 pl-1`}>{errors.password.message}</p>
                        )}
                    </div>

                    <div className={`flex flex-col items-center`}>
                        <button type="submit" className={`text-center w-3/4 mt-6 text-md font-bold text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-2 rounded-xl cursor-pointer`}>
                            {mode === 'register' ? 'Register' : 'Login'}
                        </button>
                    </div>

                </form>

            </div>

        </div>

    )
}
export default AuthPage