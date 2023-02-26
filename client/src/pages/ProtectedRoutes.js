import { Outlet, Navigate } from 'react-router-dom';
import checkToken from '../utils/checkToken';
import NotFound from './NotFound';

const ProtectedRoutes = ({ path, allowedRole }) => {
 
    return (
      <>
        { !checkToken()?
           <Navigate to={path} /> 
        :
          localStorage.getItem('pstRle') === allowedRole ?
            <Outlet /> 
          :
            <NotFound/>
        }
      </>
    )
  }

export default ProtectedRoutes