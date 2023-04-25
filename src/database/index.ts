import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentX', // o nome correto do database é 'rentx'
})

// Deve exportar essa função
export function createConnection(
  host = 'database_ignite',
): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export default AppDataSource
