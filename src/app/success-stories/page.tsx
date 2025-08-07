export default function SuccessStories() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we&apos;ve helped businesses transform and achieve their goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Healthcare Provider</h3>
            <p className="text-gray-600 mb-4">
              &quot;IndigoTG transformed our patient management system, improving efficiency by 40% and enhancing patient satisfaction.&quot;
            </p>
            <div className="text-sm text-gray-500">
              <strong>Results:</strong> 40% efficiency improvement, 95% patient satisfaction
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Financial Institution</h3>
            <p className="text-gray-600 mb-4">
              &quot;Their digital banking solution helped us increase customer engagement and reduce operational costs significantly.&quot;
            </p>
            <div className="text-sm text-gray-500">
              <strong>Results:</strong> 60% customer engagement increase, 30% cost reduction
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">E-commerce Platform</h3>
            <p className="text-gray-600 mb-4">
              &quot;The new platform increased our sales by 150% and provided a seamless shopping experience for our customers.&quot;
            </p>
            <div className="text-sm text-gray-500">
              <strong>Results:</strong> 150% sales increase, 99.9% uptime
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Manufacturing Company</h3>
            <p className="text-gray-600 mb-4">
              &quot;Smart factory implementation reduced production time by 25% and improved quality control by 90%.&quot;
            </p>
            <div className="text-sm text-gray-500">
              <strong>Results:</strong> 25% production time reduction, 90% quality improvement
            </div>
          </div>
        </div>

        <section className="bg-indigo-600 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s work together to achieve similar results for your business.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Your Project
          </button>
        </section>
      </div>
    </div>
  );
}
