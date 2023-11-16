"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { QuestionsSchema } from "@/lib/validations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Question = () => {
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Titulo da Pergunta <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormDescription className="body-regular mt-2.5 text-light-500">
                Seja especifico e imagine que a pergunta será feita para outros
                devs.
              </FormDescription>

              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detalhes da sua pergunta{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl className="mt-3.5">{/* todo */}</FormControl>

              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduza o seu problema e explique em detalhes de acordo com o
                titulo. Minimo de 20 caracteres.
              </FormDescription>

              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Add Tags.."
                  {...field}
                />
              </FormControl>

              <FormDescription className="body-regular mt-2.5 text-light-500">
                Adicione 3 tags que melhor descrevem a sua pergunta. Você
                precisa pressionar enter para adicionar a tag.
              </FormDescription>

              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button className="" type="submit">
          Criar
        </Button>
      </form>
    </Form>
  );
};

export default Question;
