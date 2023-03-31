import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant: 'primary' | 'outline';
  onClick?: any;
}

const Button: FC<ButtonProps> = (ButtonProps) => {
  const { variant, onClick, children } = ButtonProps;
  let classes;
  switch (variant) {
    case 'primary':
      classes = 'btn btn-primary';
      break;
    case 'outline':
      classes = 'btn btn-outline';
      break;
    default:
      classes = 'btn bg-white text-blue-500 ';
      break;
  }
  return (
    <button type='button' className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
