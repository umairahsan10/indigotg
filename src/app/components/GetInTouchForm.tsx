'use client';

export default function GetInTouchForm() {
  return (
    <div className="animate-fade-in-slide-up">
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 bg-[#140079]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 font-roboto text-center sm:text-left">
          Get In Touch!
        </h2>
        <p className="text-sm sm:text-base text-white mb-6 sm:mb-8 font-roboto text-center sm:text-left leading-relaxed">
          Ready to discuss your technology needs? Send us a message and we'll get back to you within 24 hours.
        </p>
        
        <form className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email*"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <input
              type="tel"
              placeholder="Telephone"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none min-h-[120px] sm:min-h-[150px]"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
