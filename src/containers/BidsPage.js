import React from 'react';
import { connect } from 'react-redux';
// Child components
import BidList from '../components/BidList';

const BidsPage = ({ajaxLoading, bids, goBack}) => {
    return (
        <div className="bids">
            {
                ajaxLoading ?
                    <p className="text-center alert alert-info">Loading bids...</p>
                    :
                    <div>
                        <button onClick={goBack} className="btn btn-info">
                            <span className="glyphicon glyphicon-arrow-left"></span> Back to item list
                        </button>
                        <BidList bids={bids} />
                    </div>
            }
        </div>
    )
};

// Find bids for given item
function generateBids(items, id = -1) {
    // Find item for given ID
    let item = items.find(item => {
        return parseInt(item.id, 10) === parseInt(id, 10);
    });
    if (item) {
        // Sort item bids by created date
        return item.bids.sort(function(a, b) {
            return new Date(b.created) - new Date(a.created);
        });
    } else {
        return [];
    }
}

function mapStateToProps(state, ownProps) {
    let bids = state.items.length ? generateBids(state.items, ownProps.match.params.id) : [];
    return {
        bids,
        ajaxLoading: state.ajaxLoading,
        goBack: ownProps.history.goBack
    }
}

export default connect(mapStateToProps)(BidsPage);