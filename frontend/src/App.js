import React, { useState, useEffect } from 'react';
import ResidentList from './components/ResidentList';
import CreateResident from './components/CreateResident';
import SearchResident from './components/SearchResident';
import { getResidents, deleteResident } from './api';

const App = () => {
  const [residents, setResidents] = useState([]);
  const [residentToEdit, setResidentToEdit] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      const data = await getResidents();
      setResidents(data);
    };
    fetchResidents();
  }, []);

  const addResident = (newResident) => {
    setResidents([...residents, newResident]);
  };

  const editResident = (updatedResident) => {
    setResidents(residents.map((resident) => (resident.id === updatedResident.id ? updatedResident : resident)));
    setResidentToEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteResident(id);
      setResidents(residents.filter((resident) => resident.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (resident) => {
    setResidentToEdit(resident);
  };

  return (
    <div>
      <h1>Resident Management</h1>
      <SearchResident setResidents={setResidents} />
      <CreateResident addResident={addResident} editResident={editResident} residentToEdit={residentToEdit} />
      <ResidentList residents={residents} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;


