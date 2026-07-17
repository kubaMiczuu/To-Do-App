interface TaskCardProps {
    status: "TODO" | "IN_PROGRESS" | "DONE";
    title: string;
    description: string;
}

const statusConfig = {
    TODO: {
        border: "border-slate-200 shadow-slate-200/40 hover:border-slate-300",
        text: "text-slate-400",
        label: "TODO"
    },
    IN_PROGRESS: {
        border: "border-blue-200 shadow-blue-200/40 hover:border-blue-300",
        text: "text-blue-400",
        label: "IN PROGRESS"
    },
    DONE: {
        border: "border-green-200 shadow-green-200/40 hover:border-green-300",
        text: "text-green-400",
        label: "DONE"
    }
};

const TaskCard = ({status, title, description}:TaskCardProps) => {

    const config = statusConfig[status];

    return (
        <div onClick={() => {}}
            className={`h-full rounded-xl border-2 p-3 shadow-lg hover:scale-105 transition cursor-pointer ${config.border}`}>

            <h2 className={`text-md font-bold tracking-wide ${config.text}`}>
                {config.label}
            </h2>

            <h1 className={`text-xl text-center mt-2`}>
                {title}
            </h1>

            <p className={`mt-4 line-clamp-4`}>
                {description} A long description on whatever this task does with solid explanation and long long things to read just to fill the whole card place just to test
            </p>

        </div>
    )
}
export default TaskCard