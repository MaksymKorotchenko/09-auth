import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note, NotesResponse } from '@/types/note';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNoteById = async (noteId: Note['id']) => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchServerNotes = async (
  searchNoteName: string,
  page: number,
  perPage: number,
  tag?: string
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<NotesResponse>('notes/', {
    params: {
      search: searchNoteName,
      page,
      perPage,
      ...(tag && tag === 'All' ? {} : { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
