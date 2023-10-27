export const appRoutes = [
  {
    method: "GET",
    path: "/tasks",
    controller(req, res) {
      return res.writeHead(200).end("Hello Challenge");
    },
  },
  {
    method: "POST",
    path: "/tasks",
    controller(req, res) {},
  },
  {
    method: "PUT",
    path: "/tasks/:id",
    controller(req, res) {},
  },
  {
    method: "DELETE",
    path: "/tasks/:id",
    controller(req, res) {},
  },
  {
    method: "PATCH",
    path: "/tasks/:id/complete",
    controller(req, res) {},
  },
];
