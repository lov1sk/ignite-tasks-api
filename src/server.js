import http from "node:http";
import { jsonMiddleware } from "./middlewares/json.js";
import { appRoutes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  await jsonMiddleware(req, res);

  const route = appRoutes.find(
    (route) => route.method === req.method && route.path.test(req.url)
  );

  // Caso não seja nenhuma rota conhecida, retorna erro para o client
  if (!route) {
    return res.writeHead(404).end();
  }

  const routeParams = req.url.match(route.path);
  const { query, ...params } = routeParams.groups;

  req.params = params;
  req.query = query ? extractQueryParams(query) : {};

  route.controller(req, res);
});

server.listen(3434, () =>
  console.log('🚀Server running on "http://localhost:3434/"🚀')
);
