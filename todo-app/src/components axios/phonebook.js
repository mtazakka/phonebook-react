import '../App.css';
import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import PhonebookItem from "./PhonebookItem"
import { InView } from "react-intersection-observer";
import HashLoader from "react-spinners/HashLoader";

export default function PhonebookTable(props) {
    const { loading, error, fetchMore, data } = useQuery(GET_USERS, {
        variables: {
            name: props.searchData.name === undefined ? '' : props.searchData.name,
            alamat: props.searchData.alamat === undefined ? '' : props.searchData.alamat,
            offset: 0,
            limit: 10
        },
    });

    if (loading) return <p className="loading">
        <HashLoader size={150} />
    </p>;
    if (error) return `Error! ${error.message}`;
    function isiPeta(user) {
        props.fungsi(user)
    }

    return (
        <div className="div div-striped">

            <div className="row">
                <div className="col-md-1"><b>#</b></div>
                <div className="col"><b>Name</b></div>
                <div className="col"><b>Phone</b></div>
                <div className="col"><b>Alamat</b></div>
                {/* <div className="col"><b>Lat & Long</b></div> */}
                <div className="col"><b>Actions</b></div>
            </div>
            <hr></hr>

            {data &&
                data.getPhonebooks.map((item, index) => <PhonebookItem
                    key={item.id}
                    index={index}
                    id={item.id}
                    name={item.name}
                    phone={item.phone}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    alamat={item.alamat}
                    searchReset={props.searchReset}
                    fungsi2={isiPeta}
                />)}
            {data && (
                <InView
                    onChange={async (inView) => {
                        const currentLength = data.getPhonebooks.length || 0;
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
            )}

        </div>
    )
}