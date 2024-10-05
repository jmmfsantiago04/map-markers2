import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">Welcome to the Marker App</h1>
        <div className="space-y-6">
          <Link className="block w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" href="/admin">
              Go to Admin Page
          </Link>
          <Link className="block w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" href="/marker-list">
              View Marker List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
