import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Creating new note",
  description: "Page for creating and storing new notes",
  openGraph: {
    title: "Note",
    description:"Page for creating and storing new notes",
    url: "https://notehub.com/notes/action/create",
    images: [ {
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
  }]
  },
};

const CreateNote = () => {
  return(
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {/* NoteForm component */}
    <NoteForm />
      </div>
    </main>
  );
};
 export default CreateNote;