import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';

// Item form
let ItemForm = ({schema,onSubmit, submitting, formStatus}) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-lg-4 col-sm-push-3 col-lg-push-4">
                <form onSubmit={onSubmit} noValidate>
                    {/*{JSON.stringify(schema)}
                    {JSON.stringify(Object.entries(schema).map(([k,v])=>{return v}))}
                    */}
                    {Object.keys(schema).map((k)=>
                        <Field name={schema[k].name} component={renderField} type={schema[k].type}
                               id={k} label={schema[k].label}/>
                    )}

                {/*    <Field name="lastname" component={renderField} type="text"
                           id="last-name" label="Last Name"/>
                    <Field name="avatarUrl" component={renderField} type="url"
                           id="avatar-url" label="Avatar Url"/>
                    <Field name="email" component={renderField} type="email"
                           id="email-address" label="Email Address"/>
                    <Field name="phone" component={renderField} type="tel"
                           id="phone-number" label="Phone Number"/>
                    <Field name="has-premium" component={renderField} type="checkbox"
                           label="Has Premium"
                    />
                */}    <button type="submit" className="btn btn-primary item-submit" disabled={submitting}>Submit</button>
                </form>
                {formStatus === 'success' &&
                <p className="alert alert-success">
                    Item successfully saved.
                    <NavLink to="/items/1"> Return to item list</NavLink>
                </p>}
                {formStatus === 'error' &&
                <p className="alert alert-danger">Saving item failed. Please fill in all the fields.</p>}
            </div>
        </div>
    )
};

// Render schema for each field
const renderField = (
    {
        input,
        label,
        type,
        id,
        meta: {touched, error}
    }) => (
    (() => {
        switch (type) {
            case "checkbox":
                return <div className="checkbox">
                    <label>
                        <input {...input} type={type}/>
                        {label}
                    </label>
                    {touched &&
                    (error &&
                        <span className="error-text">
            {error}
          </span>)}
                </div>
                break;
            default:
                return <div className="form-group">
                    <label htmlFor={id}>
                        {label}
                    </label>
                    <input {...input} id={id} type={type} className="form-control"/>
                    {touched &&
                    (error &&
                        <span className="error-text">
               {error}
          </span>)}
                </div>
        }
    })()
);
/// TODO: GENERALIZAR
// Form validation
function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = 'Please enter a first name';
    }

    if (!formProps.lastname) {
        errors.lastname = 'Please enter a last name';
    }

    if (!formProps.avatarUrl) {
        errors.avatarUrl = 'Please enter an avatar url';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Invalid email address';
    }

    if (!formProps.phone) {
        errors.phone = 'Please enter a phone number';
    } // A more specific phone number validation can be added here

    return errors;
}

ItemForm = reduxForm({
    form: 'item',
    //validate,
    enableReinitialize: true
})(ItemForm);

export default ItemForm;