//Component to list the contacts
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'

//Stateless functional component - If render is the only method in your component 
//class, then we can create the component as a function instead of class.
//Here, instead of accessing props via this.props, it will be passed as parameters
//to the function

/*function ListContacts(props){
    const contacts = props.contacts;
     return (
            <ol className='contact-list'>
               {contacts.map(contact => (
                   <li key={contact.id} className='contact-list-item'>
                       <div className='contact-avatar' style ={{
                         backgroundImage: `url(${contact.avatarURL})`  
                       }}/>
                       <div className='contact-details'>
                           <p>{contact.name}</p>
                           <p>{contact.email}</p>
                       </div>
                       <button className='contact-remove' onClick = {() => props.onDeleteContact(contact)}>
                           Remove
                        </button>
                    </li>
               ))}
            </ol>
        )
}

ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}*/
class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
    }

    clearQuery = () => {
        this.setState({
            query: ''
        })
    }

    render() {
        //Object Destructuring
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;
        let showingContacts;

        //if something is typed, apply filter
        if (query) {
            //if there are any spl chars inside the query then escape them
            //and treat them as string literals instead of part of regex
            //'i' - case insensitive
            const match = new RegExp(escapeRegExp(query), 'i');
            showingContacts = this.props.contacts.filter((contact) => match.test(contact.name));
        }
        else {
            showingContacts = contacts;
        }
        //Sort is javascript method on arrays - sortBy is spl library to specify 
        //a property from array of objects based on which to sort
        showingContacts.sort(sortBy('name'));
        return (
            <div className='list-contacts'>
                {/*} {JSON.stringify(this.state.query)} */}
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    {/*} <a href="#create"
                        onClick={() => { onNavigateToCreate() }}
                        className="add-contact">
                        Add Contact</a>*/}
                    <Link
                        to="/create"
                        className="add-contact">
                        Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showingContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }} />
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button className='contact-remove' onClick={() => onDeleteContact(contact)}>
                                Remove
                        </button>
                        </li>
                    ))}
                </ol>
            </div>

        )
    }
}

export default ListContacts