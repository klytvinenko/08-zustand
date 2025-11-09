import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Note details",
  description: "Page for previewing notes",
};

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id)
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id}/>
    </HydrationBoundary>
  )
};

export default NotePreview;
