import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_RESIDENT = gql`
  mutation CreateResident($data: ResidentCreateInput!) {
    createResident(data: $data) {
      id
      name
      email
      street
      number
    }
  }
`;

const UPDATE_RESIDENT = gql`
  mutation UpdateResident($id: ID!, $data: ResidentUpdateInput!) {
    updateResident(where: { id: $id }, data: $data) {
      id
      name
      email
      street
      number
    }
  }
`;

const CreateResident = ({ addResident, editResident, residentToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    number: '',
  });

  useEffect(() => {
    if (residentToEdit) {
      setFormData(residentToEdit);
    }
  }, [residentToEdit]);

  const [createResident] = useMutation(CREATE_RESIDENT);
  const [updateResident] = useMutation(UPDATE_RESIDENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (residentToEdit) {
        const { id, __typename, ...data } = formData; // Excluir el campo `id` y `__typename` del objeto `data`
        const { data: updatedData } = await updateResident({ variables: { id: residentToEdit.id, data } });
        editResident(updatedData.updateResident);
      } else {
        const { data: createdData } = await createResident({ variables: { data: formData } });
        addResident(createdData.createResident);
      }
      setFormData({ name: '', email: '', street: '', number: '' }); // Clear form
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" required />
      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" required />
      <input type="text" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} placeholder="Street" required />
      <input type="text" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="Number" required />
      <button type="submit">{residentToEdit ? 'Update Resident' : 'Create Resident'}</button>
    </form>
  );
};

export default CreateResident;
