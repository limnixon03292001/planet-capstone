import { request } from '../utils/axios-utils';
import axios from 'axios';

//recovery
export const sendRecoveryLink = (data) => {
    return axios.post(`/api/users/account-recovery`, data);
}
export const checkLinkExpiration = ({ queryKey }) => {
    const token = queryKey[0];
    return axios.get(`/api/users/reset-expiration/?token=${token}`);
}

export const resetPassword = (data) => {
    return axios.post(`/api/users/reset-password`, data);
}
//recovery

//authentication
export const confirmation = ({ queryKey }) => {
    const token = queryKey[0];
    return axios.get(`/api/users/confirmation/?token=${token}`);
}

export const registerUser = (data) => {
    return axios.post('/api/users/register', data);
}

export const verifyEmail = (data) => {
    return axios.post('/api/users/verify-email', data);
}

export const loginUser = (data) => {
    return axios.post('/api/users/login', data);
}
//authentication

export const getAuthUser = () => {
    return request({url: '/api/users/auth-user', method: 'GET'});
}

export const addUserPost = (data) => {
    return request({url: '/api/users/post', method: 'POST', data});
}

export const getUserProfile = ({queryKey}) => {
    const userId = queryKey[1]
    return request({url: `/api/users/user?userId=${userId}`, method: 'GET'});
}

export const searchUser = ({queryKey}) => {
    const searchText = queryKey[1]
    return request({url: `/api/users/search?searchText=${searchText}`, method: 'GET'});
}

export const getIsFollowingUser = ({queryKey}) => {
    const userId = queryKey[1]
    return request({url: `/api/users/isfollowing-user?userId=${userId}`, method: 'GET'});
}

export const getFollower = () => {
    return request({url: `/api/users/get-followers`, method: 'GET'});
}

export const followUser = (data) => {
    return request({url: `/api/users/follow-user`, method: 'POST', data: { userId: data }});
}

export const unfollowUser = (data) => {
    return request({url: `/api/users/unfollow-user`, method: 'POST', data: { userId: data }});
}

export const getUserPost = ({pageParam = 1 }) => {
    return request({url: `/api/users/post?page=${pageParam}`, method: 'GET'});
}

export const getSpecificUserPost = ({pageParam = 1, user_id}) => {
    return request({url: `/api/users/post-user?page=${pageParam}&user_id=${user_id}`, method: 'GET'});
}

export const updateUserPost = (data) => {
    return request({url: '/api/users/post', method: 'PUT', data: data});
}

export const deleteUserPost = (data) => {
    return request({url: '/api/users/post', method: 'DELETE', data: data});
}

export const getCommentPost = ({queryKey}) => {
    const post_id = queryKey[1]
    return request({url: `/api/users/getcomment?post_id=${post_id}`, method:'GET'});
}

export const addCommentPost = (data) => {
    return request({url: '/api/users/addcomment', method: 'POST', data: data});
}

export const deleteCommentPost = (comment_id) => {
    return request({url: '/api/users/deletecomment', method: 'DELETE', data: comment_id});
}


//chats

export const getSelectedRoom = ({ queryKey }) => {
    const id = queryKey[1];
    return request({url: `/api/chats/getchatroom?chatroom_id=${id}`, method: 'GET'});
}

export const getMessagesRoom = ({ queryKey }) => {
    const id = queryKey[1];
    return request({url: `/api/chats/all-messages?chatroom_id=${id}`, method: 'GET'});
}

export const getAllChats = () => {
    return request({url: '/api/chats/all-chats', method: 'GET'});
}

export const sendMessage = (data) => {
    return request({url: '/api/chats/send-message', method: 'POST', data: data});
}

export const createRoom = (data) => {
    return request({url: '/api/chats/create-room', method: 'POST', data :data});
}

export const deleteConvo = (data) => {
    return request({url: '/api/chats/delete-convo', method: 'DELETE', data: data});
}


//map data api's

export const getPlants = () => {
    return request({url: '/api/map/getPlants', method: 'GET'});
}

export const addPlant = (data) => {
    return request({url: '/api/map/addPlant', method: 'POST', data: data});
}


//plant collection

export const addPlantCollection = (data) => {
    return request({url: '/api/users/addPlantCollection', method: 'POST', data: data});
}

export const getPlantCollection = ({ queryKey }) => {
    const id = queryKey[1]    
    return request({url: `/api/users/getPlantCollections?userId=${id}`, method: 'GET'});
}

export const filterPlantCollections = ({ queryKey }) => {
    const id = queryKey[1];
    const gp = queryKey[2];
    const category = queryKey[3];
    const searchData = queryKey[4];
    return request({url: `/api/users/filterPlantCollections?&userId=${id}&category=${category}&search=${searchData}&sunPref=${gp?.sunPref}&interLight=${gp?.interLight}&soilPref=${gp?.soilPref}&waterReq=${gp?.waterReq}&nativeHab=${gp?.nativeHab}`, method: 'GET'});
}

//marketplace

export const addPlantMarketplace = (data) => {
    return request({url: '/api/marketplace/addPlant', method: 'POST', data: data});
}

export const updatePlantMarketplace = (data) => {
    return request({url: '/api/marketplace/updatePlant', method: 'POST', data: data});
}

export const deletePlantMarketplace = (data) => {
    return request({url: '/api/marketplace/deletePlant', method: 'DELETE', data: data});
}

export const addPlantMarketplaceFromCollection = (data) => {
    return request({url: '/api/marketplace/addPlantFromCollection', method: 'POST', data: data});
}

export const getPlantsMarketplace = () => {  
    return request({url: `/api/marketplace/getPlants`, method: 'GET'});
}

export const getSellingUserPlants = () => {  
    return request({url: `/api/marketplace/getSellingUserPlants`, method: 'GET'});
}

export const getPlantMarketplace = ({ queryKey }) => { 
    const id = queryKey[1]; 
    return request({url: `/api/marketplace/getPlant?id=${id}`, method: 'GET'});
}

export const getRelatedPlants = ({ queryKey }) => { 
    const category = queryKey[1]; 
    const plantId = queryKey[2]; 
    return request({url: `/api/marketplace/getRelatedPlants?category=${category}&plantId=${plantId}`, method: 'GET'});
}

export const getPlantsUser = ({ queryKey }) => { 
    const id = queryKey[1]; 
    return request({url: `/api/marketplace/getPlantsUser?userId=${id}`, method: 'GET'});
}

export const getfilterPlantMarketplace = ({ queryKey }) => {
    const category = queryKey[1];
    const search = queryKey[2];
    return request({url: `/api/marketplace/filterPlantMarketplace?&category=${category}&search=${search}`, method: 'GET'});
}

//admin 

export const getUserAccountList = () => {
    return request({url: `/api/admin/getUserAccountList`, method: 'GET'})
}

export const getAdminAccountList = () => {
    return request({url: `/api/admin/getAdminAccountList`, method: 'GET'})
}

export const getCounts = () => {
    return request({url: `/api/admin/getCounts`, method: 'GET'})
}

export const blockAccount = (data) => {
    return request({url: '/api/admin/blockAccount', method: 'POST', data: data});
}

export const unblockAccount = (data) => {
    return request({url: '/api/admin/unblockAccount', method: 'POST', data: data});
}

export const updateAccount = (data) => {
    return request({url: '/api/admin/updateAccount', method: 'POST', data: data});
}

export const getMarketplaceData = () => {
    return request({url: `/api/admin/getMarketplaceData`, method: 'GET'});
}

export const removeItemMp = (data) => {
    return request({url: `/api/admin/removeItemMp`, method: 'DELETE', data: data});
}

// plant trade 

// export const tradeRequest = (data) => {
//     return request({url: '/api/marketplace/requestTrade', method: 'POST', data: data});
// }

// export const getRequest = () => {
//     return request({url: '/api/marketplace/getUserRequestTrade', method: 'GET' }); //users request
// }

// export const getIncomingRequest = (data) => {
//     return request({url: '/api/marketplace/getIncomingRequests', method: 'GET' }); //list of requests
// }

// export const getTradeDetails = ({ queryKey }) => {
//     const id = queryKey[1];
//     return request({url: `/api/marketplace/getTradeDetails?tradeId=${id}`, method: 'GET'});
// }

// export const approveTrade = (data) => {
//     return request({url: `/api/marketplace/approveTrade`, method: 'POST', data: data});
// }

// export const rejectTrade = (data) => {
//     return request({url: `/api/marketplace/rejectTrade`, method: 'POST', data: data});
// }