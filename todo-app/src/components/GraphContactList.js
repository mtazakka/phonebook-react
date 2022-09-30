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
            limit: 7
        }
    });
    console.log('ini data', data)
    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            {/* <table className="table card-header">
                <thead>
                    <tr>
                        <th className="col-md-1">#</th>
                        <th className="col-md-4">Name</th>
                        <th className="col-md-4">Phone</th>
                        <th className="col-md-3">Actions</th>
                    </tr>
                </thead>
            </table> */}
            <div className="row card-body" id="container-list">
                <div className="col-md-1"><b>#</b></div>
                <div className="col-md-4"><b>Name</b></div>
                <div className="col-md-4"><b>Phone</b></div>
                <div className="col-md-3"><b>Actions</b></div>
            </div >
            <hr></hr>
            {
                data &&
                data.getContacts.map((item, index) => <ContactItem
                    key={item.id}
                    contact={item}
                    no={index + 1}
                // name={item.name}
                // phone={item.phone}
                // latitude={item.latitude}
                // longitude={item.longitude}
                // alamat={item.alamat}
                // searchReset={props.searchReset}
                // fungsi2={isiPeta}
                />)
            }
            {
                data && (
                    <InView
                        onChange={async (inView) => {
                            const currentLength = data.getContacts.length || 0;
                            if (inView) {
                                await fetchMore({
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
            {/* <table className="table table-striped">
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
            </table> */}
        </div >
    )
}


