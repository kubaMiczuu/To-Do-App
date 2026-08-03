interface deleteConfirmOverlayProps {
    onCancel: (confirm: boolean) => void;
    onConfirm: () => void;
    toDelete: string;
}

const DeleteConfirmOverlay = ({onCancel, onConfirm, toDelete}: deleteConfirmOverlayProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 w-full">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">Are you sure?</h2>
            <p className="text-slate-500 mb-8 text-lg font-medium text-center">This action cannot be undone, {toDelete} will be permanently deleted.</p>

            <div className="flex gap-4 w-full justify-center">
                <button
                    type="button"
                    onClick={() => onCancel(false)}
                    className="px-6 py-3 text-slate-700 font-extrabold bg-slate-200 hover:bg-slate-300 hover:scale-105 rounded-lg transition cursor-pointer"
                >
                    No, keep it
                </button>

                <button
                    type="button"
                    onClick={() => {onConfirm()}}
                    className="px-8 py-3 text-white font-extrabold bg-rose-500 hover:bg-rose-600 hover:scale-105 rounded-lg transition cursor-pointer shadow-lg shadow-rose-500/30"
                >
                    Yes, delete {toDelete}
                </button>
            </div>
        </div>
    )
}

export default DeleteConfirmOverlay