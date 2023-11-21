import { revalidatePath } from "next/cache";
import prisma from "./db";
import { UserButton, auth } from "@clerk/nextjs";

async function getData(userId: string) {
  const data = await prisma.usuario.findMany({
    // where: {
    //   userId: userId,
    // },
  });

  return data;
}

export default async function Home() {
  const { userId } = auth();
  const data = await getData(userId ?? "");

  async function create(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    await prisma.usuario.create({
      data: {
        name: name,
        userId: userId ?? "",
      },
    });

    revalidatePath("/");
  }

  return (
    <main className="w-full h-screen grid place-items-center">
      <UserButton />
      <div className="w-96 h-96 shadow-2xl">
        <form action={create}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="w-full h-10 border border-blue-500"
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            className="w-full h-10 border border-blue-500"
          />
          <button type="submit" className="bg-blue-500 w-full h-full">
            salvar
          </button>
        </form>
        {/* {data.map((item) => (
          <form
            key={item.id}
            className="flex items-center justify-center"
            action={edit}
          >
            <input type="hidden" name="inputId" value={item.id} />
            <input type="text" name="input" defaultValue={item.name} />
            <input type="text" name="input" defaultValue={item.username} />

            <button type="submit" className="bg-green-500">
              save
            </button>
          </form>
        ))} */}
      </div>
    </main>
  );
}
