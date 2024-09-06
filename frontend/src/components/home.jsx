import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { TodoListSelector, todoListState } from "./atoms";
import TodoItem from "./TodoItem";
import InputTodo from "./InputTodo";
import "./styles/todoListcss.css"
import { useEffect } from "react";

export default function Home() {
    return (
        <div>
            <InputTodo />
            <TodoRender />
        </div>
    );
}

export function TodoRender() {
    const [todos, setTodos] = useRecoilState(todoListState);
    const todoListLoadable = useRecoilValueLoadable(TodoListSelector);

    useEffect(()=>{
        if (todoListLoadable.state === 'hasValue'){
            setTodos(todoListLoadable.contents);
        }else if (todoListLoadable.state === 'hasError'){
            return console.log("Error loading todos")
        }
    }, [todoListLoadable, setTodos]);

    return (
        <div className="TodoList">
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    todo={todo.title}
                    description={todo.description} 
                    completed={todo.completed}
                />
            ))}
        </div>
    );
}