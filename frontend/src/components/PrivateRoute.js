import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    // Authorized so return child components
    return children;
}

export default PrivateRoute;