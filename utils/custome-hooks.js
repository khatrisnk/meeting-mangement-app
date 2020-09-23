import { useContext, useState, useRef } from "react";
import { AuthContext } from "../contexts/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const useFormFields = (initialValues) => {
  const [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key) => (e) => {
    const value = e.target.value;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };
  const updateFormFields = (value) => {
    setFormFields({
      ...formFields,
      ...value
    })
  }
  return { formFields, createChangeHandler, updateFormFields };
};

export const cancellablePromise = promise => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      error => reject({ isCanceled, error }),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

export const noop = () => {};

export const delay = n => new Promise(resolve => setTimeout(resolve, n));

export const useCancellablePromises = () => {
  const pendingPromises = useRef([]);

  const appendPendingPromise = promise =>
    pendingPromises.current = [...pendingPromises.current, promise];

  const removePendingPromise = promise =>
    pendingPromises.current = pendingPromises.current.filter(p => p !== promise);

  const clearPendingPromises = () => pendingPromises.current.map(p => p.cancel());

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };

  return api;
};

export const useClickPreventionOnDoubleClick = (onClick, onDoubleClick) => {
  const api = useCancellablePromises();

  const handleClick = () => {
    api.clearPendingPromises();
    const waitForClick = cancellablePromise(delay(300));
    api.appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick);
        onClick();
      })
      .catch(errorInfo => {
        api.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = (props) => {
    api.clearPendingPromises();
    onDoubleClick(props);
  };

  return [handleClick, handleDoubleClick];
};
