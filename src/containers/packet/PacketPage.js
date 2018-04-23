import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as itemActions from '../../actions/packetActions';
// Child components
import PacketList from '../../components/packet/packetList';

class PacketPage extends React.Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(id) {
        if (window.confirm('Are you sure you want to delete this item?')) {
            this.props.actions.deleteItem(id);
        }
    }

    render() {
        return (
            <div className="items">
                {
                    this.props.ajaxLoading ?
                        <p className="text-center alert alert-info">Loading items...</p>
                        :
                        <PacketList pk="id"  items={this.props.items} pages={this.props.pages}
                                      onDeleteItem={this.deleteItem} currentPage={this.props.currentPage} />
                }
            </div>
        )
    }
}

// Generate list of items for given page number
function generateItemsByPage(items, pageNo) {
    // I assumed showing 10 items per page
    const perPage = 10;
    if (items.length) {
        // Filter 10 items by page number
        return items.filter((item, i) => {
            return i >= perPage*(pageNo-1) && i < perPage*pageNo;
        });
    }
    return [];
}

function mapStateToProps(state, ownProps) {
    // Set page number to 1 if no number in url params
    let pageNo = ownProps.match.params.pageNo || 1;
    let items = generateItemsByPage(state.items, pageNo);
    return {
        items: items,
        pages: Math.ceil(state.items.length / 10), // Determine number of pages for pagination
        currentPage: pageNo,
        ajaxLoading: state.ajaxLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PacketPage);