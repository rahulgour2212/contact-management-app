import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addContact, updateContact } from '../features/contactsSlice';
import { RootState } from '../app/store';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(''); // Default status

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const contact = useSelector((state: RootState) =>
    id ? state.contacts.contacts.find(contact => contact.id === id) : null
  );

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setStatus(contact.status); // Set the status from the contact
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateContact({ id, name, phone, status }));
    } else {
      dispatch(addContact({ id: Math.random().toString(36).substr(2, 9), name, phone, status }));
    }
    navigate('/contacts');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">{id ? 'Edit Contact' : 'Add Contact'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <span className="block text-gray-700">Status</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="active"
                checked={status === 'active'}
                onChange={(e) => setStatus(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={status === 'inactive'}
                onChange={(e) => setStatus(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">{id ? 'Update' : 'Add'} Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
