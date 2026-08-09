import {useForm} from "react-hook-form";
import type {ProfileSchema} from "../schemas/profileSchema.ts";
import {profileEditSchema, profilePasswordSchema} from "../schemas/profileSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "./common/InputField.tsx";
import ModalFooter from "./common/ModalFooter.tsx";
import Modal from "./common/Modal.tsx";
import {axiosClient} from "../api/axiosClient.ts";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {isAxiosError} from "axios";

interface ProfileFormModalProps {
    mode: "EDIT" | "PASSWORD";
    username?: string;
    onCancel: () => void;
}

const modeConfig = {
    EDIT: {
        headerText: "Change user data",
        buttonText: "Change",
        usernamePlaceholder: '',
    },
    PASSWORD: {
        headerText: "Change Password",
        buttonText: "Change password",
        oldPasswordPlaceholderValue: '',
        newPasswordPlaceholderValue: '',
        newPasswordAgainPlaceholderValue: ''
    }
}

const ProfileFormModal = ({mode, username, onCancel}: ProfileFormModalProps) => {
    const {checkSession} = useContext(AuthContext);

    const config = modeConfig[mode];
    const currentSchema = mode === "EDIT" ? profileEditSchema : profilePasswordSchema;

    const {register, handleSubmit, setError, formState: {errors}} = useForm<ProfileSchema>({
        resolver: zodResolver(currentSchema) as any,
        mode: "onTouched",
        defaultValues: {
            username: username || ""
        }
    });

    const onSubmit = async (data:ProfileSchema) => {
        try {
            if (mode === "EDIT") {
                await axiosClient.put("/users/me", { username: data.username });
            } else {
                await axiosClient.put("/users/me/password", { oldPassword: data.oldPassword, newPassword: data.newPassword });
            }

            onCancel();
            await checkSession();
        } catch (error) {
            console.error(error);
            let errorMessage = "Unexpected error occurred.";

            if (isAxiosError(error) && error.response) {
                if (mode === 'EDIT' && error.response.status === 409) {
                    errorMessage = "User with this username already exists!";
                } else if (mode === 'PASSWORD' && error.response.status === 400) {
                    errorMessage = "Invalid old password!";
                }
            }

            setError("root", {
                type: "server",
                message: errorMessage
            });
        }
    }

    return (
        <Modal onCancel={onCancel}>
            <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()} className="flex flex-col w-full min-h-[calc(100vh-128px)]`">

                <h1 className={`text-center text-3xl font-bold text-slate-800`}>
                    {config.headerText}
                </h1>

                <div className={`flex flex-col gap-4 mt-4`}>

                    {mode === "EDIT" && (
                        <InputField id={'username'} label={'Username'} placeholder={'Enter username'} register={register('username')} error={errors.username?.message}/>
                    )}

                    {mode === "PASSWORD" && (
                        <>
                            <InputField type={'password'} id={'oldPassword'} label={'Old password'} placeholder={'Enter your old password...'} register={register('oldPassword')} error={errors.oldPassword?.message}/>
                            <InputField type={'password'} id={'newPassword'} label={'New password'} placeholder={'Enter new password...'} register={register('newPassword')} error={errors.newPassword?.message}/>
                            <InputField type={'password'} id={'confirmPassword'} label={'Confirm password'} placeholder={'Confirm new password...'} register={register('confirmPassword')} error={errors.confirmPassword?.message}/>
                        </>
                    )}

                </div>

                {errors.root && (
                    <div className="text-red-500 text-sm font-semibold mt-2">
                        {errors.root.message}
                    </div>
                )}

                <ModalFooter onCancel={onCancel} submitText={config.buttonText} />

            </form>

        </Modal>
    )
}

export default ProfileFormModal;