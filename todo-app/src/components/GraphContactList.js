import ContactItem from "./GraphContactItem";
import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from "../utils/queries";

export default function ContactList(props) {

    const { loading, error, data } = useQuery(GET_CONTACTS);

    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

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
                {data.getContacts.map((item, index) => <ContactItem
                    key={item.id}
                    contact={item}
                    no={index + 1}
                />)}
            </tbody>
        </table>
    )
}