// ContactList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import { deleteContact } from '../features/contactsSlice';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Contact List</h1>
      <Link to="/add" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Add Contact</Link>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className="mb-2 border p-2">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">{contact.name}</h2>
              </div>
              <div>
                <Link to={`/edit/${contact.id}`} className="bg-green-500 text-white p-2 rounded mr-2">Edit</Link>
                <Link to={`/contact/${contact.id}`} className="bg-blue-500 text-white p-2 rounded mr-2">View Details</Link>
                <button onClick={() => handleDelete(contact.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
