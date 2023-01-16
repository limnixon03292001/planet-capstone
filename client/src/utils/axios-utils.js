import axios from "axios";

// https://planet-capstone-production.up.railway.app/
// http://localhost:5000/
const instance = axios.create({baseURL: "https://planet-capstone-production.up.railway.app/"});

export const request = ({...options}) => {
 
    const token = localStorage.getItem("token");
       
        if(token){
           instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
    //   const onSuccess = (response) => response;
    //   const onError = (error) => {
    //     const errorx = JSON.parse(error?.request?.response);
    //     toast.error(`Error: ${errorx.err}`);
    //   }
    
    return instance(options)
}

// .then(onSuccess).catch(onError)