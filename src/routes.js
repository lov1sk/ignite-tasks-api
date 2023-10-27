import { randomUUID } from "crypto";
import { Database } from "../database/database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();
export const appRoutes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    controller(req, res) {
      const { search } = req.query;
      const tasksSaved = database.list("tasks");

      if (search) {
        const tasks = database.list("tasks", {
          title: search,
          description: search,
        });
        return res.end(JSON.stringify(tasks));
      }

      if (!tasksSaved) {
        return res.writeHead(400).end("Nothing has found");
      }

      return res.writeHead(200).end(JSON.stringify(tasksSaved));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    controller(req, res) {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.writeHead(400).end("Invalid Arguments");
      }
      database.create("tasks", {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      });

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    controller(req, res) {
      const { id } = req.params;
      const { title, description } = req.body;
      try {
        database.update("tasks", id, {
          title,
          description,
          updated_at: new Date(),
        });
        return res.writeHead(200).end();
      } catch (error) {
        return res.writeHead(400).end(error.message);
      }
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    controller(req, res) {
      const { id } = req.params;

      try {
        database.delete("tasks", id);
        res.writeHead(204).end();
      } catch (error) {
        res.writeHead(400).end(error.message);
      }
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    controller(req, res) {
      const { id } = req.params;
      try {
        database.update("tasks", id, { complete: true });
        return res.writeHead(204).end();
      } catch (error) {
        res.writeHead(400).end(error.message);
      }
    },
  },
];
