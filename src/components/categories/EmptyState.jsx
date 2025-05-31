export default function EmptyState() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl py-20 px-6 flex flex-col items-center justify-center">
      <div className="absolute w-96 h-96 bg-blue-500/5 -top-48 -left-48 rounded-full blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-purple-500/5 -bottom-48 -right-48 rounded-full blur-3xl"></div>

      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn&apos;t find any items in this category at the moment.
      </p>
    </div>
  );
}
