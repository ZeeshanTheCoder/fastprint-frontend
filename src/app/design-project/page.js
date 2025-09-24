"use client";

import DesignProjectPreview from "@/components/DesignPreviewContent";
import { Suspense } from "react";

const DesignProject = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <DesignProjectPreview />
    </Suspense>
  );
};

export default DesignProject;
