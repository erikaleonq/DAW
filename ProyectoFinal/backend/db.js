const {Pool} = require('pg')
    const pool = new Pool ({
        host: 'db',
        port: 5432,
        user: 'user1',
        password: 'password',
        database: 'db1'
    })

    modele.exports = pool
    