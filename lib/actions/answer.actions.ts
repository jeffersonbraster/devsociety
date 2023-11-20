"use server"

import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";


export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase()

    const { author, question, content, path } = params

    const newAnswer = await Answer.create({
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

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase()

    const { questionId } = params

    const answers = await Answer.find({ question: questionId }).populate('author', "_id clerkId name picture").sort({ createdAt: -1 })

    return { answers }
  } catch (error) {
    console.log(error)
    throw error
  }
}