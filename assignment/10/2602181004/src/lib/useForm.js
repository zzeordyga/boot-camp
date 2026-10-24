import { useState } from 'react';

export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    const next = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(next);
    setErrors(validate(next));
  };

  const onBlur = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
    setErrors(validate(values));
  };

  const validateAll = () => {
    const all = validate(values);
    setErrors(all);
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])));
    return all;
  };

  const visibleErrors = Object.fromEntries(Object.entries(errors).filter(([key]) => touched[key]));

  return { values, errors: visibleErrors, onChange, onBlur, validateAll };
}
