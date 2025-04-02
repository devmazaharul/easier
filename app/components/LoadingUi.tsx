"use client"
import { ScaleLoader } from "react-spinners";


const LoadingUi = () => {
  return (
    <div>
      <ScaleLoader  color="#ffffff" loading height={7} width={3}  />  
    </div>
  );
}

export default LoadingUi;

