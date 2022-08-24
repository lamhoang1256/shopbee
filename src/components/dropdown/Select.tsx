import React from "react";
import { useDropdown } from "./dropdown-context";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = ({ placeholder, className }: SelectProps) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      aria-hidden
      className={`flex items-center justify-between px-4 rounded-sm outline-none h-10 border border-[#00000024] focus:border focus:border-[#0000008a] shadow-input cursor-pointer ${className}`}
      onClick={toggle}
    >
      <span className='capitalize'>{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;
