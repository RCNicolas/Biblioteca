import { env } from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};

const validarExtructura = (data = {}) => {
  if (data.constructor.name !== "Object" || Object.keys(data).length == 0)
    return { status: 400, message: `Usuario envie los datos` };
  const { nombre = null } = data;
  if (typeof nombre !== "string")
    return {
      status: 400,
      message: `El nombre '${nombre}' no cumple con el formato`,
    };
  return data;
};
export const getOne = async (id) => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/categories/${id}`, config)).json();
  return Object.keys(res).length > 0
    ? res
    : { status: 401, message: "La categoria no existe", id };
};
export const getAll = async () => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/categories`, config)).json();
  return res;
};
export const post = async (obj = {}) => {
  obj = validarExtructura(obj);
  if (obj.status) return obj;

  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/categories`, config)).json();
  return res;
};
export const deleteOne = async (id) => {
  if (typeof id !== "number")
    return {
      status: 400,
      message: `El datos '${id}' no cumple con el formato`,
    };
  config.method = "DELETE";
  // config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/categories/${id}`, config)).json();
  return res;
};
// console.log(post({nombre:"Drama"}));
// console.log(post({nombre:"Romance"}));
// console.log(post({nombre:"Terror"}));
// console.log(deleteOne(1));