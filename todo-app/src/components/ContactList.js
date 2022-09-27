import ContactItem from "./ContactItem";

export default function ContactList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Phone
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody >
                {props.data.map((item, index) => <ContactItem
                    key={item.id}
                    contact={item}
                    no={index + 1}
                    remove={() => props.remove(item.id)}
                    resend={() => props.resend(item.id, item.name, item.phone)} />)}
            </tbody>
        </table>
    )
}