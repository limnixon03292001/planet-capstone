export const checkOnline = (onlineUsers, id) => {
    return onlineUsers?.some((onlineUser) => onlineUser?.userId === id)
}