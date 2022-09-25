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
                <button className={props.contact.sent ? "btn btn-danger" : "btn btn-warning"} type="button"
                    onClick={props.contact.sent ? "props.remove" : "props.resend"}>
                    {props.contact.sent ? "DELETE" : "RESEND"}
                </button>
            </td>
        </tr>
    )
}