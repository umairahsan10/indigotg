export default function News() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest news, industry insights, and company announcements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">December 15, 2024</div>
              <h3 className="text-xl font-bold mb-3">IndigoTG Expands to New Markets</h3>
              <p className="text-gray-600 mb-4">
                We're excited to announce our expansion into new markets, bringing our innovative solutions to more businesses worldwide.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">Read More →</a>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">December 10, 2024</div>
              <h3 className="text-xl font-bold mb-3">New AI-Powered Analytics Platform</h3>
              <p className="text-gray-600 mb-4">
                Launching our latest AI-powered analytics platform designed to provide deeper insights for business decision-making.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">Read More →</a>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">December 5, 2024</div>
              <h3 className="text-xl font-bold mb-3">Industry Recognition Award</h3>
              <p className="text-gray-600 mb-4">
                IndigoTG receives prestigious industry recognition for excellence in technology innovation and client satisfaction.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">Read More →</a>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">November 28, 2024</div>
              <h3 className="text-xl font-bold mb-3">Cybersecurity Best Practices</h3>
              <p className="text-gray-600 mb-4">
                Essential cybersecurity practices every business should implement to protect against evolving digital threats.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">Read More →</a>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">November 20, 2024</div>
              <h3 className="text-xl font-bold mb-3">Digital Transformation Trends</h3>
              <p className="text-gray-600 mb-4">
                Exploring the latest trends in digital transformation and how they're reshaping business operations.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">Read More →</a>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">November 15, 2024</div>
              <h3 className="text-xl font-bold mb-3">Team Growth Announcement</h3>
              <p className="text-gray-600 mb-4">
                Welcoming new talented professionals to our growing team as we continue to expand our capabilities.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline">Read More →</a>
            </div>
          </article>
        </div>

        <section className="bg-indigo-600 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest news, insights, and updates from IndigoTG.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
