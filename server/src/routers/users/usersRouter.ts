import { z } from "zod";
import { t } from "../../trpc";
import { users } from "../../users";
import { TRPCError } from "@trpc/server";

const userIdInput = z.object({
  userId: z.string(),
});

const userProcedure = t.procedure.input(userIdInput);

export const usersRouter = t.router({
  get: userProcedure.query(({ input }) => {
    const user = users.find((user) => user.id === input.userId);
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
  }),
  getAll: t.procedure.query(async () => {
    return users;
  }),
  update: t.procedure
    .input(userIdInput)
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input }) => {
      const user = users.find((user) => user.id === input.userId);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      user.name = input.name;
    }),
  delete: userProcedure.mutation(({ input }) => {
    users.splice(
      users.findIndex((user) => user.id === input.userId),
      1
    );
  }),
  create: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input }) => {
      const maxId = Math.max(...users.map((user) => parseInt(user.id)));
      users.push({
        id: (maxId + 1).toString(),
        name: input.name,
      });
    }),
});
