import { hash } from 'bcrypt';
import { getConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
    const connection = await createConnection('localhost');

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
        `
            INSERT INTO USERS
            (id, name, password, email, driver_license, "isAdmin", created_at, updated_at)
            VALUES
            ('${id}', 'Admin', '${password}', 'adm@adm', 'XXXX', true, 'now()', 'now()')
        `
    );
    await connection.close();
}

create().then(() => console.log('Usuário administrador cadastrado com sucesso'));