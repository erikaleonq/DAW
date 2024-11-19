import pg from "pg";
const { Client } = pg;

class Db {
  #client;
  static conn;
  constructor() {
    const db_options = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST, //host
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };
    this.#client = new Client(db_options);
    console.log("db client CREATEd");
  }

  static getInstance() {
    if (!Db.conn) {
      Db.conn = new Db();
    }
    return Db.conn;
  }

  get client() {
    return this.#client;
  }

  query_ = async (query, values = []) => {
    try {
      await this.#client.connect();
      console.log("Db.js:",query, values);
      const resultados = await this.#client.query(query, values);
      return resultados;
    } catch (err) {
      throw err;
    } finally {
      await this.#client.end();
    }
  };
}

export { Db };