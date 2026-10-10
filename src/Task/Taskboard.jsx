import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import Search from "./Search";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import NoTaskFound from "./NoTaskFound";

export default function Taskboard() {
  const defaultTask = {
    id: crypto.randomUUID(), //create random id from JS
    title: "Learn React",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["react", "javascript", "frontend"],
    priority: "high",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]); //Create a default task, helps to test
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    // console.log("Adding a task..", newTask);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if(task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }
  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  function handleCloseClick(){
    setShowAddModal(false);
    setTaskToUpdate(null); //all state passed to the modal must be nullified
  }
  function handleDeleteTask(taskId){
    const tasksAfterDelete = tasks.filter(task => task.id !== taskId);
    setTasks(tasksAfterDelete);
  }
  function handleDeleteAllClick(){
    tasks.length = 0;
    setTasks([...tasks]);
  }
  function handleFavorite(taskId){
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    const newTasks = [...tasks];
    
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

    setTasks(newTasks);
  }
  function handleSearch(searchTerm){
    console.log(searchTerm);

    const filtered = tasks.filter((task) =>  
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setTasks([...filtered]);

  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseClick}/>
      )}
      <div className="container">
        {/* Search Box */}
        <div className="p-2 flex justify-end">
          <Search onSearch={handleSearch}/>
        </div>
        {/* Search Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowAddModal(true)} 
            onDeleteAllClick={handleDeleteAllClick}
            />
          {
            tasks.length > 0 ?
            (<TaskList 
          tasks={tasks} 
          onEdit={handleEditTask} 
          onDelete={handleDeleteTask}
          onFavorite={handleFavorite}
          />)
          :
          (<NoTaskFound />)
          }
        </div>
      </div>
    </section>
  );
}
