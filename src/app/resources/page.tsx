export default function Resources() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our library of whitepapers, guides, and educational content
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-bold mb-4">Whitepapers</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Digital Transformation Guide</span>
                <button className="text-indigo-600 hover:underline">Download</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cybersecurity Best Practices</span>
                <button className="text-indigo-600 hover:underline">Download</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cloud Migration Strategy</span>
                <button className="text-indigo-600 hover:underline">Download</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-bold mb-4">Case Studies</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Healthcare Transformation</span>
                <button className="text-indigo-600 hover:underline">View</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Financial Services Innovation</span>
                <button className="text-indigo-600 hover:underline">View</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Manufacturing Optimization</span>
                <button className="text-indigo-600 hover:underline">View</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-bold mb-4">Webinars</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">AI in Business</span>
                <button className="text-indigo-600 hover:underline">Watch</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Future of Cloud Computing</span>
                <button className="text-indigo-600 hover:underline">Watch</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cybersecurity Trends</span>
                <button className="text-indigo-600 hover:underline">Watch</button>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-indigo-600 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Need Custom Resources?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us for personalized content and resources tailored to your specific needs.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Request Resources
          </button>
        </section>
      </div>
    </div>
  );
}
