import React from "react";

const ModalContent = ({ updateTodo, handleModalInput, editTodo, closeModal }) => {
    return (
        <div>
            <h1>Edit todo</h1>
            <form onSubmit={updateTodo}>
                <input
                    onChange={handleModalInput}
                    value={editTodo.title}
                    name="title"
                    type="text"
                    className="form-control rounded-0 mx-1 my-2"
                    placeholder="Title"
                ></input>
                <input
                    onChange={handleModalInput}
                    value={editTodo.content}
                    name="content"
                    type="text"
                    className="form-control rounded-0 m-1 mb-3"
                    placeholder="Todo text"
                ></input>
                <button
                    className="btn btn-danger m-1 float-end"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-success m-1 float-end"
                >
                    Save
                </button>
            </form>
        </div>
    )
}

export default ModalContent;