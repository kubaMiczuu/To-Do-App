import {useForm} from "react-hook-form";
import type {ChangePasswordSchema} from "../schemas/changePasswordSchema.ts";
import {profileSchema} from "../schemas/changePasswordSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "./common/InputField.tsx";
import ModalFooter from "./common/ModalFooter.tsx";
import Modal from "./common/Modal.tsx";

interface ProfileFormModalProps {
    mode: "EDIT" | "PASSWORD";
    initialData?: UserData | null;
    onCancel: () => void;
}

export interface UserData {
    id?: number;
    username: string;
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

const ProfileFormModal = ({mode, initialData, onCancel}: ProfileFormModalProps) => {
    const config = modeConfig[mode];

    const {register, handleSubmit, formState: {errors}} = useForm<ChangePasswordSchema>({
        resolver: zodResolver(profileSchema),
        mode: "onTouched",
        defaultValues: {
            username: initialData?.username || ""
        }
    });

    const handleFormSubmit = () => {

    }

    return (
        <Modal onCancel={onCancel}>
            <form onSubmit={handleSubmit(handleFormSubmit)} onClick={(e) => e.stopPropagation()} className="flex flex-col w-full min-h-[calc(100vh-128px)]`">

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

                <ModalFooter onCancel={onCancel} submitText={config.buttonText} />

            </form>

        </Modal>
    )
}

export default ProfileFormModal;