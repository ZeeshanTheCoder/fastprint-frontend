"use client";

import StartProjectContent from "@/components/StartProjectContent";
import { Suspense } from "react";

const BookPreview = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <StartProjectContent />
    </Suspense>
  );
};

export default BookPreview;
