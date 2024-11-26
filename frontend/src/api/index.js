import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/graphql', // URL del backend de Keystone
});

export const getResidents = async () => {
  const response = await api.post('', {
    query: `
      query {
        residents {
          id
          name
          email
          street
          number
        }
      }
    `,
  });
  return response.data.data.residents;
};

export const getResidentById = async (id) => {
  const response = await api.post('', {
    query: `
      query GetResident($id: ID!) {
        resident(where: { id: $id }) {
          id
          name
          email
          street
          number
        }
      }
    `,
    variables: { id },
  });
  return response.data.data.resident;
};

export const createResident = async (resident) => {
  const response = await api.post('', {
    query: `
      mutation CreateResident($data: ResidentCreateInput!) {
        createResident(data: $data) {
          id
          name
          email
          street
          number
        }
      }
    `,
    variables: { data: resident },
  });
  return response.data.data.createResident;
};

export const updateResident = async (id, resident) => {
  const { id: _, __typename, ...data } = resident; // Excluir el campo `__typename` del objeto `data`
  const response = await api.post('', {
    query: `
      mutation UpdateResident($id: ID!, $data: ResidentUpdateInput!) {
        updateResident(where: { id: $id }, data: $data) {
          id
          name
          email
          street
          number
        }
      }
    `,
    variables: { id, data },
  });
  return response.data.data.updateResident;
};

export const deleteResident = async (id) => {
  const response = await api.post('', {
    query: `
      mutation DeleteResident($id: ID!) {
        deleteResident(where: { id: $id }) {
          id
        }
      }
    `,
    variables: { id },
  });
  return response.data.data.deleteResident;
};

export const searchResidentByEmail = async (email) => {
  if (!email) {
    return getResidents(); // Si el email está vacío, obtener todos los residentes
  }
  const response = await api.post('', {
    query: `
      query SearchResident($email: String!) {
        residents(where: { email: { contains: $email } }) {
          id
          name
          email
          street
          number
        }
      }
    `,
    variables: { email },
  });
  return response.data.data.residents;
};