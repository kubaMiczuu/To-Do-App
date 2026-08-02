interface taskStatusChangeButtonProps {
    onValueChange: (text: "status", status: "TODO" | "IN_PROGRESS" | "DONE") => void;
    status: "TODO" | "IN_PROGRESS" | "DONE";
}

const colorConfig = {
    TODO: {
        text: "To do",
        button: "border-slate-200 shadow-slate-200/40 hover:border-slate-300",
        span: "text-slate-400"
    },
    IN_PROGRESS: {
        text: "In Progress",
        button: "border-blue-200 shadow-blue-200/40 hover:border-blue-300",
        span: "text-blue-400"
    },
    DONE: {
        text: "Done",
        button: "border-green-200 shadow-green-200/40 hover:border-green-300",
        span: "text-green-400"
    }
}

const TaskStatusChangeButton = ({onValueChange, status}: taskStatusChangeButtonProps) => {

    const config = colorConfig[status];

    return (
        <button onClick={() => onValueChange("status", status)} type={'button'}
                className={`w-full md:w-1/2 ${config.button} rounded-xl border-2 p-3 shadow-lg hover:scale-105 transition cursor-pointer`}
        >
            Mark as <span className={`italic ${config.span} font-bold tracking-wide`}> {config.text} </span>
        </button>
    )
}

export default TaskStatusChangeButton;