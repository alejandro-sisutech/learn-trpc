import { z } from "zod";
import { t } from "../trpc";
import { usersRouter } from "./users/usersRouter";

export const appRouter = t.router({
  sayHi: t.procedure.query(async () => {
    return "Hello, World!";
  }),
  logToServer: t.procedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .mutation(({ input }) => {
      console.log(input.message);
    }),
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
