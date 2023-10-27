export function buildRoutePath(path) {
  /* regex que identifica todo tipo de parametro que 
  é enviado ao definir o endpoint, tudo que começar com :'parametro' */
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  /**
   * Depois tem uma regunda regex que substitui tudo o que foi definido de parametro
   * a ser recebido (ex: /users/:id) para uma regex que filtrara realmente o valor passado
   * (ex:/users/1acaskdfn-asdnashdsa)
   */
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-z0-9-_]+)"
  );

  /**É criado uma regex final que apenas recebera o valor provindo do route parameter
   * podendo ser aplicado depois metodos como test.
   */
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
