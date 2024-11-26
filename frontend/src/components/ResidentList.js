import React from 'react';

const ResidentList = ({ residents, onDelete, onEdit }) => {
  return (
    <div>
      <h1>Residents</h1>
      <ul>
        {residents.map((resident) => (
          <li key={resident.id}>
            {resident.name} - {resident.email} - {resident.street} - {resident.number}
            <button onClick={() => onEdit(resident)}>Edit</button>
            <button onClick={() => onDelete(resident.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResidentList;
