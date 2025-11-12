"use client";
import { useState } from "react";
import css from "./Notes.client.module.css";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, NoteListData } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery<NoteListData>({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () =>
      fetchNotes(debouncedSearch, page, tag === "all" ? undefined : tag),
    // placeholderData: (previousData) => previousData,
  });
  const notes = data?.notes ?? [];
  const total_pages = data?.totalPages ?? 0;

  const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={onSearch} />
        {total_pages > 1 && (
          <Pagination totalPages={total_pages} page={page} setPage={setPage} />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading...</p>}
      {notes.length > 0 && <NoteList notes={notes || []} />}
      {notes.length === 0 && !isLoading && <p>No notes found</p>}
    </div>
  );
};

export default NotesClient;
