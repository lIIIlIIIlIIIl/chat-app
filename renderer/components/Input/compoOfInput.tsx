import React from "react";

interface InputProps {
  placeholder: string;
  type?: string;
  setChange: (e: string) => void;
}

export default function CompoOfInput(props: InputProps) {
  return (
    <div className="w-full mb-5">
      <input
        placeholder={props.placeholder}
        className="border py-2 px-2 text-grey-darkest w-full h-full"
        type={props.type ? props.type : "text"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setChange(e.target.value);
        }}
      />
    </div>
  );
}
