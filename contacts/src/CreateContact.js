import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component {
    handleSubmit = (e) => {
        e.preventDefault()//This is to ensure browser does not handle this event
        //and serializes the form as query string
        //Instead of default serialize it to a string and load it in URL, 
        //we will serialize it into an object and let Javascript handle it
        //hash:true to return an object
        const values = serializeForm(e.target, { hash: true })
        if (this.props.onCreateContact)
            this.props.onCreateContact(values);
    }

    render() {
        return (
            <div>
                <Link className="close-create-contact" to="/">Close</Link>
                <form onSubmit={this.handleSubmit} className="create-contact-form">
                    <ImageInput
                        className="create-contact-avatar-input"
                        name="avatarURL"
                        maxHeight={64}
                    />
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name" />
                        <input type="text" name="email" placeholder="Email" />

                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateContact