import { ADD_POST, GET_POST, REMOVE_POST } from "./types";
import * as uuid from "uuid";

// Get Posts
export const getPosts = () => dispatch => {
  fetch("https://ganesan-cv-reactjs.netlify.com/.netlify/functions/cv-all")
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: GET_POST,
        payload: data
      })
    );
};

// Add Posts
export const addPost = post => dispatch => {
  const { body, title } = post;

  const newPost = {
    id: uuid.v4(),
    title,
    body
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: ADD_POST,
        payload: data
      })
    );
};

// Deleteing an Item
export const deleteItem = id => dispatch => {
  dispatch({
    type: REMOVE_POST,
    payload: id
  });
};
