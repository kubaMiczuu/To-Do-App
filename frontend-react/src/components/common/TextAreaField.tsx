import type {UseFormRegisterReturn} from "react-hook-form";

interface TextAreaFieldProps {
    id: string
    label: string
    placeholder: string
    register: UseFormRegisterReturn
    error?: string
}

const TextAreaField = ({id, label, placeholder, register, error}: TextAreaFieldProps) => {
    return (
        <div className={`flex flex-col gap-1`}>

            <label htmlFor={id} className={`text-md text-slate-700 font-bold`}>
                {label}
            </label>

            <textarea id={id} placeholder={placeholder} {...register}
                   className="min-h-[20vw] w-full text-lg md:text-xl font-semibold text-slate-800 px-4 py-3 md:px-5 md:py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition duration-200"
            />

            {error && (
                <p className={`text-xs font-medium text-rose-500 pl-1`}>{error}</p>
            )}

        </div>
    )
}

export default TextAreaField;