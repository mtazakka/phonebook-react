export default function Contacttem(props) {
    return (
        <tr>
            <td>{props.no}</td>
            <td>
                {props.contact.title}
            </td>
        </tr>
    )
}