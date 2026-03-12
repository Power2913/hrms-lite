import axios from "axios";

const API_BASE = "https://hrms-lite-production-9a91.up.railway.app/api/employees";

export const getEmployees = () =>
  axios.get(`${API_BASE}?format=json`);

export const addEmployee = (data: any) =>
  axios.post(API_BASE, data);

export const updateEmployee = (id: number, data: any) =>
  axios.put(`${API_BASE}/${id}`, data);

export const deleteEmployee = (id: number) =>
  axios.delete(`${API_BASE}/delete/${id}`);