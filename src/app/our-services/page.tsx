export default function OurServices() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Web Development */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Web Development</h3>
            <p className="text-gray-600 mb-4">
              Custom web applications and websites built with modern technologies and best practices.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• React & Next.js Applications</li>
              <li>• E-commerce Solutions</li>
              <li>• Content Management Systems</li>
            </ul>
          </div>

          {/* Mobile Development */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Mobile Development</h3>
            <p className="text-gray-600 mb-4">
              Native and cross-platform mobile applications for iOS and Android platforms.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• iOS & Android Apps</li>
              <li>• React Native Development</li>
              <li>• App Store Optimization</li>
            </ul>
          </div>

          {/* Cloud Solutions */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Cloud Solutions</h3>
            <p className="text-gray-600 mb-4">
              Scalable cloud infrastructure and migration services for modern businesses.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AWS & Azure Services</li>
              <li>• Cloud Migration</li>
              <li>• DevOps & CI/CD</li>
            </ul>
          </div>

          {/* Data Analytics */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Data Analytics</h3>
            <p className="text-gray-600 mb-4">
              Transform your data into actionable insights with advanced analytics solutions.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Business Intelligence</li>
              <li>• Data Visualization</li>
              <li>• Predictive Analytics</li>
            </ul>
          </div>

          {/* Cybersecurity */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Cybersecurity</h3>
            <p className="text-gray-600 mb-4">
              Protect your digital assets with comprehensive security solutions and consulting.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Security Audits</li>
              <li>• Penetration Testing</li>
              <li>• Compliance Consulting</li>
            </ul>
          </div>

          {/* Consulting */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Technology Consulting</h3>
            <p className="text-gray-600 mb-4">
              Strategic technology consulting to help you make informed decisions and optimize your IT infrastructure.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Technology Strategy</li>
              <li>• Digital Transformation</li>
              <li>• IT Optimization</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-indigo-600 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our services can help transform your business and drive growth.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us Today
          </button>
        </section>
      </div>
    </div>
  );
}
