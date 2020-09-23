import { useContext, useState } from "react";
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
  return { formFields, createChangeHandler };
};
