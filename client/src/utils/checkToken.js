import decode from 'jwt-decode';

const checkToken = () => {
    const token = localStorage.token;
    
    if(token){
        const decodedToken = decode(token);

        //check the expiration of the token
        if(decodedToken.exp * 1000 < new Date().getTime()){
          localStorage.removeItem('token');
          return false;
        }
        //if the token is not yet expired the continue
        return true;
    }
}

export default checkToken;