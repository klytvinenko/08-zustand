"use client";
import css from "./NoteForm.module.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormValues {
  title: string;
  content: string;
  tag: string;
}
const initialValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteForm = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
  const [form, setForm] = useState<FormValues>(initialValues);
  const router = useRouter();

  // const handleSubmit = (
  //   values: FormValues,
  //   actions: FormikHelpers<FormValues>
  // ) => {
  //   console.log(values);
  //   mutate(values);
  //   actions.resetForm();
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || form.title.length < 3) {
      return;
    }

   mutate(form);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    setForm(initialValues);
    console.log(form);

   
  };
  const handleCancel = () => {
    router.push("/notes");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={form.title}  
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={form.content}  
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={form.tag}  
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
};
export default NoteForm;
