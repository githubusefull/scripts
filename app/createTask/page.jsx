"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";
import toast from "react-hot-toast";
const CreateTas = ({ tasks, setTasks}) => {
 

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({task:""});

  const Bottom = useRef(null);
  useEffect(() => {
    Bottom.current?.scrollIntoView();

  }, [open]);

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  }
   async function handleSubmit(e) {
   e.preventDefault();
   if(!info.task) {
    toast.error("Please type your task.")
   } else { 
   try {
   const res = await fetch("api/addtask",{
     method:"POST",
     headers: {
       "Content-Type":"application/json",
     },
     body: JSON.stringify(info),
   });
   if(res.ok){
     const form = e.target;
     localStorage.setItem("tasks", JSON.stringify(info));
     form.reset();
     setOpen(false);
     const success = await res.json();
     toast.success(success.message);
   } else {
     const errorData = await res.json();
     toast.error(errorData.message)
   }
   } catch (error) {
  toast.error("Something Went Wrong!.")
   }
  }
   }
  

  
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
          <form  onSubmit={handleSubmit} className="">
            <input
              type="text"
              name="task"
              onChange={(e) => handleInput(e)}
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
