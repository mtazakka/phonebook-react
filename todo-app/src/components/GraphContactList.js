import ContactItem from "./GraphContactItem";
import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from "../utils/queries";

export default function ContactList(props) {

    const { loading, error, data } = useQuery(GET_CONTACTS, {
        variables: {
            name: props.searchData.name === undefined ? '' : props.searchData.name,
            phone: props.searchData.phone === undefined ? '' : props.searchData.phone,
        }
    });
    console.log('ini data', data)
    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    return (
        <table className="table table-striped" idName="phonebook-table">
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