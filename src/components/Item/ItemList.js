import React from 'react';
import {NavLink} from 'react-router-dom';
// Child components
import Pagination from '../Pagination';
import './microstyles.css'

//Material UI
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//React Icons
import TiEdit from 'react-icons/lib/ti/edit'
import TiDelete from 'react-icons/lib/ti/delete'

const styles = {
    display: "flex",
    "justify-content": "space-around",
    "margin-top": "10px"
}


const ItemList = ({items, pk, onDeleteItem, pages, currentPage}) => {
    return (
        !items.length ?
            <p className="alert alert-warning text-center">No items found.</p>
            :
            <div className="item-list">
                <div className="responsive-table">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {Object.keys(items.pop()).map(x =>
                                    <TableHeaderColumn>{x}</TableHeaderColumn>
                                )}
                                <TableHeaderColumn /><TableHeaderColumn />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map(item =>
                                <TableRow key={item[pk]}>
                                    {Object.values(item).map(k=><TableRowColumn>{k}</TableRowColumn>)}
                                    <TableRowColumn>
                                        <NavLink to={'/bids/' + item[pk]}>View Bids</NavLink>
                                    </TableRowColumn>
                                    <div style={styles}>
                                        <div>
                                            <NavLink
                                                     to={'/edit/' + item[pk]}><TiEdit className={'Edit'}/></NavLink>
                                        </div>
                                        <div>
                                            <TiDelete
                                                    className={'Delete'}
                                                    onClick={() => onDeleteItem(item[pk])}
                                            />
                                        </div>
                                    </div>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* show pagination if there are more than 1 page */
                    pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>
                }
            </div>
    )
};

export default ItemList;