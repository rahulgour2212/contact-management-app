import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { deleteContact } from '../features/contactsSlice';
import { Link } from 'react-router-dom';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Contact List</h1>
      <Link to="/add" className="bg-blue-500 text-white p-2 rounded">Add Contact</Link>
      <ul className="mt-4">
        {contacts.map(contact => (
          <li key={contact.id} className="flex justify-between items-center p-2 border-b">
            <span>{contact.name}</span>
            <div>
              <Link to={`/edit/${contact.id}`} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</Link>
              <button onClick={() => handleDelete(contact.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
