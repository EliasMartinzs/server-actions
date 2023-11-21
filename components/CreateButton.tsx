"use client";
import prisma from "@/app/db";
import { auth, useAuth } from "@clerk/nextjs";

export default function CreateButton() {
  const { userId } = useAuth();

  console.log(userId);

  const criarETarefasParaUsuario = async (userId: string) => {
    "use server";
    try {
      // Encontrar o usuário pelo userId
      const usuario = await prisma.usuario.findUnique({
        where: {
          userId: userId,
        },
      });

      if (!usuario) {
        console.log("Usuário não encontrado.");
        return;
      }

      // Criar tarefas (Todo) associadas a este usuário específico
      const tarefasCriadas = await prisma.todo.createMany({
        data: [
          { title: "Tarefa 1", completed: false, usuarioId: usuario.id },
          { title: "Tarefa 2", completed: true, usuarioId: usuario.id },
        ],
      });

      console.log("Tarefas criadas para o usuário:", tarefasCriadas);
    } catch (error) {
      console.error("Erro ao criar tarefas:", error);
    }
  };

  return (
    <button onClick={() => criarETarefasParaUsuario(userId ?? "")}>
      CreateButton
    </button>
  );
}
