import { env } from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;

const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};
// Obtener datos
export const getOne = async (id) => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/usuario/${id}`, config)).json();
  return res;
};
export const getAll = async () => {
  config.method = "GET";
  //config.body = "";
  let res = await (await fetch(`${uri}/usuario`, config)).json();
  return res;
};
// Enviar datos
export const post = async (obj) => {
  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/usuario`, config)).json();
  return res;
};
// Eliminar un dato
export const deleteOne = async (id) => {
  if (typeof id !== `number`)
    return {
      status: 400,
      menssage: `El dato '${id}' no cumple con el formato. `,
    };

  config.method = "DELETE";
  let res = await (await fetch(`${uri}/usuario/${id}`, config)).json();
  return res;
};
// Actualizar un dato
export const putOne = async (obj={}) => {
  if (!obj.id)return {status: 400,menssage: `Usuario mande los datos -_- `,};
    
  config.method = "PUT";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/usuario`, config)).json();
  return res;
};
