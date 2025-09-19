import { fetchServerNoteById } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import NoteDetails from './NoteDetails.client';

type NoteAboutProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteAboutProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerNoteById(id);

  return {
    title: `${note.title}`,
    description: `${note.content}`,
    openGraph: {
      title: `${note.title}`,
      description: `${note.content} note's description`,
      url: `https://08-zustand-sandy-eight.vercel.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 650,
          alt: 'NoteHub page image',
        },
      ],
    },
  };
}

export default async function NoteAbout({ params }: NoteAboutProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails />
      </HydrationBoundary>
    </div>
  );
}
