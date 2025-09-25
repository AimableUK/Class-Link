import prisma from "@/lib/prisma";
import React from "react";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 99, 999)),
      },
    },
  });

  return data.length > 0 ? (
    data.map((event) => (
      <div
        className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-classSky even:border-t-classSkyPurple"
        key={event.id}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-700">{event.title}</h1>
          <span className="text-gray-400 text-xs">
            {event.startTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{event.description}</p>
      </div>
    ))
  ) : (
    <p className="p-5 rounded-md border-2 border-gray-100 border-t-4 border-t-classSky font-semibold text-gray-800">
      No Event Available
    </p>
  );
};

export default EventList;
