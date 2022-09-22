import axios from "axios";

const instance = axios.create({baseURL: "http://localhost:5000/"});

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