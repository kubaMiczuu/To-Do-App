interface profileStatCardProps  {
    status: "OVERALL" | "TODO" | "IN_PROGRESS" | "DONE";
    value: number;
}

const cardConfig = {
    OVERALL: {
        border: "border-slate-300 shadow-black-300/40 hover:border-black-400",
        text: "text-black-400",
        label: "OVERALL",
        value: "text-black-500",
    },
    TODO: {
        border: "border-slate-200 shadow-slate-200/40 hover:border-slate-300",
        text: "text-slate-400",
        label: "TO DO",
        value: "text-slate-500"
    },
    IN_PROGRESS: {
        border: "border-blue-200 shadow-blue-200/40 hover:border-blue-300",
        text: "text-blue-400",
        label: "IN PROGRESS",
        value: "text-blue-500"
    },
    DONE: {
        border: "border-green-200 shadow-green-200/40 hover:border-green-300",
        text: "text-green-400",
        label: "DONE",
        value: "text-green-500"
    }
};

const ProfileStatCard = ({status, value}: profileStatCardProps) => {
    const config = cardConfig[status];

    return (
        <div className={`flex flex-col w-full border justify-center items-center rounded-3xl min-h-1/2 md:min-h-1/4 gap-2 md:gap-6 p-12 px-0 md:py-4 ${config.border}`}>
            <h3 className={`text-xl tracking-wide font-bold ${config.text}`}>{config.label}</h3>
            <h4 className={`text-5xl tracking-wide font-bold ${config.value}`}>{value}</h4>
        </div>
    )
}

export default ProfileStatCard