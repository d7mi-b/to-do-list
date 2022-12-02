import Header from "../components/Header";
import List from "../components/List";
import Side from "../components/Side";

const Task = (props) => {
    return (
        <div className={`page home`}>
            <Side />
            <div className="container">
                <Header />
                <List tasks={props.tasks} />
            </div>
        </div>
    )
}

export default Task;