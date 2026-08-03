interface ModalFooterProps {
    onCancel: () => void;
    submitText: string;
}

const ModalFooter = ({onCancel, submitText}: ModalFooterProps) => {
    return (
        <div className="flex flex-col-reverse md:flex-row items-center mt-8 gap-4 w-full md:w-auto">

            <button className="text-xl w-full md:w-auto px-6 py-2 text-slate-700 font-extrabold bg-slate-200 hover:bg-slate-300 hover:scale-105 rounded-lg transition cursor-pointer"
                    onClick={() => onCancel()} type={'button'}
            >
                Cancel
            </button>

            <button className="text-xl w-full md:w-auto px-8 py-2 text-white font-extrabold bg-sky-400 hover:bg-sky-500 hover:scale-105 rounded-lg transition cursor-pointer"
                    type="submit"
            >
                {submitText}
            </button>

        </div>
    )
}

export default ModalFooter;