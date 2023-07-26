import { toast } from 'react-toastify';

export const Toast = (info: string, id: string) => {
  toast.info(`${info}`, {
    position: 'top-right',
    toastId: id,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
