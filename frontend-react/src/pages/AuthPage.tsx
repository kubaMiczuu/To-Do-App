import {registerSchema, loginSchema} from "../schemas/authSchema.ts";
import type {AuthFormData} from "../schemas/authSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import InputField from "../components/common/InputField.tsx";

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
                    
                    <InputField id={'username'} label={'Username'} placeholder={'Enter username...'} register={register('username')} error={errors.username?.message}/>

                    <InputField id={'password'} label={'Password'} placeholder={'Enter password...'} type={'password'} register={register('password')} error={errors.password?.message}/>

                    <div className={`flex flex-col items-center`}>
                        <button type="submit" className={`text-center w-3/4 mt-6 text-md font-bold text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-2 rounded-xl cursor-pointer`}>
                            {mode === 'register' ? 'Register' : 'Login'}
                        </button>
                    </div>

                    <p className={`text-slate-500 text-sm text-center mt-4`}>
                        {mode === 'login'
                            ? (
                                <>
                                You do not have any account yet?{' '}
                                <span onClick={() => navigate("/register")} className={`text-slate-700 underline cursor-pointer hover:scale-105 hover:text-slate-800 transition`}>Create one now!</span>
                                </>
                            )
                            : (
                                <>
                                Already have an account?{' '}
                                <span onClick={() => navigate("/login")} className={`text-slate-700 underline cursor-pointer hover:scale-105 hover:text-slate-800 transition`}>Log in here!</span>
                            </>
                            )
                        }
                    </p>

                </form>

            </div>

        </div>

    )
}
export default AuthPage