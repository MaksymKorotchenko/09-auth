import { User } from '@/types/user';
import { nextServer } from './api';
import { Note, NoteTag } from '@/types/note';
import axios from 'axios';

export type RegisterRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

interface NotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: string) => {
  const res = await nextServer.put<User>('/auth/me', payload);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const fetchNotes = async (
  searchNoteName: string,
  page: number,
  perPage: number,
  tag?: string
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>('/notes/', {
    params: {
      search: searchNoteName,
      page,
      perPage,
      ...(tag && tag === 'All' ? {} : { tag }),
    },
  });
  return res.data;
};

export const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const createNote = async (newNoteParams: NewNote): Promise<Note> => {
  const res = await axios.post<Note>('/notes', newNoteParams);
  return res.data;
};
