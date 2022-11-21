
export function closeModal(setIsOpen) {
    setIsOpen(false)
}

export function openModal(setIsOpen) {
    setIsOpen(true)
}

export const checkStatusPill = (status, styles) => {
    if(status === "Approved") {
        return (
            <span className={`text-green-700 bg-green-500/30 ${styles}`}>{status}</span>
        )
    } else if (status === "Rejected") {
        return (
            <span className={`text-red-700 bg-red-500/30 ${styles}`}>{status}</span>
        )
    } else if (status === "Pending") {
        return (
            <span className={`text-blue-700 bg-blue-500/30 ${styles}`}>{status}</span>
        )
    }  
};