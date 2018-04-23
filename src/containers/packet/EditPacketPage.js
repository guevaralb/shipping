import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as itemActions from '../../actions/packetActions';
// Child components
import ItemForm from '../../components/packet/packetForm';

class EditPacketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formStatus: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // Check if form has any errors
        if (!this.props.itemForm.syncErrors) {
            // Add current item ID and bids to form fields
            let item = Object.assign({}, this.props.itemForm.values, {
                id: this.props.currentItem.id,
                bids: this.props.currentItem.bids
            });
            this.props.actions.editItem(item);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            this.props.ajaxLoading ?
                <p className="text-center alert alert-info">Loading item...</p>
                :
                !this.props.currentItem ?
                    <p className="text-center alert alert-danger">Item not found.</p>
                    :
                    <div className="add-item">
                        <h1 className="text-center text-capitalize">Edit item information</h1>
                        <ItemForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus}
                                      initialValues={this.props.currentItem} goBack={this.props.goBack} />
                    </div>
        )
    }
}

// Find current item based on ID passed in URL
function findCurrentItem(items, id = -1) {
    // Find item for given id
    return items.find(item => {
        return parseInt(item.id, 10) === parseInt(id, 10);
    });
}

function mapStateToProps(state, ownProps) {
    let currentItem = state.items.length ? findCurrentItem(state.items, ownProps.match.params.id) : null;
    return {
        currentItem,
        itemForm: state.form.item,
        ajaxLoading: state.ajaxLoading,
        goBack: ownProps.history.goBack
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPacketPage);