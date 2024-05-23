import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import ContactForm from './pages/ContactForm';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={
      <Layout><Home /></Layout>} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/contacts"
          element={
            <Layout>
              <ContactList />
            </Layout>
          }
        />

        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />

      </Routes>
    </Router>
  );
};

export default App;
