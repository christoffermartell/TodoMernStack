

const Todo = () =>{
    return (
    <h3
    className="text-dark text-center p-1 bg-light border-bottom">

    <i className="far fa-times-circle fa-sm  m-1 text-danger float-start">
    </i>     
    Hårdkodad ska ändras
    
    <input
        type="checkbox"
        className="m-2 float-end">
    </input>
</h3>
    )
}

export default Todo;