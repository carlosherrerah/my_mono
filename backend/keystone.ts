import { config } from '@keystone-6/core'
import { lists } from './schema/Schema'
import cors from 'cors'

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./db/vivehub.db',
  },
  server: {
    cors: {
      origin: `http://localhost:3001`,
      credentials: true,
    },
    port: 3000,
    extendExpressApp: (app) => {
      app.use(cors({
        origin: `http://localhost:3001`,
        credentials: true,
      }));
    },
  },
  lists,
  //session,
});

// 8081
