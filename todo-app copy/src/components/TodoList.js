import TodoItem from "./TodoItem";

export default function TodoList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>
                        No.
                    </th>
                    <th>
                        Title
                    </th>
                </tr>
            </thead>
            <tbody >
                {props.data.map((item, index) => <TodoItem key={item.id} todo={item} no={index + 1} />)}
            </tbody>
        </table>
    )
}