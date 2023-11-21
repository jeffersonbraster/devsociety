import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5, "Minimo 5 caracteres").max(130, "Maximo 130 caracteres"),
  explanation: z.string().min(50, "Minimo 50 caracteres"),
  tags: z.array(z.string().min(1).max(15)).min(1, "Minimo 1 tag").max(3, "Maximo 3 tags"),
});

export const AnswerSchema = z.object({
  answer: z.string().min(10, "Minimo 10 caracteres"),
});

export const ProfileSchema = z.object({
  name: z.string().min(5, "Minimo 5 caracteres").max(50, "Maximo 50 caracteres"),
  username: z.string().min(5, "Minimo 5 caracteres").max(50, "Maximo 50 caracteres"),
  bio: z.string().min(10, "Minimo 10 caracteres").max(160, "Maximo 160 caracteres"),
  location: z.string().min(5, "Minimo 5 caracteres").max(30, "Maximo 30 caracteres"),
  portfolioWebsite: z.string().url("URL invalida"),
})
