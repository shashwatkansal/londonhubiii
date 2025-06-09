"use client";
export default function InternalServerError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg mt-4">Something went wrong on our end.</p>
      <p className="text-lg mt-4">
        We&apos;re working on fixing the issue. Please try again later.
      </p>
      <a href="/" className="text-blue-500 mt-6 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
