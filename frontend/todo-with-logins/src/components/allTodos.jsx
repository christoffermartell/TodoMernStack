import React from "react";
import Todo from "./todo"

const AllTodos = (props) => {

    const todoInputs = props.todoInputs;

    return (
        <div>
            {
                todoInputs.map((todo,i) => (
                    <Todo key={i} todo={todo} deleteTodo={props.deleteTodo} />
                ))
            }
        </div>
    )
}

export default AllTodos;