import { useEffect } from "react";
export default function Message({ message, type, clearMessage}) {
    useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage(); 
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);
    if (!message) return null;
    const baseStyle = "p-3 rounded-md my-2 text-sm  border font-medium transition-all w-full text-center";
    const typeStyles = {
        success: "bg-green-100 text-green-700 border-green-400",
        error: "bg-red-100 text-red-700 border-red-400",
        info: "bg-blue-100 text-blue-700 border-blue-400",
    }
  return (
    <div className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}>
      {message}
    </div>
  );
}