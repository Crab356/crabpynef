import axios from "axios";

export const api = axios.create({
  baseURL: "https://64f737c89d775408495352fb.mockapi.io/crab/noodle/",
  headers: { "Content-Type": "application/json" },
});
