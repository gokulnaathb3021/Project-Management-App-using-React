import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleSaveAddedProject(projectData) {
    const newProject = { ...projectData, id: Math.random() }
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
      };
    })
  }

  function handleAddTask(text) {
    if (text.trim() === "")
      return;
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }
  function handleDeleteTask(id) {
    setProjectsState(prevState => {

      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  }

  const project = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject project={project} handleDeleteProject={handleDeleteProject}
    handleAddTask={handleAddTask}
    handleDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject handleSaveAddedProject={handleSaveAddedProject} handleCancelAddProject={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onAddProject={handleAddProject} projects={projectsState.projects} handleSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId} />
        {content}
      </main>
    </>
  );
}

export default App;
