import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = ({ searchParams, userId, clerkId }: AnswerTabProps) => {
  return <div>AnswerTab</div>;
};

export default AnswerTab;
