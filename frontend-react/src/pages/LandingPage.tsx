import {useNavigate} from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate()

    return (
        <div className={`flex min-h-[75vh] items-center justify-center text-center cursor-default`}>

            <div className={`w-full p-8 bg-white border border-slate-100 shadow-sm shadow-slate-200/40 rounded-2xl px-12 py-16`}>

                <h1 className={`text-5xl font-extrabold text-slate-800 mb-6 text-center`}>What do you have to do? Let's find it out!</h1>

                <h2 className={`text-lg max-w-2xl mx-auto font-bold text-slate-500 text-center`}>An application that will help you focus on what is truly important!</h2>

                <button onClick={() => navigate("/register")} className={`font-extrabold tracking-wider text-center w-1/2 text-2xl text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 transition px-4 py-2 rounded-xl cursor-pointer mt-10 mb-16`}>
                    Try it out now!
                </button>

                <h2 className={`font-bold text-3xl text-slate-800 mb-4`}>Why should you use such a to-do app?</h2>
                <h3 className={`font-medium text-xl text-slate-600 mb-12`}>Let me explain the 3-S!</h3>

                <div className={`grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-8 justify-items-center items-center`}>

                    <div className={`border border-slate-100 rounded-lg p-6 shadow-sm shadow-slate-200/70 hover:border-sky-300 duration-300 transition`}>
                        <h3 className={`font-medium text-2xl text-slate-800 italic`}>Speed</h3>
                        <h4 className={` text-lg text-slate-500`}>Create and manage your tasks within a blink of an eye!</h4>
                    </div>

                    <div className={`border border-slate-100 rounded-lg p-6 shadow-sm shadow-slate-200/70 hover:border-sky-300 duration-300 transition`}>
                        <h3 className={`font-medium text-2xl text-slate-800 italic`}>Simplicity</h3>
                        <h4 className={`text-lg text-slate-500`}>Clear interface designed for maximize your productivity!</h4>
                    </div>

                    <div className={`border border-slate-100 rounded-lg p-6 shadow-sm shadow-slate-200/70 hover:border-sky-300 duration-300 transition`}>
                        <h3 className={`font-medium text-2xl text-slate-800 italic`}>Security</h3>
                        <h4 className={`text-lg text-slate-500`}>Your tasks are secure and available only to you!</h4>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default LandingPage