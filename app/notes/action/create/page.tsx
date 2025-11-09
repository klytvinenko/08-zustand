import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "New note",
  description: "Creating and storing notes",
  openGraph: {
    title: "Note",
    description:"Creating note",
    url: "https://notehub.com/features",
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