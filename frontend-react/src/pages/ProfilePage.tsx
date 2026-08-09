import ProfileInformation from "../components/ProfileInformation.tsx";
import ProfileStatCard from "../components/ProfileStatCard.tsx";
import {useContext, useEffect, useState} from "react";
import ProfileFormModal from "../components/ProfileFormModal.tsx";
import DeleteConfirmOverlay from "../components/common/DeleteConfirmOverlay.tsx";
import Modal from "../components/common/Modal.tsx";
import {axiosClient} from "../api/axiosClient.ts";
import {AuthContext} from "../context/AuthContext.tsx";

const ProfilePage = () => {

    const [modalMode, setModalMode] = useState<null | "EDIT" | "PASSWORD">(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [username, setUsername] = useState<string>("");

    const {checkSession} = useContext(AuthContext)

    const handleDeleteProfile = async () => {
        await axiosClient.delete("/users/me").then(() => {
            setShowDeleteConfirm(false);
        })

        await checkSession();
    }

    useEffect(() => {
        axiosClient.get("/users/me")
        .then(response =>{
            setUsername(response.data.username)
        } );
    }, [])

    return (

        <div className="flex justify-center px-4 cursor-default">

            <div className="flex flex-col w-full max-w-4xl min-h-[calc(100vh-128px)] bg-white border border-slate-100 shadow-sm shadow-slate-200/40 rounded-2xl p-6 gap-4">

                <ProfileInformation username={username} />

                <div className={`h-2/7 grid grid-cols-2 md:grid-cols-4 gap-6 p-4`}>

                    <ProfileStatCard status={"OVERALL"} value={21} />

                    <ProfileStatCard status={"TODO"} value={15} />

                    <ProfileStatCard status={"IN_PROGRESS"} value={4} />

                    <ProfileStatCard status={"DONE"} value={2} />

                </div>

                <div className={`h-1/7 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-16`}>

                    <button onClick={() => setModalMode("EDIT")} className="font-extrabold tracking-wider text-center w-full text-xl text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-3 rounded-xl cursor-pointer">
                        Edit profile
                    </button>

                    <button onClick={() => setModalMode("PASSWORD")} className="font-extrabold tracking-wider text-center w-full text-xl text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-3 rounded-xl cursor-pointer">
                        Change password
                    </button>

                    <button className="text-xl w-full md:w-auto px-6 py-2 text-rose-600 font-bold bg-rose-50 hover:bg-rose-100 hover:scale-105 rounded-lg transition cursor-pointer"
                            onClick={() => setShowDeleteConfirm(true)} type={'button'}
                    >
                        Delete profile
                    </button>


                </div>

            </div>

            {modalMode !== null && (
                <ProfileFormModal mode={modalMode} username={username} onCancel={() => setModalMode(null)} />
            )}

            {showDeleteConfirm && (
                <Modal onCancel={() => setShowDeleteConfirm(false)}>
                    <DeleteConfirmOverlay onCancel={() => setShowDeleteConfirm(false)} onConfirm={handleDeleteProfile} toDelete={"profile"}/>
                </Modal>
            )}

        </div>
    )
}

export default ProfilePage