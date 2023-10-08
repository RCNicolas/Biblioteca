import { getOne as getOneCategory } from "./categories.js";
import { getOne as getOneAuthor } from "./author.js";
import  { getOne as getOneEditorial } from "./editorial.js";
import  { getOne as getOneState } from "./stateBook.js";
import { env } from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};

const validarExtructura = (data = {}) => {
  if (data.constructor.name !== "Object" || Object.keys(data).length == 0)
    return { status: 400, message: `Usuario envie los datos` };
  const {
    title = null,
    dateLoan = null,
    authorId = null,
    categoryId = null,
    editorialId = null,
    isbn = null,
    pagination = null,
    stateBookId = null,
  } = data;
  let date = new Date(dateLoan);
  if (!(date && date.getFullYear() <= 2040))
    return {
      status: 400,
      message: `La dateLoan '${dateLoan}' no cumple con el formato`,
    };

  if (typeof authorId !== "number")
    return {
      status: 400,
      message: `El authorId '${authorId}' no cumple con el formato`,
    };
  if (typeof categoryId !== "number")
    return {
      status: 400,
      message: `El categoryId '${categoryId}' no cumple con el formato`,
    };
  if (typeof editorialId !== "number")
    return {
      status: 400,
      message: `El editorialId '${editorialId}' no cumple con el formato`,
    };
  if (typeof title !== "string")
    return {
      status: 400,
      message: `El title '${title}' no cumple con el formato`,
    };
  if (typeof isbn !== "string")
    return {
      status: 400,
      message: `El isbn '${isbn}' no cumple con el formato`,
    };
  if (typeof pagination !== "number")
    return {
      status: 400,
      message: `El pagination '${pagination}' no cumple con el formato`,
    };
  if (typeof stateBookId !== "number")
    return {
      status: 400,
      message: `El stateBookId '${stateBookId}' no cumple con el formato`,
    };
  return data;
};

const validarDataBasic = (data = {}) => {
  if (data.constructor.name !== "Object" || Object.keys(data).length == 0)
    return { status: 400, message: `Usuario envie los datos` };
  const {
    title = null,
    dateLoan = null,
    isbn = null,
    pagination = null,
  } = data;
  let date = new Date(dateLoan);
  if (!(date && date.getFullYear() <= 2040))
    return {
      status: 400,
      message: `La dateLoan '${dateLoan}' no cumple con el formato`,
    };
  if (typeof title !== "string")
    return {
      status: 400,
      message: `El title '${title}' no cumple con el formato`,
    };
  if (typeof isbn !== "string")
    return {
      status: 400,
      message: `El isbn '${isbn}' no cumple con el formato`,
    };
  if (typeof pagination !== "number")
    return {
      status: 400,
      message: `El pagination '${pagination}' no cumple con el formato`,
    };
  return data;
};
export const getAll = async () => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/books`, config)).json();
  return res;
};
export const getOne = async (id) => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/books/${id}`, config)).json();
  return res;
};
export const getRelationships = async () => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/books`, config)).json();
  res = await Promise.all(
    res.map(async (data, id) => {
      let { categoryId: catId, authorId: autId, stateBookId: staId, editorialId: editId} = data;
      let cat = await getOneCategory(catId);
      let aut = await getOneAuthor(autId);
      let state = await getOneState(staId);
      let edit = await getOneEditorial(editId)

      data.stateBookId = state;
      data.editorialId = edit;
      data.categoryId = cat;
      data.authorId = aut;
      return data;
    })
  );

  return res;
};

export const post = async (obj = {}) => {
  obj = validarExtructura(obj);
  if (obj.status) return obj;

  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/books`, config)).json();
  return res;
};

// export const deleteOne = async (id) => {
//   if (typeof id !== "number")
//     return {
//       status: 400,
//       message: `El datos '${id}' no cumple con el formato`,
//     };
//   config.method = "DELETE";
//   let res = await (await fetch(`${uri}/books/${id}`, config)).json();
//   return res;
// };
export const deleteOne = async (id) => {
  config.method = "DELETE";
  // config.body = "";
  let res = await (await fetch(`${uri}/books/${id}`, config)).json();
  return res;
};
export const putOne = async (obj = {}) => {
  let all = undefined;
  const { id, limit = "1.0.0" } = obj;
  if (typeof id !== "number")
    return { status: 400, message: `El id '${id}' no cumple con el formato` };
  if (limit == "1.0.0") {
    obj = validarExtructura(obj);
    if (obj.status) return obj;
  }
  if (limit == "2.0.0") {
    obj = validarDataBasic(obj);
    if (obj.status) return obj;
    all = await getOne(id);
  }
  const { limit: lin, ...objUpdate } = obj;
  obj = { ...all, ...objUpdate };

  config.method = "PUT";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/books/${id}`, config)).json();
  return res;
};

// console.log( await deleteOne(5));
// console.log(await getOne(1));

// console.log(await getRelationships());
// console.log(await post({
//     title:"El olor del miedo",
//     dateLoan: "2023-08-30",
//     authorId:1,
//     categoryId:1,
//     editorialId:1,
//     isbn:"111411441",
//     pagination: 44578,
//     stateBookId:1
// }));

console.log(await getRelationships());

// console.log(await getAll());

// console.log(await putOne({id: 1, limit:"2.0.0", title: "Miguel", isbn: "456", pagination:700}));
