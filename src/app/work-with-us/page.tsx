export default function WorkWithUs() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Work With Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our team of passionate professionals and help shape the future of technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Why Join IndigoTG?</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Innovative projects and cutting-edge technology</li>
              <li>• Collaborative and inclusive work environment</li>
              <li>• Professional growth and development opportunities</li>
              <li>• Competitive compensation and benefits</li>
              <li>• Flexible work arrangements</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Open Positions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-600 pl-4">
                <h4 className="font-semibold">Senior Software Engineer</h4>
                <p className="text-gray-600">Full-time • Remote/Hybrid</p>
              </div>
              <div className="border-l-4 border-indigo-600 pl-4">
                <h4 className="font-semibold">UX/UI Designer</h4>
                <p className="text-gray-600">Full-time • On-site</p>
              </div>
              <div className="border-l-4 border-indigo-600 pl-4">
                <h4 className="font-semibold">DevOps Engineer</h4>
                <p className="text-gray-600">Full-time • Remote</p>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-indigo-600 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Send us your resume and let&apos;s discuss how you can contribute to our mission.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </button>
        </section>
      </div>
    </div>
  );
}
