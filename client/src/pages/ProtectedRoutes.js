import { Outlet, Navigate } from 'react-router-dom';
import checkToken from '../utils/checkToken';

const ProtectedRoutes = ({ path }) => {

    return (
      <>
        { !checkToken() ? <Navigate to={path} replace={true}/> : <Outlet /> }
      </>
    )
  }

export default ProtectedRoutes