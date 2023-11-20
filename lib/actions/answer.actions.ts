"use server"

import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/database/question.model";


export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase()

    const { author, question, content, path } = params

    const newAnswer = new Answer({
      author,
      question,
      content,
    })

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    })

    revalidatePath(path)

  } catch (error) {
    console.error(error)
    throw error
  }
}