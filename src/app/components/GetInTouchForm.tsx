'use client';

export default function GetInTouchForm() {
  return (
    <div className="animate-fade-in-slide-up">
      <div className="rounded-3xl p-8 lg:p-12 bg-[#140079]">
        <h2 className="text-3xl font-bold text-white mb-2">Get In Touch!</h2>
        <p className="text-white mb-8">
          Ready to discuss your technology needs? Send us a message and we'll get back to you within 24 hours.
        </p>
        
        <form className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company"
                className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email*"
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <input
              type="tel"
              placeholder="Telephone"
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
