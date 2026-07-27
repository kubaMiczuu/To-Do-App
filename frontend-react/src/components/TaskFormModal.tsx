import {useState} from "react";
import {taskSchema} from "../schemas/taskSchema.ts";
import type {TaskFormData} from "../schemas/taskSchema.ts";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Modal from "./common/Modal.tsx";
import InputField from "./common/InputField.tsx";
import TextAreaField from "./common/TextAreaField.tsx";

interface TaskFormModalProps {
    mode: "UPDATE" | "ADD";
    initialData?: TaskData | null;
    onCancel: () => void;
}

export interface TaskData {
    id?: number;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    title: string;
    description: string;
}

const modeConfig = {
    ADD: {
        headerText: "Create a new task",
        buttonText: "Create task",
        titlePlaceholder: '',
        descriptionPlaceholderValue: '',
    },
    UPDATE: {
        headerText: "Update this task",
        buttonText: "Update task",
        titlePlaceholderValue: '',
        descriptionPlaceholderValue: ''
    }
}

const TaskFormModal = ({mode, initialData, onCancel}:TaskFormModalProps) => {

    const config = modeConfig[mode];

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const {control, register, handleSubmit, setValue, formState: {errors}} = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        mode: "onTouched",
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            status: initialData?.status || "TODO"
        }
    });

    const currentStatus = useWatch({
        control,
        name: 'status'
    })

    const handleFormSubmit = () => {

    }

    return (
        <Modal onCancel={() => onCancel()}>

            <form onSubmit={handleSubmit(handleFormSubmit)} onClick={(e) => e.stopPropagation()} className="flex flex-col w-full min-h-[calc(100vh-128px)]x`">

                <h1 className={`text-center text-3xl font-bold text-slate-800`}>
                    {config.headerText}
                </h1>

                <div className={`flex flex-col gap-4 mt-4`}>

                    <InputField id={'title'} label={'Title'} placeholder={'Enter title'} register={register('title')} error={errors.title?.message}/>

                    <TextAreaField id={'description'} label={'Description'} placeholder={'Type something about this task...'} register={register('description')} error={errors.description?.message}/>

                    {mode === "UPDATE" && (
                        <div className={`flex gap-4 justify-center`}>

                            {currentStatus !== "TODO" && (
                                <button onClick={() => setValue("status", "TODO")} type={'button'}
                                        className={`w-full md:w-1/2 border-slate-200 shadow-slate-200/40 hover:border-slate-300 rounded-xl border-2 p-3 shadow-lg hover:scale-105 transition cursor-pointer`}
                                >
                                    Mark as <span className={`italic text-slate-400 font-bold tracking-wide`}>To Do</span>
                                </button>
                            )}

                            {currentStatus !== "IN_PROGRESS" && (
                                <button onClick={() => setValue("status", "IN_PROGRESS")} type={'button'}
                                        className={`w-full md:w-1/2 border-blue-200 shadow-blue-200/40 hover:border-blue-300 rounded-xl border-2 p-3 shadow-lg hover:scale-105 transition cursor-pointer`}
                                >
                                    Mark as <span className={`italic text-blue-400 font-bold tracking-wide`}>In Progress</span>
                                </button>
                            )}

                            {currentStatus !== "DONE" && (
                                <button onClick={() => setValue("status", "DONE")} type={'button'}
                                        className={`w-full md:w-1/2 border-green-200 shadow-green-200/40 hover:border-green-300 rounded-xl border-2 p-3 shadow-lg hover:scale-105 transition cursor-pointer`}
                                >
                                    Mark as <span className={`italic text-green-400 font-bold tracking-wide`}>Done</span>
                                </button>
                            )}

                        </div>
                    )}

                </div>

                <div className={`flex flex-col-reverse md:flex-row items-center gap-4  mt-4 md:mt-16 w-full ${mode === "UPDATE" ? "justify-between" : "justify-center"}`}>

                    {mode === "UPDATE" && (
                        <button className="text-xl w-full md:w-auto px-6 py-2 text-rose-600 font-bold bg-rose-50 hover:bg-rose-100 hover:scale-105 rounded-lg transition cursor-pointer"
                                onClick={() => setShowDeleteConfirm(true)} type={'button'}
                        >
                            Delete task
                        </button>
                    )}

                    <div className="flex flex-col-reverse md:flex-row items-center gap-4 w-full md:w-auto">

                        <button className="text-xl w-full md:w-auto px-6 py-2 text-slate-700 font-extrabold bg-slate-200 hover:bg-slate-300 hover:scale-105 rounded-lg transition cursor-pointer"
                                onClick={() => onCancel()} type={'button'}
                        >
                            Cancel
                        </button>

                        <button className="text-xl w-full md:w-auto px-8 py-2 text-white font-extrabold bg-sky-400 hover:bg-sky-500 hover:scale-105 rounded-lg transition cursor-pointer"
                                type="submit"
                        >
                            {config.buttonText}
                        </button>

                    </div>

                    {showDeleteConfirm && (
                        <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                            <h2 className="text-4xl font-bold text-slate-800 mb-2">Are you sure?</h2>
                            <p className="text-slate-500 mb-8 text-lg font-medium text-center">This action cannot be undone. Task will be permanently deleted.</p>

                            <div className="flex gap-4 w-full justify-center">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-6 py-3 text-slate-700 font-extrabold bg-slate-200 hover:bg-slate-300 hover:scale-105 rounded-lg transition cursor-pointer"
                                >
                                    No, keep it
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {}}
                                    className="px-8 py-3 text-white font-extrabold bg-rose-500 hover:bg-rose-600 hover:scale-105 rounded-lg transition cursor-pointer shadow-lg shadow-rose-500/30"
                                >
                                    Yes, delete task
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </form>

        </Modal>
    )
}
export default TaskFormModal