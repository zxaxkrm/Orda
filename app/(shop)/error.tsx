"use client";
import Link from "next/link";


const errorMessages: Record<string, string> = {
  USER_NOT_FOUND: "We couldn't find your account. Please sign in again.",
  ORDER_NOT_FOUND: "This order doesn't exist or has been removed.",
  UNAUTHORIZED: "You need to be signed in to view this page.",
  FETCH_FAILED: "Failed to load products. Please check your connection.",
  DEFAULT: "Something went wrong. Please try again.",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  const message = errorMessages[error.message] ?? errorMessages.DEFAULT;

  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="text-sm text-gray-500">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
        >
          Refresh
        </button>
        <Link href="/" className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100">
          Go home
        </Link>
      </div>
    </div>
  );
}