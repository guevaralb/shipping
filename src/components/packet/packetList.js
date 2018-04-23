import React from 'react';
import {NavLink} from 'react-router-dom';
// Child components
import Pagination from '../Pagination';

//Material UI
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400}/>
    </IconButton>
);
const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);


const PacketList = ({items, pk, onDeleteItem, pages, currentPage}) => {
    return (
        !items.length ?
            <p className="alert alert-warning text-center">No items found.</p>
            :
            <div className={'Center'}>
                <List>
                    <Subheader>Products</Subheader>
                    <div > {/*style={{"display":"flex"}}*/}
                        {Object.values(items).map(k =>
                            <div >
                                <ListItem
                                    style={{"display":"flex","justify-content":"space-between"}}
                                    leftAvatar={<Avatar src="../../images/logo.png" />}
                                    primaryText={k.descripcion}
                                    secondaryText={
                                        <p>
                                            <span style={{color: darkBlack}}>{k.id}</span> --
                                            {k.precioConIva + "$"}
                                        </p>
                                    }
                                />
                                <Divider inset={true} />
                            </div>
                        )}
                    </div>

                </List>
                    {/* show pagination if there are more than 1 page */
                        pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>
                    }
            </div>
    )
};

export default PacketList;