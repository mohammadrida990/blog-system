"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error("Caught in route-level error.tsx:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
      <p className="text-primary mt-2">{error.message}</p>

      <div className="flex gap-2">
        <Button
          onClick={reset}
          className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Try again
        </Button>

        <Button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
