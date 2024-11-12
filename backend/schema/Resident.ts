import { allowAll } from '@keystone-6/core/access';
import { text } from '@keystone-6/core/fields';

export const resident = {
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    street: text({ validation: { isRequired: true } }),
    number: text({ validation: { isRequired: true } }),
  },
};
