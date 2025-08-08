export default function DownloadEbook() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - eBook Cover */}
          <div className="flex justify-center">
            <div className="bg-[#1e3a8a] w-80 h-96 rounded-2xl p-8 relative shadow-xl">
              {/* INDIGO Logo */}
              <div className="flex items-center mb-6">
                <span className="text-white text-2xl mr-2">▶</span>
                <span className="text-white text-2xl font-bold">INDIGO</span>
              </div>
              
              {/* Title */}
              <div className="mb-8">
                <div className="text-orange-400 text-xl font-bold mb-2">Connecting People,</div>
                <div className="text-yellow-400 text-xl font-bold">Nurturing Talent</div>
              </div>
              
              {/* Illustration */}
              <div className="mb-8">
                <div className="flex justify-center items-center space-x-4">
                  {/* Person 1 */}
                  <div className="w-12 h-16 bg-blue-300 rounded-full relative">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-blue-300 rounded-full"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-blue-400 rounded-full"></div>
                  </div>
                  
                  {/* Person 2 (middle) */}
                  <div className="w-12 h-16 bg-white rounded-full relative">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-white rounded-full"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-300 rounded-full"></div>
                    {/* Laptop */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-600 rounded"></div>
                  </div>
                  
                  {/* Person 3 */}
                  <div className="w-12 h-16 bg-blue-300 rounded-full relative">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-blue-300 rounded-full"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* High-five lines */}
                <div className="flex justify-center mt-4">
                  <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Bottom text */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold">
                ENGINEERING A DIGITAL FUTURE
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">Download our eBook</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              If you are considering starting your journey with us, our Connecting People, Nurturing Talent guide will help you decide whether our story, vision, values, and company culture is right for you.
            </p>
            <a 
              href="#" 
              className="text-[#2C3E50] underline font-semibold hover:text-[#1e3a8a] transition-colors"
            >
              Download Here
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
