// app/maintenance.tsx
export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Maintenance Mode</h1>
      <p className="text-lg mt-4">
        We're currently performing maintenance. Please check back later.
      </p>
      <a href="/" className="text-blue-500 mt-6 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
