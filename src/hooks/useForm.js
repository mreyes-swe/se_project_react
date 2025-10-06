import { useState } from "react";

function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleReset = () => setValues(defaultValues);

  return { values, handleChange, handleReset, setValues };
}

export default useForm;
