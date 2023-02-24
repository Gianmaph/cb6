const BASE_URL = "https://jsonplaceholder.typicode.com/users";

//TYPE -> categories, products

export const qS = (element) => {
  return document.querySelector(element);
};

export const cE = (element) => {
  return document.createElement(element);
};

export const GET = () => fetch(BASE_URL).then((res) => res.json());
