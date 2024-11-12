import { config } from '@keystone-6/core'
import { lists } from './schema/Schema'

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./db/vivehub.db',
  },
  lists,
  //session,
});
