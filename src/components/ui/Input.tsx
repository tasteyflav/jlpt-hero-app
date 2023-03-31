import React, { FC } from 'react';

interface InputProps {
  id: string;
  type: 'password' | 'text';
  placeholder: string;
  value: string;
  helpertext?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (InputProps) => {
  const { id, type, placeholder, value, helpertext, onChange } = InputProps;
  return (
    <div>
      <input
        id={id}
        className='input border-2 rounded hover:border-black'
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <div className='text-left text-xs mt-1 text-red-400 h-4'>
        {helpertext}
      </div>
    </div>
  );
};
export default Input;
