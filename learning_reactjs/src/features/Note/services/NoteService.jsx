import axios from "axios";
const BASE_URL = "https://65719450d61ba6fcc012fde9.mockapi.io/note";

function GetAllNoteAPI() {
  return axios.get(BASE_URL);
}
function AddNoteAPI(title, content) {
  return axios.post(BASE_URL, { title, content });
}
function UpdateNoteAPIbyId(id, title, content) {
  return axios.put(BASE_URL.concat(`/${id}`), { title });
}
function DeleteNoteAPIbyId(id) {
  return axios.delete(BASE_URL.concat(`/${id}`));
}

export { GetAllNoteAPI, AddNoteAPI, UpdateNoteAPIbyId, DeleteNoteAPIbyId };
