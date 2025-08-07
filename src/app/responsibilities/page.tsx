export default function Responsibilities() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Responsibilities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to ethical business practices, sustainability, and social responsibility
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Environmental Responsibility</h3>
            <p className="text-gray-600 mb-6">
              We are committed to reducing our environmental footprint and promoting sustainable practices in all our operations.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>• Carbon footprint reduction initiatives</li>
              <li>• Green technology solutions</li>
              <li>• Sustainable office practices</li>
              <li>• Renewable energy adoption</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Social Responsibility</h3>
            <p className="text-gray-600 mb-6">
              We believe in giving back to our communities and supporting causes that make a positive impact.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>• Community outreach programs</li>
              <li>• Educational initiatives</li>
              <li>• Charitable partnerships</li>
              <li>• Volunteer opportunities</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Ethical Business Practices</h3>
            <p className="text-gray-600 mb-6">
              We maintain the highest standards of integrity, transparency, and ethical conduct in all our business relationships.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>• Transparent pricing and contracts</li>
              <li>• Data privacy and security</li>
              <li>• Fair labor practices</li>
              <li>• Anti-corruption policies</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Client Responsibility</h3>
            <p className="text-gray-600 mb-6">
              We are committed to delivering exceptional value and maintaining the highest standards of service for our clients.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>• Quality assurance standards</li>
              <li>• Timely project delivery</li>
              <li>• Ongoing support and maintenance</li>
              <li>• Client satisfaction guarantee</li>
            </ul>
          </div>
        </div>

        <section className="bg-indigo-600 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Our Commitment to You</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We are dedicated to upholding these responsibilities and continuously improving our practices to better serve our clients, employees, and communities.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn More About Our Values
          </button>
        </section>
      </div>
    </div>
  );
}
