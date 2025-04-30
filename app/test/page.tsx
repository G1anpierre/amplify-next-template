export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tailwind CSS Test Page</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-red-500 p-4 text-white rounded">Red Box</div>
        <div className="bg-blue-500 p-4 text-white rounded">Blue Box</div>
        <div className="bg-green-500 p-4 text-white rounded">Green Box</div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <span className="text-lg font-medium">Left</span>
        <span className="text-lg font-medium">Center</span>
        <span className="text-lg font-medium">Right</span>
      </div>
      
      <div className="border border-gray-300 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Card Example</h2>
        <p className="text-gray-600 mb-4">This is a simple card with padding, border and shadow.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Test Button
        </button>
      </div>
    </div>
  );
} 