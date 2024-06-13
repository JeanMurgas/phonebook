import React from 'react';
import axios from 'axios';
const ContactList = ({ contacts, fetchContacts, setCurrentContact }) => {
    // Manejar la eliminación de un contacto
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/contacts/${id}`);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact', error);
        }
    };
    return (
        <div className='lista'>
            <ul>
            {contacts.map(contact => (
                <li key={contact._id}>
                    {contact.name} - {contact.phone} - {contact.lastname} - {contact.age}
                    <button onClick={() =>
                        setCurrentContact(contact)}>Edit</button>
                    <button onClick={() =>
                        handleDelete(contact._id)}>Delete</button>
                </li>
            ))}
        </ul>
        </div>
    );
};
export default ContactList;