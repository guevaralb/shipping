import React from 'react';
import {NavLink} from 'react-router-dom';
// Child components
import Pagination from '../Pagination';

const PacketList = ({items, pk, onDeleteItem, pages, currentPage}) => {
    return (
        !items.length ?
            <p className="alert alert-warning text-center">No items found.</p>
            :
            <div className="item-list">
                <div className="responsive-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            {Object.keys(items.pop()).map(x =>
                                <th>{x}</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item =>
                            <tr key={item[pk]}>
                                {Object.values(item).map(k=><td>{k}</td>)}
                                <td>
                                    <NavLink to={'/bids/' + item[pk]}>View Bids</NavLink>
                                </td>
                                <td>
                                    <NavLink className="btn btn-primary btn-sm"
                                             to={'/edit/' + item[pk]}>Edit</NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                            onClick={() => onDeleteItem(item[pk])}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {/* show pagination if there are more than 1 page */
                    pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>
                }
            </div>
    )
};

export default PacketList;