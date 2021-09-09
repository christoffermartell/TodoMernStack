import React from "react";

const Todo = ({ posts, deleteTodo, openModal, handleUpdateFinished }) => {
	return (
        <div
            key={posts._id}
            style={{
                textDecoration: posts.completed
                    ? "line-through"
                    : "",
            }}
        >
            <h4 className="text-dark text-center p-1 bg-light border-bottom ">
                {posts.title}
                <i
                    className="far fa-times-circle fa-sm m-1 text-danger float-start"
                    onClick={() => deleteTodo(posts._id)}
                ></i>
                <i
                    className="fa fa-pencil-square-o fa-sm m-1 float-end"
                    aria-hidden="true"
                    onClick={() =>
                        openModal(
                            posts.title,
                            posts.content,
                            posts._id
                        )
                    }
                ></i>
                <input
                    defaultChecked={posts.completed}
                    onChange={(e) =>
                        handleUpdateFinished(e, posts._id)
                    }
                    type="checkbox"
                    className="m-2 float-end"
                ></input>
            </h4>
            <p>{posts.content}</p>
            <p>{posts.completed}</p>
        </div>
    );
};

export default Todo;
