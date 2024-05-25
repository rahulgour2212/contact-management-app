
// ContactDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );

  if (!contact) {
    return <div className="container mx-auto p-4">Contact not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Contact Details</h1>
      <div className="mb-4">
        <strong>Name:</strong> {contact.name}
      </div>
      <div className="mb-4">
        <strong>Phone:</strong> {contact.phone}
      </div>
      <div className="mb-4">
        <strong>Status:</strong> {contact.status}
      </div>
    </div>
  );
};

export default ContactDetail;
