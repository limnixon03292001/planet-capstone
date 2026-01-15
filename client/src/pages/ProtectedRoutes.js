import { toast } from 'react-hot-toast';
import { Outlet, Navigate } from 'react-router-dom';
import checkToken from '../utils/checkToken';
import NotFound from './NotFound';

const ProtectedRoutes = ({ path, allowedRole }) => {
 
    return (
      <>
        {!checkToken()?
          <>
            <Navigate to={path} /> 
            {toast.error(`Error: Unauthorized!`)}
          </>
        :
          allowedRole.some((p) => p === localStorage.getItem('pstRle')) ?
            <Outlet /> 
          :
            <NotFound/>
        }
      </>
    )
  }

export default ProtectedRoutes