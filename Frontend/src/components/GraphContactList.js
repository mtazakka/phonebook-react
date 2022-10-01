import ContactItem from "./GraphContactItem";
import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from "../utils/queries";
import { InView } from "react-intersection-observer";

export default function ContactList(props) {

    const { loading, error, fetchMore, data } = useQuery(GET_CONTACTS, {
        variables: {
            name: props.searchData.name === undefined ? '' : props.searchData.name,
            phone: props.searchData.phone === undefined ? '' : props.searchData.phone,
            offset: 0,
            limit: 9
        }
    });


    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <div className="row card-body" id="container-list">
                <div className="col-md-1"><b>#</b></div>
                <div className="col-md-4"><b>Name</b></div>
                <div className="col-md-4"><b>Phone</b></div>
                <div className="col-md-3"><b>Actions</b></div>
            </div >
            <hr></hr>
            <div>

                {
                    data &&
                    data.getContacts.map((item, index) => <ContactItem
                        key={item.id}
                        index={index}
                        contact={item}
                        no={index + 1}
                        searchReset={props.searchReset}
                    />)}
                {
                    data && (
                        <InView
                            onChange={(inView) => {
                                const currentLength = data.getContacts.length || 0;
                                if (inView) {
                                    fetchMore({
                                        variables: {
                                            offset: currentLength,
                                            limit: currentLength + 2
                                        }
                                    })
                                }
                            }}
                        />
                    )
                }
            </div>
        </div >
    )
}


