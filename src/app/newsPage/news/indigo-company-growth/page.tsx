'use client';

import Link from 'next/link';
import { FaCalendar, FaShare } from 'react-icons/fa';

export default function IndigoCompanyGrowthPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Full Screen */}
            <section className="relative h-screen bg-gradient-to-r from-[#140079] to-blue-600">
                <div className="absolute inset-0">
                    <img
                        src="/News/NewsTemplate/hero.png"
                        alt="News Hero"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>

                {/* Fade to white at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
                
                <div className="relative z-10 h-full flex items-center">
                    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="text-white">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
                                Indigo company growth
                            </h1>
                            <div className="flex items-center text-white">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                                    <FaCalendar className="text-sm sm:text-base md:text-lg" />
                                </div>
                                <span className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide">07 June 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
                {/* Breadcrumb */}
                <nav className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 px-2 sm:px-0">
                    <Link href="/" className="hover:text-[#140079] transition-colors duration-300 ease-in-out">
                        Home
                    </Link>
                    <span className="mx-2">•</span>
                    <Link href="/newsPage" className="hover:text-[#140079] transition-colors duration-300 ease-in-out">
                        News
                    </Link>
                    <span className="mx-2">•</span>
                    <span className="text-[#140079]">Indigo company growth</span>
                </nav>

                {/* Article Content */}
                <article className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none">
                    {/* Article Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#140079] mb-6 sm:mb-8 leading-tight px-2 sm:px-0">
                        Indigo: New Leadership, Certifications, Awards, and USA Growth!
                    </h1>

                    {/* Article Description */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
                        At Indigo, we are thrilled to share some significant updates that reflect our continuous growth and commitment to excellence to support our customers' digital infrastructure around the world. From new leadership appointments to certifications and awards, here are the highlights of our recent achievements.
                    </p>

                    {/* Neil Yusuf Section */}
                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#140079] mb-4 px-2 sm:px-0">Neil Yusuf</h2>
                        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start mb-6">
                            {/* Neil Yusuf Image */}
                            <div className="w-full lg:w-1/4 px-2 sm:px-0">
                                <img
                                    src="/News/NewsTemplate/t2/1.jpg"
                                    alt="Neil Yusuf - Chief Commercial Officer"
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            {/* Neil Yusuf Content */}
                            <div className="w-full lg:w-2/3 px-2 sm:px-0">
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#140079] leading-tight">
                                        Welcoming Neil Yusuf as<br className="hidden sm:block" />
                                        Our New CCO
                                    </h3>
                                </div>
                                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                    We are excited to announce that Neil Yusuf has joined Indigo as our new Chief Commercial Officer (CCO). With a wealth of experience in commercial strategy and business development, Neil is poised to lead our commercial initiatives to new markets. His vision and expertise will undoubtedly drive our growth and innovation in the coming years.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Nigel Sperring Section */}
                    <div className="mb-8 sm:mb-10 px-2 sm:px-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#140079] mb-4">Nigel Sperring Now Our Full-Time CFO</h3>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                            We are delighted to confirm that Nigel Sperring, who has been serving as our interim CFO, is now taking on the role full-time. Nigel has been instrumental in our financial stability and growth during his interim period. His deep understanding of our financial operations and strategic acumen makes him a valuable addition to our permanent leadership team and member of the board.
                        </p>
                    </div>

                    {/* Kathy Kirchner Section */}
                    <div className="mb-8 sm:mb-10 px-2 sm:px-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#140079] mb-4">Kathy Kirchner's Impact on Our NOC and USA Operations</h3>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                            Kathy Kirchner, who joined us three months ago, has already made a huge impact on our company. She has significantly improved our Network Operations Centre, developed our subsea capabilities, and enhanced our operations in the USA. Kathy's dedication and expertise are driving our success in these critical areas, and we are excited to see continued improvements under her leadership. [See appointment announcement]
                        </p>
                    </div>

                    {/* ISO Certification Section */}
                    <div className="mb-8 sm:mb-10 px-2 sm:px-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#140079] mb-4">Achieving ISO Certification</h3>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                            We are proud to announce that Indigo has achieved ISO recertification. This certification is a testament to our commitment to quality and excellence in all our operations. Achieving this milestone reflects our dedication to maintaining the highest standards and continuously improving our processes to better serve our clients and stakeholders. [Find out more about how Indigo empowers our customers backed by Comprehensive ISO Recertifications (ISO 9001, ISO 14001 and ISO 45001)]
                        </p>
                    </div>

                    {/* Grant Thornton Award Section */}
                    <div className="mb-8 sm:mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#140079] mb-4 px-2 sm:px-0">Grant Thornton Recognition</h2>
                        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start mb-6">
                            {/* Grant Thornton Image */}
                            <div className="w-full lg:w-1/4 px-2 sm:px-0">
                                <img
                                    src="/News/NewsTemplate/t2/2.jpg"
                                    alt="Grant Thornton Award Recognition"
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            {/* Grant Thornton Content */}
                            <div className="w-full lg:w-2/3 px-2 sm:px-0">
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#140079] leading-tight">
                                        Recognized by Grant Thornton as<br className="hidden sm:block" />
                                        One of the Top 200 Companies in Wales
                                    </h3>
                                </div>
                                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                                    In another exciting development, Indigo has been recognized by Grant Thornton as one of the top 200 companies in Wales. This prestigious award highlights our growth, innovation, and commitment to excellence. We are honored to receive this recognition and are motivated to continue pushing the boundaries of success. <a href="https://www.linkedin.com/posts/indigotelecomgroup_southwaleslimited-indigoteam-activity-7198594752936574976-7_vB/?utm_source=share&utm_medium=member_desktop" className="text-[#140079] hover:underline" target="_blank" rel="noopener noreferrer">[Find out more about this accomplishment]</a>
                                </p>
                                <div className="mt-6 sm:mt-8 flex justify-start ml-0 sm:ml-8">
                                    <img
                                        src="/News/NewsTemplate/t2/3.png"
                                        alt="Grant Thornton Award Ceremony"
                                        className="max-w-full sm:max-w-lg w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* USA Expansion Section */}
                    <div className="mb-8 sm:mb-10 px-2 sm:px-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#140079] mb-4">Expanding Our Footprint in the USA</h3>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                            Our expansion in the USA is progressing remarkably well with our SVP of Global Sales, Ray O'Connor, leading the charge. The combination of a deep talent pool and data-drive technologies make Indigo the partner of choice for designing and supporting the nascent Fiber option broadband networks in the region. We are excited about the opportunities this growth presents and are committed to delivering exceptional value to our clients and partners in this key market. Our focus on innovation, quality, and customer satisfaction is driving our success as we expand our footprint in the USA.
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-8 sm:mb-10 mx-2 sm:mx-0">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Keep up to date with exciting news from Indigo by signing up for our newsletter on our home page <a href="https://indigotg.com" className="text-[#140079] hover:underline" target="_blank" rel="noopener noreferrer">We are Indigo – Engineering a Digital Future, Design, Deploy, Support (indigotg.com)</a> or contact <a href="mailto:sales@indigotg.com" className="text-[#140079] hover:underline">sales@indigotg.com</a>
                        </p>
                    </div>
                </article>

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-6 sm:pt-8 text-center px-2 sm:px-0">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: "Indigo company growth",
                                    text: "At Indigo, we are thrilled to share some significant updates that reflect our continuous growth and commitment to excellence to support our customers' digital infrastructure around the world.",
                                    url: window.location.href
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }
                        }}
                        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out hover:scale-105 text-sm sm:text-base"
                    >
                        <FaShare className="mr-2 text-sm sm:text-base" />
                        Share this article
                    </button>
                </div>
            </main>
        </div>
    );
}
