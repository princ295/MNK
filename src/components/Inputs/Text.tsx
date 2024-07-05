import React, { useEffect, useState } from "react";
import "./index.css";

type Types = "text" | "date" | "email" | "password"

interface TextPops {
  name: string
  type: Types
  label: string
  placeholder: string
  onChnage?: (data:any) => void
  value?: string
}

const Text: React.FC<TextPops> = ({ name, type, label, placeholder, onChnage, value }) => {

  const [st, setSt] = useState('')

  useEffect(() => {
    if(value){
      setSt(value)
    }
  },[value])

  const handleChange = (e) => {
    setSt(e.target.value)
    if(onChnage){
      onChnage(e)
    }
  }
  return (
    <input value={st} onChange={handleChange} required type={type} id={name} name={name} placeholder={placeholder}/>
  )
}

export default Text;