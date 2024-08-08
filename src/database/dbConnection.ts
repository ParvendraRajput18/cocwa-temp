
import { DataSource } from 'typeorm';
import { Thesi } from "../entity/thesiEntity"; 

const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgresql',
  database: 'cocwa-temp',
  entities: [Thesi],
  synchronize: true,  
  logging:true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the PostgreSQL database.');
  })
  .catch((err) => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });

export default AppDataSource;