"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";
import toast from "react-hot-toast";
const CreateTas = ({tasks, setTasks}) => {
 

  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');

  const Bottom = useRef(null);
  useEffect(() => {
    Bottom.current?.scrollIntoView();

  }, [open]);

 
  const TaskForm = async (formData) => {
    const res = await fetch("http://localhost:3000/apii", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setState(data);
    toast(state.message)    
  };

  {/*  
   async function handleSubmit(e) {
   e.preventDefault();
   if(!info.task) {
    toast.error("empty.")
   }
   localStorage.setItem("tasks", JSON.stringify(info));
   toast.success(`Task : ${info.task} : created`)

   console.log("task created")
  }
*/}
  
  return (
    <div
    className="bg-gray-300 cursor-pointer    text-gray-700 font-[700] text-[13px] rounded-[5px]  p-[10px] m-[3px] w-[100%] text-start touch-none">

      <div
        className="bg-gray-300 cursor-pointer flex  text-gray-700  text-[13px] rounded-[5px] font-[700]   text-start touch-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <TiPlus fontSize={20} className="w-[23px]" />
        Add a card  
      </div>

      {open && (
        <div className="flex">
          <form  action={TaskForm} className="">
            <input
              type="text"
              name="task"
              placeholder="Enter your task..."
              className="text-[13px]  rounded-[5px] p-[8px] mt-2 w-[100%]  font-[500] outline-none bg-black text-gray-400"
            />

            <button
            type="submit"
              className="bg-black font-[600] text-gray-300 mt-2  p-[8px]  rounded-[5px]"
            >
              Add card
            </button>
          </form>
        </div>
      )}
      <div ref={Bottom} />
    </div>
  );
};

export default CreateTas;
