import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
    const { user, authLoading } = useAuth();

    if (authLoading) { return <Loading />}
    
    if (!user) {
        return <Navigate to="/intro" replace />;
    }

    return children;
}