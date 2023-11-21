"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="w-full h-10 bg-green-500 font-black">
      {pending ? "saving..." : "save"}
    </button>
  );
}
