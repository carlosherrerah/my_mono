import React, { useState, useEffect } from 'react';
import { searchResidentByEmail } from '../api';

const SearchResident = ({ setResidents }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residents = await searchResidentByEmail(email);
        setResidents(residents);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResidents();
  }, [email, setResidents]);

  return (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Search by Email"
    />
  );

};

export default SearchResident;
