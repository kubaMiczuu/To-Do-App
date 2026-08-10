import TaskCard from "../components/TaskCard.tsx"
import {useEffect, useState} from "react"
import TaskFormModal, {type TaskData} from "../components/TaskFormModal.tsx";
import DashboardToolbar from "../components/DashboardToolbar.tsx";
import {axiosClient} from "../api/axiosClient.ts";
import Pagination from "../components/Pagination.tsx";

const Dashboard = () => {

    const [modalMode, setModalMode] = useState<null | "ADD" | "UPDATE">(null);
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const [tasks, setTasks] = useState<TaskData[]>([]);

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

    useEffect(() => {
        axiosClient.get("/tasks", {
            params: {
                page: currentPage,
                size: 6
            }
        })
            .then((response) => {
                setTasks(response.data.content);
                setTotalPages(response.data.totalPages);
            })
    }, [currentPage, refreshTrigger]);

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

                <div className="mt-4 p-4 flex items-center justify-center text-slate-400">
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </div>

            </div>

            {modalMode !== null && (
                <TaskFormModal mode={modalMode} initialData={selectedTask} onCancel={() => handleCancelClick()} onSuccess={() => setRefreshTrigger(prev => prev+1)} />
            )}

        </div>
    )
}

export default Dashboard;