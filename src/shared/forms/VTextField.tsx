import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';


type TVTextFieldProps = TextFieldProps & {
  name: string;
}

export const VTextField = ({ name, label, ...rest }: TVTextFieldProps) => {

  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({ 
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });

  }, [registerField, fieldName, value]);

  return (
    <TextField
      label={label}
      variant='outlined'
      value={value}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => error ? clearError() : undefined}
      onChange={e => setValue(e.target.value) }
      { ...rest }
    />
  );

};