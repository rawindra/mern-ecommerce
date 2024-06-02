import {
    Navigate,
    Outlet,
    useLocation,
} from 'react-router-dom';
import useAuthStore from './store/useAuthStore';

function ProtectedRoute({
    redirectPath = '/login',
    children,
}: any) {
    const { token } = useAuthStore();
    const location = useLocation();

    if (!token) {
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }

    return children || <Outlet />;
}

export default ProtectedRoute;