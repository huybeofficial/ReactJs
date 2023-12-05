import axios from "axios";
const BASE_URL = "https://65643f1eceac41c0761db58f.mockapi.io/post";

function GetAllPostAPI() {
  return axios.get(BASE_URL);
}
function AddPostAPI(title, content) {
  return axios.post(BASE_URL, { title, content });
}
function UpdatePostAPIbyId(id, title, content) {
  return axios.put(BASE_URL.concat(`/${id}`), { title, content });
}
function DeletePostAPIbyId(id) {
  return axios.delete(BASE_URL.concat(`/${id}`));
}

export { GetAllPostAPI, AddPostAPI, UpdatePostAPIbyId, DeletePostAPIbyId };
