"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";
import toast from "react-hot-toast";
import {v4 as uuidv4} from 'uuid';
const CreateTas = ({tasks, setTasks}) => {
  const [task, setTask] = useState({
    id:"",
    name:"",
    status:"todo"
  })

//console.log(task);
  const [open, setOpen] = useState(false);

  const Bottom = useRef(null);
  useEffect(() => {
    Bottom.current?.scrollIntoView();

  }, [open]);

  const TaskCreated = () => { toast((t) => (
    <span> 
      <span className="mr-1">Task</span>
      <span className='capitalize text-cyan-600'>{task.name.length}</span>
      <span className="ml-1">Created</span>
      </span>
  ))}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters");
    if (task.name.length > 100)
      return toast.error("A task must not have more than 100 characters");
    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    TaskCreated();
    setOpen(false);
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
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
              value={task.name}
              onChange={(e) => setTask({...task, id:uuidv4(), name: e.target.value})}
              placeholder="Enter your task..."
              className="text-[13px]  rounded-[5px] p-[8px] mt-2 w-[100%]  font-[500] outline-none bg-black text-gray-400"
            />

            <button
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
