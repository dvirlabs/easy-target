import { toast } from 'react-toastify';
import { ToastType } from './types';

export const customToast = (text: string, type: ToastType) => {
    switch (type) {
        case ToastType.Success:
            toast.success(text);
            break;
        case ToastType.Error:
            toast.error(text);
            break;
        case ToastType.Info:
            toast.info(text);
            break;
    }
};
