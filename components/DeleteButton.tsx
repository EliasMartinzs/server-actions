"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-red-500" type="submit">
      {pending ? "Deleting ..." : "Delete"}
    </button>
  );
}
