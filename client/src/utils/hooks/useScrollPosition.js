import { useEffect, useState } from "react";

// custom hook
const useScrollPosition = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setOffset(window.scrollY);
        }

        window.addEventListener('scroll', updatePosition)
        // updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);
    },[]);

    return offset;
};

export default useScrollPosition