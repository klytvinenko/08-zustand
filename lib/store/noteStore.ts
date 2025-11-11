import { NewNote } from "@/types/note";
import { create } from "zustand";

type NoteDraftStore = {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
};
const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

const useNoteDraftStore = create<NoteDraftStore>()((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));

export default useNoteDraftStore;
