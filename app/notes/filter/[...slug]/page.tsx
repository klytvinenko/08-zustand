import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({params}: FilterPageProps) : Promise<Metadata> => {
const {slug} = await params;
 const tag = slug?.[0];

 return {
  title: `Notehub - ${tag}`,
  description:` Notes filtered for tag - ${tag}`,
  openGraph: {
    title: `Notes:${tag}`,
    description:`Notes filtered for tag: ${tag}`,
    url: `https://notehub.com/notes/filter/${tag}`,
    siteName: 'Notehub',
    images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag,
        },
      ],
  }
 }

}

const FilterPage = async ({ params }: FilterPageProps) => {
  const { slug } = await params;
  const tag = slug?.[0]; //|| "all"

  // const responce = await fetchNotes("", 1, tag === "all" ? undefined : tag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag ?? "all", 1],
    queryFn: () => fetchNotes(tag ?? undefined, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? "all"} tag={tag} />
    </HydrationBoundary>
  );
};

export default FilterPage;
