import http from "node:http";
import { jsonMiddleware } from "./middlewares/json.js";
import { appRoutes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  await jsonMiddleware(req, res);

  const route = appRoutes.find(
    (route) => route.method === req.method && route.path === req.url
  );

  route.controller(req, res);
  res.end();
});

server.listen(3434, () =>
  console.log('🚀Server running on "http://localhost:3434/"🚀')
);
