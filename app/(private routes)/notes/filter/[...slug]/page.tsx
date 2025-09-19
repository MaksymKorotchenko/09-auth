import { fetchServerNotes } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Notes from './Notes.client';

type Params = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `${tag} notes`,
    description: `Page with notes filtered by ${tag} caategory`,
    openGraph: {
      title: `${tag} notes`,
      description: `Page with notes filtered by ${tag} caategory`,
      url: `https://08-zustand-sandy-eight.vercel.app/notes/filter/${tag}`,
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

export default async function App({ params }: Params) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, perPage: 12, tag }],
    queryFn: () => fetchServerNotes('', 1, 12, tag),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes category={tag} />
      </HydrationBoundary>
    </div>
  );
}
