import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    console.log(user);
    
    if (!user) {
        return <Navigate to="/intro" replace />;
    }

    return children;
}