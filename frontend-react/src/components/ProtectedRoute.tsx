import {type ReactNode, useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }: { children:ReactNode }) => {
    const {isAuthenticated, isLoading} = useContext(AuthContext);

    if(isLoading) return <div>Loading data... </div>

    if(!isAuthenticated) return <Navigate to="/login" replace/>;

    return children;
}
export default ProtectedRoute