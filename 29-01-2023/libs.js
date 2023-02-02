const BASE_URL = "https://api.escuelajs.co/api/v1/";

//TYPE -> categories, products

export const GET = (type) => fetch(BASE_URL + type).then((res) => res.json());

export const POST = (type, bodyObj) =>
  fetch(BASE_URL + type, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  }).then((res) => res.json());

export const PUT = (type, bodyObj, id) =>
  fetch(BASE_URL + type + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  }).then((res) => res.json());

export const DELETE = (type, id) =>
  fetch(BASE_URL + type + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
