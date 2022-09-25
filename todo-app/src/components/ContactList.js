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
                </tr>
            </thead>
            <tbody >
                {props.data.map((item, index) => <ContactItem key={index} contact={item} no={index + 1} remove={() => props.remove(index)} />)}
            </tbody>
        </table>
    )
}