import axios from "axios";

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=madmoonismad';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POSTS = 'create_posts';
export const FETCH_POST = 'create_post';
export const DELETE_POST = 'DELETE_post';

export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPosts(values, callback){
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)
                  .then(()=>callback());

  return {
    type: CREATE_POSTS,
    payload: request
  };
}

export function fetchPost(id){
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback){
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
                  .then(()=>callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}