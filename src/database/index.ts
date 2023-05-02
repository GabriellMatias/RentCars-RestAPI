import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (host = 'database_ignite'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentX_test'
          : defaultOptions.database,
    }),
  )
}

// import { DataSource } from 'typeorm'

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'docker',
//   password: 'ignite',
//   database: 'rentX', // o nome correto do database é 'rentx'
// })

// // Deve exportar essa função
// export function createConnection(
//   host = 'database_ignite',
// ): Promise<DataSource> {
//   return AppDataSource.setOptions({ host }).initialize()
// }

// export default AppDataSource
