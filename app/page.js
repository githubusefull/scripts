"use client";
import styles from "./todo.module.css";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ListTasks from "@/components/ListTasks";

const Home = () => {
  const [tasks, setTasks] = useState([]); 
  const [users, setUsers] = useState([]);  
 
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
    setUsers(JSON.parse(localStorage.getItem("users")));

  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.home}>
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

