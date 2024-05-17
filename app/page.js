"use client";
import styles from "./todo.module.css";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ListTasks from "../components/ListTasks";
import { get } from "mongoose";

const Home = () => {
  const [tasks, setTasks] = useState([]); 
  const [users, setUsers] = useState([]);  
 
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
    setUsers(JSON.parse(localStorage.getItem("users")));

  }, []);

{/*  
  useEffect(() => {
      fetch("api/addtask",{
      method: "GET",
      headers: {
        "Content-Type":"application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
   */}
   const getData = async () => {
    const res = await fetch("api/addtask",{
      next:{revalidate:10}
    })
    return res.json()
   }
   const data = getData();
   console.log(data)
 
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.home}>
  <p className="text-white">{data?.task}</p>
        <ListTasks
       
          tasks={tasks}
          setTasks={setTasks}
          users={users}
          setUsers={setUsers}
        />
      </div>
    </DndProvider>
  );
};

export default Home;

