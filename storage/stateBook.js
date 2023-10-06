import { env } from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};

const validarExtructura = (data = {}) => {
  if (data.constructor.name !== "Object" || Object.keys(data).length == 0)
    return { status: 400, message: `Usuario envie los datos` };
  const { name = null, description = null } = data;

  if (typeof name !== "string")
    return {
      status: 400,
      message: `El name '${name}' no cumple con el formato`,
    };
  if (typeof description !== "string")
    return {
      status: 400,
      message: `El description '${apellido}' no cumple con el formato`,
    };
  return data;
};
export const post = async (obj = {}) => {
  obj = validarExtructura(obj);
  if (obj.status) return obj;

  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/stateBook`, config)).json();
  return res;
};
export const getOne = async (id) => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/stateBook/${id}`, config)).json();
  return res;
};
export const getAll = async () => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/stateBook`, config)).json();
  return res;
};

// console.log(await post({
//     name:"Excelente",
//     description:"Libro en perfecto estado."
// }));
// console.log(await post({
//     name:"Santiago",
//     description:"Marquez"
// }));
// console.log(await post({
//     name:"Kevin",
//     description:"Esteba"
// }));
// console.log(await post({
//     name:"Cristian",
//     description:"Pardo"
// }));

// console.log( await getOne(1));
// console.log(await getAll());
