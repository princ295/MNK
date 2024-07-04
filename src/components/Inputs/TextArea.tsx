import React from "react";
import "./index.css";

type Types = "text" | "date" | "email" | "password"

interface TextPops {
  name: string
  label: string
  placeholder: string
}

const TextArea: React.FC<TextPops> = ({ name, label, placeholder }) => {
  return (
    <textarea required id={name} name={name} placeholder={placeholder}/>
  )
}

export default TextArea;