import { useState } from 'react';

export default function useInput() {
  const [value, setValue] = useState();

  function onChange(event) {
    setValue(event.target.value);
  }

  return {value, onChange, setValue};
}