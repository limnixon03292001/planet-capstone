import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;

  // return (
  //   visible && <button onClick={scrollToTop} className={` fixed bottom-3 left-0 z-50 transition-opacity p-3 rounded-full bg-white border border-red-500`}><FaArrowCircleUp/></button> 
  // )
}

export default ScrollTop