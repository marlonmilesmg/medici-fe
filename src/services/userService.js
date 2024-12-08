import axios from "axios";

const BASE_URL = "http://user-registration-backend.default.svc.cluster.local:8080/api/users";

export const createUser = (user) => axios.post(`${BASE_URL}`, user);

export const getUser = (id) => axios.get(`${BASE_URL}/${id}`);

export const updateUser = (id, user) => axios.put(`${BASE_URL}/${id}`, user);

export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);
