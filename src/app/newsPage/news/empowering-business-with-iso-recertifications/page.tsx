'use client';

import Link from 'next/link';
import { FaCalendar, FaShare } from 'react-icons/fa';

export default function EmpoweringBusinessWithISORecertificationsPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Full Screen */}
            <section className="relative h-screen bg-gradient-to-r from-[#140079] to-blue-600">
                <div className="absolute inset-0">
                                         <img
                         src="/news/NewsTemplate/hero.png"
                         alt="News Hero"
                         className="w-full h-full object-cover opacity-20"
                     />
                </div>

                {/* Fade to white at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
                
                <div className="relative z-10 h-full flex items-center">
                    <div className="w-full max-w-6xl mx-auto px-8">
                        <div className="text-white">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                                Empowering Customers through ISO Recertifications
                            </h1>
                            <div className="flex items-center text-white">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                    <FaCalendar className="text-lg" />
                                </div>
                                <span className="text-2xl font-medium tracking-wide">24 May 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <main className="max-w-5xl mx-auto px-8 py-16">
                {/* Breadcrumb */}
                <nav className="text-gray-500 text-sm mb-8">
                    <Link href="/" className="hover:text-[#140079] transition-colors duration-300 ease-in-out">
                        Home
                    </Link>
                    <span className="mx-2">•</span>
                    <Link href="/newsPage" className="hover:text-[#140079] transition-colors duration-300 ease-in-out">
                        News
                    </Link>
                    <span className="mx-2">•</span>
                    <span className="text-[#140079]">Empowering Customers through ISO Recertifications</span>
                </nav>

                {/* Article Content */}
                <article className="prose prose-xl max-w-none">
                    {/* Article Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#140079] mb-8 leading-tight">
                        Empowering Customers through ISO Recertifications
                    </h1>

                    {/* Article Description */}
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        Dave Healy, Head of SHEQ, discusses how our recent ISO recertifications in ISO 9001, ISO 14001, and ISO 45001 empower our customers with confidence in quality, environmental responsibility, and workplace safety.
                    </p>
                    
                                         {/* Author Section with Headshot */}
                     <div className="flex items-start gap-8 mb-8">
                         <div className="flex-shrink-0">
                             <img 
                                 src="/news/news4.png" 
                                 alt="Dave Healy, Head of SHEQ" 
                                 className="w-36 h-44 rounded-lg object-cover border-2 border-[#140079]/20"
                             />
                         </div>
                         <div className="flex-1 pt-2">
                             <h3 className="text-xl font-bold text-[#140079] mb-3">Dave Healy, Head of SHEQ</h3>
                             <p className="text-lg text-gray-700 leading-relaxed">
                                 In today's competitive marketplace, the assurance of quality, safety, and security is not just a luxury—it's a necessity. Customers are more discerning than ever, seeking partners who can guarantee excellence in every aspect of their operations.
                             </p>
                         </div>
                     </div>
                    
                    {/* Main Content */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        At Indigo, we understand these concerns, and we're proud to announce our recent recertification in ISO standards: ISO 9001, ISO 14001 and ISO 45001. These certifications are more than just formalities; they are integral to addressing the challenges our customers face and ensuring we provide the highest level of service and reliability.
                    </p>

                    {/* The Problem Section */}
                    <h3 className="text-2xl font-bold text-[#140079] mb-4">The Problem: Navigating a Sea of Uncertainty</h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        For businesses today, choosing the right partner can be daunting. With numerous options available, how can you be sure that your chosen provider will meet your expectations, adhere to stringent quality standards, protect your data, and ensure a safe working environment?
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        These questions are not just theoretical; they are practical concerns that can significantly impact your operations, reputation, and bottom line. The risk of partnering with a company that doesn't meet these standards can lead to poor quality products, environmental non-compliance, data breaches, and unsafe working conditions—all of which can have severe repercussions for your business.
                    </p>

                                         {/* ISO Certifications Section */}
                     <h3 className="text-2xl font-bold text-[#140079] mb-4">Indigo's ISO Recertifications</h3>
                     <p className="text-lg text-gray-700 leading-relaxed mb-6">
                         At Indigo, we tackle these challenges head-on. Our recent recertification in ISO 9001, ISO 14001, and ISO 45001 along with our existing ISO 27001 certification reaffirms our commitment to excellence and continuous improvement. Here's how each certification directly benefits you:
                     </p>

                     {/* Team Photo Section - Moved up to ISO section */}
                     <div className="my-8">
                         <img 
                             src="/news/newspage4.png" 
                             alt="Indigo team collaboration" 
                             className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                         />
                         <p className="text-center text-gray-600 text-sm mt-2 italic">
                             Our dedicated team of professionals working together to maintain the highest standards
                         </p>
                     </div>

                    {/* ISO 9001 */}
                    <h4 className="text-xl font-bold text-[#140079] mb-3">ISO 9001: Quality Management Systems</h4>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        ISO 9001 certification ensures that we consistently provide products and services that meet customer and regulatory requirements. For you, this means:
                    </p>
                    <ul className="text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li className="font-medium">• Reliability: Consistent quality in every product and service we deliver.</li>
                        <li className="font-medium">• Efficiency: Streamlined processes that reduce waste and enhance productivity.</li>
                        <li className="font-medium">• Customer Satisfaction: Enhanced focus on meeting customer expectations and continuous improvement.</li>
                    </ul>

                    {/* ISO 14001 */}
                    <h4 className="text-xl font-bold text-[#140079] mb-3">ISO 14001: Environmental Management Systems</h4>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        With ISO 14001 certification, we demonstrate our commitment to sustainable practices. This translates to:
                    </p>
                    <ul className="text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li className="font-medium">• Environmental Responsibility: Assurance that our operations minimize environmental impact.</li>
                        <li className="font-medium">• Regulatory Compliance: Confidence that we meet all environmental regulations and standards.</li>
                        <li className="font-medium">• Sustainability: Partnering with a company that values and actively works towards environmental stewardship.</li>
                    </ul>

                    {/* ISO 27001 */}
                    <h4 className="text-xl font-bold text-[#140079] mb-3">ISO 27001: Information Security Management Systems</h4>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        In an era where data breaches are rampant, ISO 27001 certification provides you with:
                    </p>
                    <ul className="text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li className="font-medium">• Data Security: Robust measures to protect your sensitive information from threats.</li>
                        <li className="font-medium">• Trust: Confidence that your data is handled with the highest standards of security.</li>
                        <li className="font-medium">• Risk Management: Proactive identification and mitigation of information security risks.</li>
                    </ul>

                    {/* ISO 45001 */}
                    <h4 className="text-xl font-bold text-[#140079] mb-3">ISO 45001: Occupational Health and Safety Management Systems</h4>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        ISO 45001 certification ensures a safe and healthy workplace, which benefits you by:
                    </p>
                    <ul className="text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li className="font-medium">• Worker Safety: Assurance that our employees operate in a safe environment, reducing the risk of accidents and injuries.</li>
                        <li className="font-medium">• Compliance: Adherence to occupational health and safety regulations, reducing the risk of legal issues.</li>
                        <li className="font-medium">• Productivity: A safer workplace leads to higher employee morale and productivity, ensuring better service for you.</li>
                    </ul>

                                                              {/* Why Choose Indigo Section */}
                     <h3 className="text-2xl font-bold text-[#140079] mb-4">Why Choose Indigo?</h3>
                     <p className="text-lg text-gray-700 leading-relaxed mb-6">
                         By choosing Indigo, you are partnering with a company that cares about international standards in quality, environmental management, information security, and occupational health and safety. Our engineers bring unparalleled experience and expertise to every project, backed by these robust certifications. This integrated approach ensures that we can deliver superior products and services that align with your values and business objectives.
                     </p>

                    {/* Conclusion */}
                    <h3 className="text-2xl font-bold text-[#140079] mb-4">Confidence Through Certification</h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        Our ISO recertifications are more than just achievements; they are a promise to you as our customers. They symbolize our commitment to maintaining the highest standards in all aspects of our operations. When you choose Indigo, you choose a partner dedicated to excellence, sustainability, security, and safety.
                    </p>
                </article>

                {/* Share Section
                <div className="border-t border-gray-200 pt-8 text-center">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: "Empowering Customers through ISO Recertifications",
                                    text: "Dave Healy, Head of SHEQ, discusses how our recent ISO recertifications in ISO 9001, ISO 14001, and ISO 45001 empower our customers with confidence in quality, environmental responsibility, and workplace safety.",
                                    url: window.location.href
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }
                        }}
                        className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out hover:scale-105"
                    >
                        <FaShare className="mr-2" />
                        Share this article
                    </button>
                </div> */}
            </main>
        </div>
    );
}
