export default function WhoWeAre() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Who We Are
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our mission, values, and the team behind IndigoTG
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At IndigoTG, we are committed to delivering innovative technology solutions that empower businesses to thrive in the digital age. Our mission is to transform ideas into powerful, scalable solutions that drive growth and success.
              </p>
              <p className="text-lg text-gray-600">
                We believe in the power of technology to solve complex challenges and create opportunities for our clients and communities.
              </p>
            </div>
            <div className="bg-indigo-100 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
                Core Values
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Innovation & Excellence
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Integrity & Trust
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Customer Success
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Continuous Learning
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">CEO & Founder</h3>
              <p className="text-gray-600">Leading our vision and strategy</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">CTO</h3>
              <p className="text-gray-600">Driving technical innovation</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Head of Operations</h3>
              <p className="text-gray-600">Ensuring operational excellence</p>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="bg-indigo-600 text-white py-12 rounded-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-indigo-100">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-indigo-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-indigo-100">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-indigo-100">Client Satisfaction</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
