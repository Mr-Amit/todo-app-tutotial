import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskBoard.css";
import { BASE_URL } from "../../Constants.js";


enum TaskStatus {
    NEW = "new",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
}

interface Task {
    _id: any;
    userId: string;
    status: string;
    title: string;
    description: string;
}

const TaskBoard = () => {
    let userData: any = localStorage.getItem("userData");
    userData = JSON.parse(userData);

    const [taskData, setTaskData] = useState<Task[]>([]);
    const [currentTaskAction, setCurrentTaskAction] = useState({});
    const [flag, setFlag] = useState("");
    const [taskBody, setTaskBody] = useState<Task>({
        _id: null,
        status: "",
        userId: "",
        title: "",
        description: "",
    });

    const handleChange = (event: any) => {
        setTaskBody({
            ...taskBody,
            [event.target.name]: event.target.value,
        });
    };

    function allowDrop(ev: any, flag: any) {
        ev.preventDefault();
        setFlag(flag);
    }

    function drag(ev: any, elem: any) {
        let taskCopy = JSON.parse(JSON.stringify(elem));
        setCurrentTaskAction(taskCopy);
        ev.dataTransfer.setData("drag_data", ev.target.id);
    }

    function drop(ev: any) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("drag_data");
        ev.target.appendChild(document.getElementById(data));
        updateTaskStatus(currentTaskAction, flag);
    }

    const createTask = async (e: any) => {
        try {
            e.preventDefault();
            let userData: any = localStorage.getItem("userData");
            userData = JSON.parse(userData);
            let { title, description } = taskBody;
            let body = {
                title,
                description,
                userId: userData.data.userId,
            };
            let createdTask = await axios.post(`${BASE_URL}/task`, body);
            if (createdTask.data.status == true) {
                setTaskBody({
                    _id: null,
                    status: "",
                    userId: "",
                    title: "",
                    description: "",
                });
                getAllTask();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllTask = async () => {
        try {
            let userData: any = localStorage.getItem("userData");
            userData = JSON.parse(userData);
            const res = await axios.get(
                `${BASE_URL}/task/${userData.data.userId}`,
                {
                    headers: {
                        Authorization: userData.data.token,
                    },
                }
            );
            setTaskData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateTaskStatus = async (task: any, action: any) => {
        try {
            task.status = action;
            let updateTask = await axios.put(
                `${BASE_URL}/task/${task._id}`,
                task,
                {
                    headers: {
                        authorization: userData.data.token,
                    },
                }
            );
            if (updateTask.status !== 200) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTask = async (task: any) => {
        try {
            let updateTask = await axios.delete(
                `${BASE_URL}/task/${task._id}`,
                {
                    headers: {
                        authorization: userData.data.token,
                    },
                }
            );
            if (updateTask.status == 200) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const logOut = (event: any) => {
        event.preventDefault();
        localStorage.removeItem("userData");
        window.location.reload();
    };

    useEffect(() => {
        getAllTask();
    }, []);

    return (
        <>
            <div className="todo_cover">
                <div className="todo_bar">
                    <h2>Your ToDo List</h2>
                    <div className="todo_bar_right">
                        <h2>{userData.data.name}</h2>
                        <button className="logout_button" onClick={logOut}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="todo_top">
                    <div className="form_div">
                        <form className="create_todo_form">
                            <input
                                className="todo_input"
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                value={taskBody.title}
                                onChange={handleChange}
                            />
                            <input
                                className="todo_input"
                                type="text"
                                id="descripton"
                                name="description"
                                placeholder="Description.."
                                value={taskBody.description}
                                onChange={handleChange}
                            />
                            <button
                                className="todo_submit"
                                type="submit"
                                value="Create New Task"
                                onClick={(e) => createTask(e)}
                            >
                                Create New Task
                            </button>
                        </form>
                    </div>
                </div>

                <div className="todo_bottom">
                    <div className="todo_bottom_cover">
                        <div className="todo_first">
                            <h2>To Do</h2>
                            <div
                                className="todo_list"
                                id="todo_list"
                                onDrop={(e) => drop(e)}
                                onDragOver={(e) => allowDrop(e, "new")}
                            >
                                {taskData
                                    .filter((data) => {
                                        return data.status === TaskStatus.NEW;
                                    })
                                    .map((elem, i) => {
                                        return (
                                            <div
                                                className="card_container"
                                                key={i}
                                                id={`card_container_${elem._id}`}
                                                draggable="true"
                                                onDragStart={(e) => drag(e, elem)}
                                            >
                                                <div className="card">
                                                    <div className="card-containers">
                                                        <h4>{elem.title}</h4>
                                                        <p>{elem.description}</p>
                                                    </div>
                                                    <div className="todo_delete">
                                                        <button
                                                            className="todo_delete_button"
                                                            onClick={() => deleteTask(elem)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="todo_second">
                            <h2>In Progress</h2>
                            <div
                                className="in_progress_list"
                                id="in_progress_list"
                                onDrop={(e) => drop(e)}
                                onDragOver={(e) => allowDrop(e, "in_progress")}
                            >
                                {taskData
                                    .filter((data) => {
                                        return data.status === TaskStatus.IN_PROGRESS;
                                    })
                                    .map((elem, i) => {
                                        return (
                                            <div
                                                className="card_container"
                                                key={i}
                                                id={`card_container_${elem._id}`}
                                                draggable="true"
                                                onDragStart={(e) => drag(e, elem)}
                                            >
                                                <div className="card">
                                                    <div className="card-containers">
                                                        <h4>{elem.title}</h4>
                                                        <p>{elem.description}</p>
                                                    </div>
                                                    <div className="todo_delete">
                                                        <button
                                                            className="todo_delete_button"
                                                            onClick={() => deleteTask(elem)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="todo_third">
                            <h2>Completed</h2>
                            <div
                                className="completed_list"
                                id="completed_list"
                                onDrop={(e) => drop(e)}
                                onDragOver={(e) => allowDrop(e, "completed")}
                            >
                                {taskData
                                    .filter((data) => {
                                        return data.status === TaskStatus.COMPLETED;
                                    })
                                    .map((elem, i) => {
                                        return (
                                            <div
                                                className="card_container"
                                                key={i}
                                                id={`card_container_${elem._id}`}
                                                draggable="true"
                                                onDragStart={(e) => drag(e, elem)}
                                            >
                                                <div className="card">
                                                    <div className="card-containers">
                                                        <h4>{elem.title}</h4>
                                                        <p>{elem.description}</p>
                                                    </div>
                                                    <div className="todo_delete">
                                                        <button
                                                            className="todo_delete_button"
                                                            onClick={() => deleteTask(elem)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskBoard;
