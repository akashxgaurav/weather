export default function ErrorPage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h2 className="text-4xl font-bold text-red-600">Oops!</h2>
      <p className="mt-2 text-md text-gray-600">{message}</p>
    </div>
  );
}
