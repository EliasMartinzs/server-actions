"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function create(prevState: any, formData: FormData) {
  "use server";

  try {
    const input = formData.get("name") as string;

    await prisma.todo.create({
      data: {
        input: input,
      },
    });

    revalidatePath("/better");
  } catch (error: any) {
    throw new Error(`failed to create ${error.message}`);
  }
}

export async function edit(formData: FormData) {
  "use server";

  const input = formData.get("input") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      input: input,
    },
  });
}

export async function deleteItem(formData: FormData) {
  "use server";

  const inputId = formData.get("inputId") as string;

  await prisma.todo.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/better");
}
