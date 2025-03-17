// src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validation à la saisie
    if (touched[name]) {
      const fieldErrors = validate({ 
        ...values, 
        [name]: value 
      });
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name]
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validation au blur
    const fieldErrors = validate(values);
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name]
    }));
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  };
};