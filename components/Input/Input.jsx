import React, { useState } from 'react'

const Input = ({onSubmit}) => {
    const [input, setInput] = useState("");
    const handleSubmit = () => {
        if(!input) return;
        onSubmit(input);
        setInput("");
    }
  return (
    <div className=''>
      <input type='text' className="rounded-[5px] p-[10px] border-solid border-2 border-white" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={handleSubmit} className="rounded-[5px] p-[10px] text-black bg-white font-[700]">Add to Card</button>
    </div>
  )
}

export default Input
