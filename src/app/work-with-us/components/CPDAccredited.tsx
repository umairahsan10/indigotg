export default function CPDAccredited() {
  return (
    <section className="bg-[#F5F8FA] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-5xl font-bold text-[#2C3E50] mb-8">CPD accredited</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Indigo has been accredited by Engineers Ireland in recognition of the quality of, and commitment to, its Continuing Professional Development (CPD) systems and practices for engineering and technical staff.
            </p>
          </div>

          {/* Right Column - Engineers Ireland Logo */}
          <div className="flex justify-center">
            <div className="bg-white p-12 rounded-2xl shadow-lg">
              <div className="bg-yellow-400 p-8 rounded-lg flex items-center">
                {/* Phi symbol */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-6">
                  <div className="w-8 h-8 relative">
                    <div className="absolute inset-0 bg-white rounded-full"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-400"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-400"></div>
                  </div>
                </div>
                
                {/* Text */}
                <div className="text-white font-bold">
                  <div className="text-2xl">ENGINEERS</div>
                  <div className="text-xl ml-4">Ireland</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
