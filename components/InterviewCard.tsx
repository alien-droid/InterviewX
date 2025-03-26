import { getRandomInterviewCover } from "@/public/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import TechIconCard from "./TechIconCard";

const InterviewCard = ({
  interviewId,
  userId,
  type,
  role,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const nType = /mix/gi.test(type) ? "Mixed" : type;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[370px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 px-4 py-2 w-fit rounded-bl-lg bg-light-600">
            <p className="badge-type">{nType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            height={90}
            width={90}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{role} Interview</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={20}
                height={20}
              />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image src="/star.svg" alt="star" height={20} width={20}></Image>
              <p>{feedback?.totalScore || "---"} / 100</p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You have yet to begin this interview. Start now to improve your score."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <TechIconCard techStack={techstack} />
          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
