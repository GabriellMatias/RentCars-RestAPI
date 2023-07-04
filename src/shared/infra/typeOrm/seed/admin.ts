import { hash } from 'bcryptjs'
import { v4 } from 'uuid'
import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')

  const passwordHash = await hash('admin', 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar)
    values('${v4()}', 'admin', 'admin@rentX.com.br', '${passwordHash}', true, now(), 'xxxxxx', 'avatarUrl')`,
  )

  await connection.close()
}

create()
  .then(() => console.log('Seed user admin created'))
  .catch((err) => console.log(err))
