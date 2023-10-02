import { env } from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;

const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};
// !Obtener datos
export const getAll = async () => {
  config.method = "GET";
  //config.body = "";
  let res = await (await fetch(`${uri}/libro`, config)).json();
  return res;
};
// !Enviar datos
export const post = async (obj) => {
  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/libro`, config)).json();
  return res;
};
// !Eliminar un dato
export const deleteOne = async (id) => {
  if (typeof id !== `number`)
    return {
      status: 400,
      menssage: `El dato '${id}' no cumple con el formato. `,
    };

  config.method = "DELETE";
  let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
  return res;
};
// !Actualizar un dato
export const putOne = async (obj={}) => {
    if (!obj.id)
    return {
      status: 400,
      menssage: `Usuario mande los datos -_- `,
    };
    const {
    id,
    autorId,
    categoriaId,
    editorialId,
    titulo,
    fechaLanzamiento,
    isbn,
    numPaginacion,
    estadoId,
  } = obj;

  let date = new Date(fechaLanzamiento);

  if (!(date && date.getFullYear() <= 2040))
    return {
      status: 400,
      menssage: `El dato '${fechaLanzamiento}' no cumple con el formato. `,
    };

  if (typeof id !== `number`)
    return {
      status: 400,
      menssage: `El dato '${id}' no cumple con el formato. `,
    };
  if (typeof autorId !== `number`)
    return {
      status: 400,
      menssage: `El dato '${autorId}' no cumple con el formato. `,
    };
  if (typeof categoriaId !== `number`)
    return {
      status: 400,
      menssage: `El dato '${categoriaId}' no cumple con el formato. `,
    };
  if (typeof editorialId !== `number`)
    return {
      status: 400,
      menssage: `El dato '${editorialId}' no cumple con el formato. `,
    };
  if (typeof titulo !== `string`)
    return {
      status: 400,
      menssage: `El dato '${titulo}' no cumple con el formato. `,
    };
  if (typeof isbn !== `string`)
    return {
      status: 400,
      menssage: `El dato '${isbn}' no cumple con el formato. `,
    };
  if (typeof numPaginacion !== `number`)
    return {
      status: 400,
      menssage: `El dato '${numPaginacion}' no cumple con el formato. `,
    };
  if (typeof estadoId !== `number`)
    return {
      status: 400,
      menssage: `El dato '${estadoId}' no cumple con el formato. `,
    };

  config.method = "PUT";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/libro`, config)).json();
  return res;
};

console.log(putOne({id: "111"}));