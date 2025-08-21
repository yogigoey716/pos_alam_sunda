"use client";
import { cn } from "@/lib/utils";

interface InputProps {
  id: string;            // supaya unik per radio
  name: string;          // group radio
  value?: string;         // value yang dikirim
  label?: string;         // label text
  className?: string;    // opsional custom style
  checked?: boolean;     // default selected
  type?: string;         // type input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

export default function Input({
  id,
  name,
  value,
  label,
  className,
  checked,
  onChange,
  type,
  defaultValue,
}: InputProps) {
  return (
    <div
      className="hover:bg-gray-100 dark:hover:bg-gray-600"
    >
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        defaultValue={defaultValue}
        className={className}
      />
      
    </div>
  );
}