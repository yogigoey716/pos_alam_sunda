"use client";

interface Option {
  label: string;
  value: string;
}

interface SelectsProps {
  label: string;
  options: Option[];
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Selects({ label, options, id, name, value, onChange, className }: SelectsProps) {
  return (
    <form className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label} :
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block max-w-96 w-64 px-2.5 py-2
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}