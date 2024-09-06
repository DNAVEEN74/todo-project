import axios from "axios";
import { useState } from "react";
import "./styles/todoListcss.css"
import { useSetRecoilState } from "recoil";
import { todoListState } from "./atoms";


export default function TodoItem({ todo, description, completed }) {
    const [isChecked, setIsChecked] = useState(completed || false);
    const setTodos = useSetRecoilState(todoListState);

async function handleCheck(event) {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);

        try {
            const data = { title: todo, completed: newCheckedState };
            await axios.put("http://localhost:3000/todos/completed", data);
        }catch (error){
            console.log('Error in put request:', error)
        }
    }

   async function handleDelete (){
        try {
            const deleteTask = {
                title: todo,
                completed: isChecked,
                }

            await axios.delete("http://localhost:3000/todos/delete", {
                data: deleteTask,   
            });

            setTodos((oldTodos) => oldTodos.filter((item) => item.title !== todo));

        }catch (error){
            console.log("Error in deleting the task is", error)
        }
    }

    return (
        <div className="todoItems">
            <h2 id="TodoTitle" >{todo}</h2>
            <h4 id="TodoDescription" >{description}</h4>
            <div className="buttons">
            <div>
                <input id="checkbox" type="checkbox" checked={isChecked} onChange={handleCheck} />
                {isChecked ? <button style={{
                    backgroundColor:'green',
                    color:'white',
                    border:'none',
                    padding:'8px 16px',
                    fontWeight:'bold',
                    width:'140px',
                    height:'30px',
                    borderRadius:'3px'
                }}>Completed</button> : <button style={{
                    backgroundColor:'gray',
                    color:'white',
                    border:'none',
                    padding:'8px 16px',
                    fontWeight:'bold',
                    width:'140px',
                    height:'30px',
                    borderRadius:'3px'
                }}>Not Completed</button>}
              </div>
              <div>
                <button type="button" onClick={handleDelete} style={{
                    backgroundColor:'#FF3333',
                    color:'white',
                    border:'none',
                    padding:'8px 16px',
                    cursor:'pointer',
                    fontWeight:'bold',
                    width:'100px',
                    height:'30px',
                    borderRadius:'3px'
                }}>Delete</button>
              </div>
            </div>
        </div>
    )
}
