import React from "react";
import prisma from "../db";
import { create, deleteItem, edit } from "../action";
import SaveButton from "@/components/SaveButton";
import DeleteButton from "@/components/DeleteButton";
import Form from "@/components/Form";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      input: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function page() {
  const data = await getData();
  return (
    <main className="w-full h-screen grid place-items-center">
      <div className="w-96 h-96 shadow-2xl">
        <Form />
        {data.map((item) => (
          <div className="" key={item.id}>
            <form
              key={item.id}
              className="flex items-center justify-center"
              action={edit}
            >
              <input type="hidden" name="inputId" value={item.id} />
              <input type="text" name="input" defaultValue={item.input} />

              <SaveButton />
            </form>
            <form action={deleteItem}>
              <input type="hidden" name="inputId" value={item.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
