const { json } = require("express");
const fetch = require("node-fetch");


/**
 * Realizar consumo de api
 */
exports.findBooks = async () => {
  const response = await fetch("http://localhost:4040/api/book", {
    method: "get",
  });
  const json = response.json();

  return json;
};
exports.findBookId = async (id) => {
  const response = await fetch(`http://localhost:4040/api/book/${id}`, {
    method: "get",
  });
  const json = response.json();

  return json;
};

exports.createBook = async (data) => {
  const response = await fetch(`http://localhost:4040/api/book/`, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    return response;
  }
  throw new Error("Something went wrong");
};

exports.updateBooksById = async (id, data) => {
  const response = await fetch(`http://localhost:4040/api/book/upload/${id}`, {
    method: "POST",
    body: data,
    headers: data.getHeaders(),
  });
  
  if (response.ok) {
    return response;
  }
  throw new Error("Something went wrong");
};
