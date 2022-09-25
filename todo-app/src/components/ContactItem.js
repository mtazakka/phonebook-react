export default function ContactItem(props) {
    return (
        <tr>
            <td>{props.no}</td>
            <td>
                {props.contact.name}
            </td>
            <td>
                {props.contact.phone}
            </td>
            <td>
                <button className="btn btn-danger" type="button" onClick={props.rmeove}>DELETE</button>
            </td>
        </tr>
    )
}