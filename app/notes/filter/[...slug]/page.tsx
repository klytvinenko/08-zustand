import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
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

// import NotesClient from "./Notes.client";

// interface FilterPageProps {
//   params: Promise<{ slug: string[] }>;

// }

// const FilterPage = async ({ params }: FilterPageProps) => {
//   const { slug } = await params;
//   const tag = slug?.[0]; //|| "all"

//   // const responce = await fetchNotes("", 1, tag === "all" ? undefined : tag);

//   return (
//     <div>
//       <NotesClient key={tag ?? "all"} tag={tag} />
//     </div>
//   );
// };

// export default FilterPage;
