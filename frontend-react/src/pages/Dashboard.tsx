import TaskCard from "../components/TaskCard.tsx"
import {useState} from "react"
import TaskFormModal, {type TaskData} from "../components/TaskFormModal.tsx";
import DashboardToolbar from "../components/DashboardToolbar.tsx";

const Dashboard = () => {

    const [modalMode, setModalMode] = useState<null | "ADD" | "UPDATE">(null);
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

    const tasks: TaskData[] = [
        {id: 1, title: "Task Title", description: "Task Description", status:"TODO"},
        {id: 2, title: "Task Title", description: "Task Description", status:"IN_PROGRESS"},
        {id: 3, title: "Task Title", description: "Task Description", status:"DONE"},
        {id: 4, title: "Task Title", description: "Task Description", status:"TODO"},
        {id: 5, title: "Task Title", description: "Task Description", status:"IN_PROGRESS"},
        {id: 6, title: "Task Title", description: "Task Description", status:"DONE"},
    ]

    const handleUpdateClick = (task: TaskData) => {
        setSelectedTask(task);
        setModalMode("UPDATE");
    }

    const handleAddClick = () => {
        setSelectedTask(null);
        setModalMode("ADD");
    }

    const handleCancelClick = () => {
        setSelectedTask(null);
        setModalMode(null);
    }

    const handleSearchChange = () => {

    }

    const handleFilterChange = () => {

    }

    return (
        <div className="flex justify-between px-4 cursor-default">

            <div className="flex flex-col w-full max-w-5xl min-h-[calc(100vh-128px)] bg-white border border-slate-100 shadow-sm shadow-slate-200/40 rounded-2xl p-6">

                <DashboardToolbar onAddClick={handleAddClick} onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

                <ul className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    {tasks.map((task: TaskData) => (
                        <li key={task.id} onClick={() => handleUpdateClick(task)}>
                            <TaskCard task={task}/>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center text-slate-400">
                    Future pagination
                </div>

            </div>

            {modalMode !== null && (
                <TaskFormModal mode={modalMode} initialData={selectedTask} onCancel={() => handleCancelClick()} />
            )}

        </div>
    )
}

export default Dashboard;