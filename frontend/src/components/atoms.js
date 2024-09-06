import { atom, selector } from "recoil";
import axios from "axios";

export const todoListState = atom({
    key: 'todoListState',
    default: [],
});

export const TodoListSelector = selector({
    key: "TodoListSelector",
    get: async ({ get }) => {
        try {
            const response = await axios.get("http://localhost:3000/todos");
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return get(todoListState);
        }
    },
});
