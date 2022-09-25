export default function TodoItem(props) {
    return (
        <tr>
            <td>{props.no}</td>
            <td>
                {props.todo.title}
            </td>
        </tr>
    )
}