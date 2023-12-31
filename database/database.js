import fs from "fs/promises";

const dbPath = new URL("./db.json", import.meta.url);

export class Database {
  #database = {};

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#database));
  }
  constructor() {
    fs.readFile(dbPath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#database = {};
      });
  }
  create(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [data];
      this.#persist();
      return;
    }

    this.#database[table].push(data);
    this.#persist();
    return;
  }
  list(table, search) {
    let data = this.#database[table] ?? [];
    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value);
        });
      });
    }
    const savedData = this.#database[table];
    return savedData;
  }
  update(table, id, data) {
    /**
     * Se cair neste if, quer dizer que o parametro vai ser completado
     */
    //Validação patch completa
    const dataIndex = this.#database[table].findIndex((data) => data.id === id);
    if (dataIndex == -1) {
      throw new Error("Cannot find the specified resource");
    }

    if (data.complete) {
      if (this.#database[table][dataIndex].completed_at) {
        this.#database[table].splice(dataIndex, 1, {
          ...this.#database[table][dataIndex],
          completed_at: false,
          updated_at: new Date(),
        });
        this.#persist();
        return;
      }

      this.#database[table].splice(dataIndex, 1, {
        ...this.#database[table][dataIndex],
        completed_at: true,
        updated_at: new Date(),
      });
      this.#persist();
      return;
    }

    /**
     * Se cair aqui, a task sera modificada
     */

    this.#database[table].splice(dataIndex, 1, {
      ...this.#database[table][dataIndex],
      title: data.title,
      description: data.description,
      updated_at: new Date(),
    });
    this.#persist();
    return;
  }
  // Validação ok
  delete(table, id) {
    const dataIndex = this.#database[table].findIndex((data) => data.id === id);
    if (dataIndex == -1) {
      throw new Error("Cannot find the specified resource");
    }

    this.#database[table].splice(dataIndex, 1);
    this.#persist();
    return;
  }
}
