import type {ReactNode} from 'react';
import {Navigate} from 'react-router';
import {useSelector} from 'react-redux';
import type {RootState} from '../store/store.ts';

function RequireAuth({children}: { children: ReactNode }) {
    const jwt = useSelector((state: RootState) => state.user.jwt);
    if (!jwt) {
        return <Navigate to="/auth/login" replace/>;
    }
    return children;
}

export default RequireAuth;