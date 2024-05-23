import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full bg-gray-800 text-white w-64 fixed flex flex-col">
      <div className="p-4 text-lg font-semibold border-b border-gray-700">Contact Manager</div>
      <nav className="flex flex-col p-4">
       
        <Link to="/contacts" className="mb-2 p-2 hover:bg-gray-700 rounded">
          Contacts
        </Link>
        <Link to="/dashboard" className="mb-2 p-2 hover:bg-gray-700 rounded">
          Chart and Maps
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
