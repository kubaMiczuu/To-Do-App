import type {ReactNode} from "react";
interface modalProps {
    onCancel: () => void;
    children: ReactNode;
}

const Modal = ({onCancel, children}: modalProps) => {
    return(
        <div onClick={() => onCancel()} className={`fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center`}>

            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl bg-white border border-slate-100 shadow-sm shadow-slate-200/40 rounded-2xl p-6 relative overflow-hidden">

                {children}

            </div>

        </div>
    )
}

export default Modal