import { env } from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};

const validarExtructura = (data = {}) => {
  if (data.constructor.name !== "Object" || Object.keys(data).length == 0)
    return { status: 400, message: `Usuario envie los datos` };
  const { name = null, direction = null, phone = null } = data;

  if (typeof name !== "string")
    return {
      status: 400,
      message: `El name '${name}' no cumple con el formato`,
    };
  if (typeof direction !== "string")
    return {
      status: 400,
      message: `El direction '${apellido}' no cumple con el formato`,
    };
  if (typeof phone !== "string")
    return {
      status: 400,
      message: `La phone '${nacionality}' no cumple con el formato`,
    };
  return data;
};
export const post = async (obj = {}) => {
  obj = validarExtructura(obj);
  if (obj.status) return obj;

  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/editorial`, config)).json();
  return res;
};
export const getOne = async (id) => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/editorial/${id}`, config)).json();
  return res;
};
export const getAll = async () => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/editorial`, config)).json();
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
  let res = await (await fetch(`${uri}/editorial/${id}`, config)).json();
  return res;
};

// console.log(await post({
//     name:"Kevin",
//     direction:"Esteba",
//     phone:"Japones",
// }));

// console.log(deleteOne(1));
// console.log( await getOne(1));
// console.log(await getAll());
