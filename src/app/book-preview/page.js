"use client";

import BookPreviewContent from "@/components/BookPreviewContent";
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
      <BookPreviewContent />
    </Suspense>
  );
};

export default BookPreview;
