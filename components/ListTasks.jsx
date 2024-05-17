"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { AiTwotoneDelete } from 'react-icons/ai';
import CreateTas from '../app/createTask/page';
import styles from "./ListT.module.css";

const ListTasks =  ({tasks, setTasks, data}) => {

    const [ToDo, setToDo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [Done, setDone] = useState([]);
    const [pushed, setPushed] = useState([]);
      

    const Top = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
      
  {/*         
  useEffect(() => {
  const Todo = tasks.filter((task) => task.status === "todo")
  const Progrss = tasks.filter((task) => task.status === "inprogress")
  const Dne = tasks.filter((task) => task.status === "done")
  const Push = tasks.filter((task) => task.status === "pushed")
  setToDo(Todo);
  setInProgress(Progrss);
  setDone(Dne);
  setPushed(Push);
}, [tasks]) 
  */}
  const statuses = ["todo", "inprogress", "done", "pushed"]
  return (
    <div className={styles.listTasks}>

      {statuses.map((status, index) => (
        <Section
        Top={Top}
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          ToDo={ToDo}
          inProgress={inProgress}
          Done={Done}
          pushed={pushed}
        />
      ))}
    </div>
  );
}

export default ListTasks;


const Section = ({
  status,
  tasks,
  setTasks,
  ToDo,
  inProgress,
  Done,
  pushed,
  Top,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const TaskMoved = () => {
    toast((t) => (
      <span>
        Task moved to <span className="capitalize text-cyan-600">{status}</span>
      </span>
    ));
  };
  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      return mTasks;
    });
    TaskMoved();
  };
  let text = "Todo";
  let bg = "bg-gray-300";
  let tasksToMap = ToDo;

  if (status === "todo") {
    text = "todo";
    tasksToMap = ToDo;
  }
  if (status === "inprogress") {
    text = "inprogress";
    tasksToMap = inProgress;
  }
  if (status === "done") {
    text = "done";
    tasksToMap = Done;
  }
  if (status === "pushed") {
    text = "pushed";
    tasksToMap = pushed;
  }

  return (
    <div className="">
      <div
        ref={drop}
        className={` w-64 h-80  overflow-y-auto no-scrollbar  ${
          isOver ? "text-cyan-600" : "text-white"
        }`}
      >
        <Header text={text} bg={bg} count={tasksToMap.length} Top={Top} />
        <div>


          
             
              <Task
               
              />
              
            
          <div className="text-white justify-center flex ">
            {status === "todo" ? (
              <CreateTas tasks={tasks} setTasks={setTasks} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};




const Header = ({text, bg, count, Top}) => {
    return (
      <div
        ref={Top}
        className={`${bg} justify-between  flex  text-gray-700 text-[15px] rounded-[5px] p-[10px] font-[700] m-[3px] px-4 capitalize touch-none`}
      >
        {text}
        <span className="text-cyan-600">
          <div ref={Top} />
          {count}
        </span>
      </div>
    );
  };
  const Task = ({tas, tasks, setTasks}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
    const TaskRemoved = () => { toast((t) => (
      <span>
       <span className="capitalize text-cyan-600 mr-1">Task</span>
         {tas.task.length}
        <span className="capitalize text-cyan-600 ml-1">Removed</span>
      </span>
    ));}
    const handleRemove = (id) => {
      const RTask = tasks.filter(r => r.id !== id)
      localStorage.setItem("tasks", JSON.stringify(RTask));
      setTasks(RTask);
      TaskRemoved();
     }
    return (
      <div className=''>
        <div
          ref={drag}
          className="text-gray-700 hover:bg-cyan-300 bg-gray-300 text-[13px] flex justify-between rounded-[5px] p-[10px] font-[500] m-[3px] px-4 text-start touch-none "
        >
          <p className={`${isDragging ? "text-cyan-600 text-[15px]" : "normal-case"}`}>
            {tas.task}
             
          </p>
          <span>
            <AiTwotoneDelete
              fontSize={19}
              onClick={() => handleRemove(task.id)}
              className="transition duration-300 ease-in-out hover:scale-125 cursor-pointer"
            />
          </span>
        </div>
      </div>
    );
  };
