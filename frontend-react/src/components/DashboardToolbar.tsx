interface DashboardToolbarProps {
    onAddClick: () => void;
    onSearchChange: () => void;
    onFilterChange: () => void;
}

const DashboardToolbar = ({onAddClick, onSearchChange, onFilterChange}: DashboardToolbarProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-center mb-6 gap-4 p-4">

            <button onClick={() => onAddClick()} className="font-extrabold tracking-wider text-center w-full md:w-1/2 text-xl text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-3 rounded-xl cursor-pointer">
                Click me to add new task!
            </button>

            <input onChange={() => {onSearchChange()}} placeholder={'Search for tasks...'} className={`border border-slate-200 rounded-lg p-2 w-full md:w-1/3 text-slate-500 focus:outline-none`}/>

            <select onChange={onFilterChange} defaultValue={""} className={`border border-slate-200 rounded-lg p-2 w-full md:w-1/3 text-slate-500 transition cursor-pointer focus:outline-none focus:ring-sky-300`}>

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
    )
}

export default DashboardToolbar;