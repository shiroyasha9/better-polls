import superjson from 'superjson';
import { z } from 'zod';

import { createRouter } from './context';
import { questionRouter } from './questions';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish()
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`
      };
    }
  })
  .merge('questions.', questionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
