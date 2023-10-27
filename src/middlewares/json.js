export async function jsonMiddleware(req, res) {
  const reqPieces = [];

  for await (const chunk of req) {
    reqPieces.push(chunk);
  }

  try {
    const fullRequesition = Buffer.concat(reqPieces).toString();
    req.body = JSON.parse(fullRequesition);
  } catch {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");
}
