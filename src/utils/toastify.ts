import { toast } from 'react-toastify';

export const Toast = (info: string, id: string, durationMS: number) => {
  toast.info(`${info}`, {
    position: 'top-right',
    toastId: id,
    autoClose: durationMS,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
