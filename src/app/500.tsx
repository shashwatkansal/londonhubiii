// app/500.tsx
export default function InternalServerError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">500 - Internal Server Error</h1>
      <p className="text-lg mt-4">Something went wrong on our end.</p>
      <a href="/" className="text-blue-500 mt-6 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
