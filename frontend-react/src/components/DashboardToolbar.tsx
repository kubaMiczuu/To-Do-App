interface DashboardToolbarProps {
    currentQuery: string;
    currentFilter: "ALL" | "TODO" | "IN_PROGRESS" | "DONE";
    onAddClick: () => void;
    onSearchChange: (newQuery:string) => void;
    onFilterChange: (newStatus:"ALL" | "TODO" | "IN_PROGRESS" | "DONE") => void;
}

const DashboardToolbar = ({currentQuery, currentFilter, onAddClick, onSearchChange, onFilterChange}: DashboardToolbarProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-center mb-6 gap-4 p-4">

            <button onClick={() => onAddClick()} className="font-extrabold tracking-wider text-center w-full md:w-1/2 text-xl text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-3 rounded-xl cursor-pointer">
                Click me to add new task!
            </button>

            <input value={currentQuery} onChange={(e) => {onSearchChange(e.target.value)}} placeholder={'Search for tasks...'} className={`border border-slate-200 rounded-lg p-2 w-full md:w-1/3 text-slate-500 focus:outline-none`}/>

            <select value={currentFilter} onChange={(e) => onFilterChange(e.target.value as "ALL" | "TODO" | "IN_PROGRESS" | "DONE")} className={`border border-slate-200 rounded-lg p-2 w-full md:w-1/3 text-slate-500 transition cursor-pointer focus:outline-none focus:ring-sky-300`}>

                <option value="ALL">
                    All
                </option>

                <option value={'TODO'}>
                    TODO
                </option>

                <option value={'IN_PROGRESS'}>
                    IN PROGRESS
                </option>

                <option value={'DONE'}>
                    DONE
                </option>
            </select>

        </div>
    )
}

export default DashboardToolbar;