import TaskCard from "../components/TaskCard.tsx";

const Dashboard = () => {
    return (
        <div className="flex justify-between px-4 cursor-default">

            <div className="flex flex-col w-full max-w-5xl min-h-[calc(100vh-128px)] bg-white border border-slate-100 shadow-sm shadow-slate-200/40 rounded-2xl p-6">

                <div className="flex flex-col md:flex-row justify-center mb-6 gap-4 p-4">

                    <button onClick={() => {}} className="font-extrabold tracking-wider text-center w-full md:w-1/2 text-xl text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-3 rounded-xl cursor-pointer">
                        Click me to add new task!
                    </button>

                    <input onChange={() => {}} placeholder={'Search for tasks...'} className={`border border-slate-200 rounded-lg p-2 w-full md:w-1/3 text-slate-500 focus:outline-none`}/>

                    <select defaultValue={""} className={`border border-slate-200 rounded-lg p-2 w-full md:w-1/3 text-slate-500 transition cursor-pointer focus:outline-none focus:ring-sky-300`}>

                        <option value="">
                            All
                        </option>

                        <option value={'TODO'}>
                            status: TODO
                        </option>

                        <option value={'IN_PROGRESS'}>
                            status: IN PROGRESS
                        </option>

                        <option value={'DONE'}>
                            status: DONE
                        </option>
                    </select>

                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    <TaskCard status="TODO" title="Task Title" description="Task Description" />
                    <TaskCard status="IN_PROGRESS" title="Task Title" description="Task Description" />
                    <TaskCard status="TODO" title="Task Title" description="Task Description"/>
                    <TaskCard status="TODO" title="Task Title" description="Task Description" />
                    <TaskCard status="DONE" title="Task Title" description="Task Description" />
                    <TaskCard status="IN_PROGRESS" title="Task Title" description="Task Description" />
                </div>

                <div className="mt-4 border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center text-slate-400">
                    Future pagination
                </div>

            </div>

        </div>
    )
}

export default Dashboard;