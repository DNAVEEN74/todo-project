import React, { useState } from 'react';
import './styles/todoListcss.css';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { todoListState } from './atoms';

export default function InputTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, settitleError] = useState('');
    const [descriptionError, setdescriptionError] = useState('');
    const setTodos = useSetRecoilState(todoListState);

    const handleAddTask = async () => {
        if (!title) {
            settitleError("Title is required");
            return;
        } else {
            settitleError('');
        }
        if (!description) {
            setdescriptionError("Description is required");
            return;
        } else {
            setdescriptionError('');
        }

        const task = {
            title,
            description,
        };

        try {
            await axios.post("http://localhost:3000/todos/post", task);
            setTodos((oldTodos)=> [...oldTodos, task]);

            setTitle('');
            setDescription('');
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="InputContainer">
            <div>
                <input 
                    type="text" 
                    placeholder="Enter your Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                {titleError && <div style={{ color: 'red', fontSize: '15px' }}>{titleError}</div>}
            </div>
            
            <div>
                <textarea 
                    name="description" 
                    placeholder="Enter Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    style={{ resize: "none" }}
                ></textarea>
                {descriptionError && <div style={{ color: 'red', fontSize: '15px' }}>{descriptionError}</div>}
            </div>
            <div>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
}
