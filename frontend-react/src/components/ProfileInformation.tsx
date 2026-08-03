interface ProfileInformationProps {
    username: string;
}

const ProfileInformation = ({username}: ProfileInformationProps) => {
    return (
        <div className="flex flex-col w-full min-h-1/3 gap-4 justify-center items-center">

            <div className={`flex w-40 h-40 rounded-full border border-sky-200 bg-sky-100 justify-center items-center`}>
                <h1 className={`text-slate-800 text-5xl tracking-widest text-center font-bold`}>{username.substring(0, 3).toUpperCase()}</h1>
            </div>

            <h2 className={`text-slate-800 text-xl tracking-wider`}>{username}</h2>

        </div>
    )
}

export default ProfileInformation;