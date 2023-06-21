// import { Toast } from 'primereact/toast';
// import React, { createContext, useRef } from 'react';

// export const ToastContext = createContext();

// export const ToastProvider = ({ children }) => {
//   const toast = useRef(null);

//   const showToast = (message) => {
//     toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
//   };

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       <Toast ref={toast} />
//       {children}
//     </ToastContext.Provider>
//   );
// };