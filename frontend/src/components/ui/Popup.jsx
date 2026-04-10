const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-scaleIn">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white text-xl hover:bg-red-600 transition" >
          &times;</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;