import axios from "axios";
import { BookCardRequest, BookCardResponse } from "../models/book-card";

const _axios = axios.create({
  baseURL: "https://698773cb8bacd1d773ed6728.mockapi.io/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiService = {
  GetBookCards: () => _axios.get<BookCardResponse[]>("/books"),
  CreateBookCard: (payload: BookCardRequest) =>
    _axios.post<BookCardResponse>("/books", payload),
  DeleteBookCard: (id: string) =>
    _axios.delete<BookCardResponse>(`/books/${id}`),
};
