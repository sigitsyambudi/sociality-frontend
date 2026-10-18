import { TimelineSkeleton } from "@/features/timeline/components/timeline-states";

export default function TimelineLoading() {
  return (
    <div className="mx-auto w-full max-w-[600px] px-4 pb-32 pt-8 sm:px-6 lg:px-0 lg:pt-10">
      <TimelineSkeleton />
    </div>
  );
}
