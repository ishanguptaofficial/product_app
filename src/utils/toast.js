import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const id = null;

export const showLoadingToast = (message) => {
  id = toast.loading(message);
};

export const showSuccessToast = (message) => {
  if (id) {
    toast.update(id, {
      render: message,
      type: 'success',
      isLoading: false,
      autoClose: 1500,
    });
    id = null;
  } else {
    toast.success(message, {
      autoClose: 1500,
    });
  }
};

export const showErrorToast = (message) => {
  if (id) {
    toast.update(id, {
      render: message,
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    id = null;
  } else {
    toast.error(message, {
      autoClose: 1500,
    });
  }
};

export const showInfoToast = (message) => {
  if (id) {
    toast.update(id, {
      render: message,
      type: 'info',
      isLoading: false,
      autoClose: 1500,
    });
    id = null;
  } else {
    toast.info(message, {
      autoClose: 1500,
    });
  }
};

export const showWarnToast = (message) => {
  if (id) {
    toast.update(id, {
      render: message,
      type: 'warning',
      isLoading: false,
      autoClose: 1500,
    });
    id = null;
  } else {
    toast.warn(message, {
      autoClose: 1500,
    });
  }
};

export const handleAPIErrorToast = (error) => {
  if (error && error.response.status === 404) {
    return showErrorToast('Not Found');
  }
  if (error && error.response.status === 401) {
    return showErrorToast('Unauthorized');
  }
  if (error && error.response.status === 403) {
    return showErrorToast('Forbidden');
  }
  return showErrorToast(error?.response?.data?.message || error.message);
};
