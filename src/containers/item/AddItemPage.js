import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as itemActions from '../../actions/itemActions';
// Child components
import ItemForm from '../../components/Item/ItemForm';
import ItemSchema from '../../schemas/Item';

class AddItemPage extends React.Component {
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
            // Add new ID and empty array of bids to form fields
            let item = Object.assign({}, this.props.itemForm.values, {
                id: this.props.newId,
                bids: []
            });
            this.props.actions.addItem(item);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            <div className="add-item">
                <h1 className="text-center text-capitalize">Add new item</h1>
                <ItemForm schema={ItemSchema} onSubmit={this.handleSubmit} formStatus={this.state.formStatus} />
            </div>
        )
    }
}

// Generate ID for new item
function generateNewId(items) {
    // Clone items array
    let sortedItems = items.slice(0);
    // Sort items by ID
    sortedItems = sortedItems.sort(function(a, b) {
        return b.id - a.id;
    });
    let lastId = sortedItems.length ? parseInt(sortedItems[0].id, 10) : 0;
    return lastId + 1;
}

function mapStateToProps(state) {
    let newId = generateNewId(state.items);
    return {
        itemForm: state.form.item,
        newId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemPage);