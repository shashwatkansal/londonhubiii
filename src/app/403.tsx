// app/403.tsx
export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">403 - Forbidden</h1>
      <p className="text-lg mt-4">
        You don't have permission to access this page.
      </p>
      <a href="/" className="text-blue-500 mt-6 hover:underline">
        Return to Home
      </a>
    </div>
  );
}
