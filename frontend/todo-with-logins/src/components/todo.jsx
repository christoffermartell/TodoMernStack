import React from "react";

const Todo = (props) => {

    const todo = props.todo;

    return (
        <h3
            className="text-dark text-center p-1 bg-light border-bottom">

            <i className="far fa-times-circle fa-sm  m-1 text-danger float-start">
            </i>     
            {todo}
            
            <input
                type="checkbox"
                className="m-2 float-end">
            </input>
        </h3>
    )
}

export default Todo;