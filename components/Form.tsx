"use client";

import { create } from "@/app/action";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(create, null);

  console.log(state);

  return (
    <form
      action={async (formData: FormData) => {
        formAction(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <input
        type="text"
        name="name"
        className="w-full h-10 border border-blue-500"
      />
      <button type="submit" className="bg-blue-500 w-full h-full">
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
