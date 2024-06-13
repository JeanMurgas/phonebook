import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ContactForm = ({ fetchContacts, currentContact, setCurrentContact
}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [lastname, setLastName] = useState('');
    // Efecto para actualizar el formulario cuando se selecciona un contacto para editar
    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setPhone(currentContact.phone);
            setAge(currentContact.age);
            setLastName(currentContact.lastname);
        }
    }, [currentContact]);
    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentContact) {
                // Actualizar contacto existente
                await
                    axios.patch(`http://localhost:3001/contacts/${currentContact._id}`, {
                        name, lastname, age ,phone
                    });
                setCurrentContact(null);
            } else {
                // Crear nuevo contacto
                await axios.post('http://localhost:3001/contacts', {
                    name,
                    phone, 
                    lastname, 
                    age
                });
            }
            fetchContacts();
            setName('');
            setPhone('');
            setAge('');
            setLastName('');
        } catch (error) {
            console.error('Error saving contact', error);
        }
    };
    return (
        <form className='main' onSubmit={handleSubmit}>
            <div className='inputs'>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) =>
                    setName(e.target.value)} required />
            </div>
            <div className='inputs'>
                <label>LastName</label>
                <input type="text" value={lastname} onChange={(e) =>
                    setLastName(e.target.value)} required />
            </div>
            <div className='inputs'>
                <label>Age</label>
                <input type="text" value={age} onChange={(e) =>
                    setAge(e.target.value)} required />
            </div>
            <div className='inputs'>
                <label>Phone</label>
                <input type="text" value={phone} onChange={(e) =>
                    setPhone(e.target.value)} required />
            </div>
            <button type="submit">{currentContact ? 'Update Contact' : 'Add Contact'}</button>
        </form>
    );
};
export default ContactForm;