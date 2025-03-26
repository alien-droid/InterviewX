import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col max-w-lg gap-6">
          <h2>Be Interview-prepared with AI-Powered Practice</h2>
          <p className="text-lg">
            Boost your interview skills with real interview questions and
            feedback.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start Now</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="underline">Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          {/* <p>You haven&apos;t taken any interviews</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="underline">Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          {/* <p>You haven&apos;t taken any interviews</p> */}
        </div>
      </section>
    </>
  );
};

export default page;
