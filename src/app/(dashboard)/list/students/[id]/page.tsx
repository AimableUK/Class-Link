import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* user Info card*/}
          <div className="bg-classSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/32719717/pexels-photo-32719717.jpeg"
                alt="Student image"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Camero George</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur amet consectetur
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/blood.png"
                    alt="blood icon"
                    width={14}
                    height={14}
                  />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/date.png"
                    alt="date icon"
                    width={14}
                    height={14}
                  />
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/mail.png"
                    alt="mail icon"
                    width={14}
                    height={14}
                  />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/phone.png"
                    alt="phone icon"
                    width={14}
                    height={14}
                  />
                  <span>+250 783309468</span>
                </div>
              </div>
            </div>
          </div>
          {/* small Info cards */}
          <div className="flex-1 flex gap-4  justify-between flex-wrap">
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[47%] xl:w-[46%] 2xl:w-[48%] ">
              <Image
                src="/singleAttendance.png"
                alt="single attendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[47%] xl:w-[46%] 2xl:w-[48%] ">
              <Image
                src="/singleBranch.png"
                alt="single Branche"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[47%] xl:w-[46%] 2xl:w-[48%] ">
              <Image
                src="/singleLesson.png"
                alt="single Lesson"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">16</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[47%] xl:w-[46%] 2xl:w-[48%] ">
              <Image
                src="/singleClass.png"
                alt="single Class"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom card */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="">Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-classSky"
              href={`/list/lessons?classId=${2}`}
            >
              Student&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-classSkyPurpleLight"
              href={`/list/teachers?classId=${2}`}
            >
              Student&apos;s Teachers
            </Link>

            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?classId=${2}`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-classSkyLight"
              href={`/list/assignments?classId=${2}`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              className="p-3 rounded-md bg-classSkyYellowLight"
              href={`/list/results?studentId=${'student2'}`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
