import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_RESIDENT = gql`
  mutation CreateResident($data: ResidentCreateInput!) {
    createResident(data: $data) {
      id
      name
    }
  }
`;

const AddResident = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    number: '',
  });

  const [createResident, { data, loading, error }] = useMutation(CREATE_RESIDENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResident({ variables: { data: formData } });
      alert('Resident created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Street"
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
      />
      <input
        type="text"
        placeholder="Number"
        value={formData.number}
        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Resident created with ID: {data.createResident.id}</p>}
    </form>
  );
};

export default AddResident;
