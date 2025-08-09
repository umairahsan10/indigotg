export default function Solutions() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry-specific solutions designed to address your unique challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Healthcare Solutions</h3>
            <p className="text-gray-600 mb-6">
              Digital transformation solutions for healthcare providers.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Electronic Health Records (EHR) Systems</li>
              <li>• Telemedicine Platforms</li>
              <li>• Patient Management Systems</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Financial Services</h3>
            <p className="text-gray-600 mb-6">
              Secure and scalable solutions for financial institutions.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Digital Banking Platforms</li>
              <li>• Payment Processing Systems</li>
              <li>• Risk Management Tools</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Retail & E-commerce</h3>
            <p className="text-gray-600 mb-6">
              Omnichannel retail solutions that enhance customer experience.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• E-commerce Platforms</li>
              <li>• Inventory Management</li>
              <li>• Customer Analytics</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-bold mb-4">Manufacturing</h3>
            <p className="text-gray-600 mb-6">
              Smart manufacturing solutions that optimize production.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• IoT & Smart Factory</li>
              <li>• Quality Management Systems</li>
              <li>• Supply Chain Optimization</li>
            </ul>
          </div>
        </div>

        <section className="bg-indigo-600 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We specialize in creating tailored solutions for your business needs.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Discuss Your Project
          </button>
        </section>
      </div>
    </div>
  );
}
