'use client';

import Link from 'next/link';
import { FaCalendar, FaShare, FaDownload, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function PRSubseaSecurityServicesPage() {

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
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
                
                <div className="relative z-10 h-full flex items-center">
                    <div className="w-full max-w-6xl mx-auto px-8">
                        <div className="text-white">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                                Press Release: Subsea Security Services
                            </h1>
                            <div className="flex items-center text-white">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                    <FaCalendar className="text-lg" />
                                </div>
                                <span className="text-2xl font-medium tracking-wide">14 May 2024</span>
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
                    <span className="text-[#140079]">Press Release: Subsea Security Services</span>
                </nav>

                {/* Article Content */}
                <article className="prose prose-xl max-w-none">
                    {/* Article Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#140079] mb-8 leading-tight">
                        Indigo Welcomes EU Recommendations For More Resilient Marine Infrastructure As It Advances Its Own Subsea Security Services
                    </h1>

                    {/* Article Description */}
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        Magor, Monmouthshire — 15th May 2024: Indigo, a leading provider of engineering and support services for subsea cabling, welcomes EU recommendations for member states to map submarine infrastructure and assess risks and vulnerabilities as part of a drive to make subsea cables more secure and resilient.
                    </p>
                    
                    {/* Main Content */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        The Commission Recommendation, published in February 2024, is concerned that networks and services are "a prime target for cyberattacks", something that Indigo has been addressing for some time in partnership with hyperscale subsea infrastructure providers. A number of initiatives have already advanced Indigo's capabilities, including the appointment of William Rendle as Head of Information Security. Rendle's previous experiences include directing technology GRC (Governance, Risk and Compliance), digitisation, cyber and information security change programmes within highly regulated environments globally.
                    </p>

                    {/* Ian Duggan Section with Headshot */}
                    <div className="flex items-start gap-8 mb-8">
                        <div className="flex-shrink-0">
                            <img 
                                src="/News/newspage5_1.jpg" 
                                alt="Ian Duggan, CEO of Indigo" 
                                className="w-36 h-44 rounded-lg object-cover border-2 border-[#140079]/20"
                            />
                        </div>
                        <div className="flex-1 pt-2 text-center">
                            <h3 className="text-xl font-bold text-[#140079] mb-3">Ian Duggan, CEO of Indigo</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                "William brings two decades of experience in technology risk management and delivery to Indigo as we look to build on our leadership position as a network support and security provider. His skills will be particularly relevant for our continued growth in the US and in the subsea market, where cybersecurity is a priority for the hyperscale tech companies we support."
                            </p>
                        </div>
                    </div>

                    {/* William Rendle Section with Headshot */}
                    <div className="flex items-start gap-8 mb-8">
                        <div className="flex-shrink-0">
                            <img 
                                src="/News/newspage5_2.jpg" 
                                alt="William Rendle, Head of Information Security" 
                                className="w-36 h-44 rounded-lg object-cover border-2 border-[#140079]/20"
                            />
                        </div>
                        <div className="flex-1 pt-10 text-center">
                            <h3 className="text-xl font-bold text-[#140079] mb-3">William Rendle, Head of Information Security</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                "I'm looking forward to further developing Indigo's cybersecurity capabilities, building on the great work of a team that has security embedded in its culture."
                            </p>
                        </div>
                    </div>

                    {/* Additional Content */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Since entering the subsea support market in 2021, Indigo has opened a second Network Operations Centre(NOC) in the States, emulating the original NOC in South Wales in being 'security aware', providing clients with a combination of fault and threat identification capabilities.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Duggan said about the strategy, "A modern NOC must be able to cross-reference data when tracking an incident and ascertain if there are any security implications. It is increasingly important that network monitoring capabilities can identify early indicators of a cyberattack."
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Aware that service providers themselves are a potential target for cyber criminals, Indigo has narrowed its own threat surface by ensuring full ownership of all connectivity around its remote monitoring service. Its carrier-grade IP-based Data Communication Network (DCN) has advanced security features for high availability and redundancy. The Indigo NOC teams have a forensic level of understanding of the equipment they use, which is always procured as new, direct from the factory.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        A Salesforce-driven system is key to the model, integrating APIs from multiple vendor platforms to capture all events and alerts through a single pane of glass for lightning-fast incident management. At the same time, the Salesforce system is gathering incident data for root cause and trend analysis to inform a more proactive approach to security and maintenance. Indigo ensures its team's processes conform to international critical infrastructure requirements by meeting stringent NIST, ISO 27001 and NSA standards.
                    </p>

                    {/* Contact Information */}
                    <div className="bg-gray-100 p-6 rounded-lg mb-8">
                        <h3 className="text-xl font-bold text-[#140079] mb-4">To find out more, please contact:</h3>
                        <div className="flex items-center gap-4 mb-2">
                            <FaEnvelope className="text-[#140079] text-lg" />
                            <span className="text-lg font-medium">Liz Edwards, Marketing and Communications Director</span>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <FaEnvelope className="text-[#140079] text-lg" />
                            <a href="mailto:liz.edwards@indigotg.com" className="text-lg text-[#140079] hover:underline">
                                liz.edwards@indigotg.com
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaPhone className="text-[#140079] text-lg" />
                            <a href="tel:+353868171512" className="text-lg text-[#140079] hover:underline">
                                +353 86 817 1512
                            </a>
                        </div>
                    </div>

                    {/* About Indigo Section */}
                    <h3 className="text-2xl font-bold text-[#140079] mb-4">About Indigo</h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Indigo provides design, deploy and support engineering services to fixed and mobile carriers, tech companies, and the enterprise sector since 1998.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Indigo collaborate, challenge, research, and develop to enable their customers to stay ahead of emerging and expanding technologies. With the brightest minds and leading technical insights in the business, they design to innovate, deploy to evolve, and support to enhance the performance of digital infrastructure better, faster, and safely.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        Visit us at: <a href="https://www.indigotg.com" target="_blank" rel="noopener noreferrer" className="text-[#140079] hover:underline font-medium">www.indigotg.com</a>
                    </p>

                    {/* Download Button */}
                    <div className="text-center mb-12">
                        <a
                            href="/News/Indigo-Security-Press-Release_-May-2024-.pdf"
                            download
                            className="inline-flex items-center px-8 py-4 bg-[#140079] text-white rounded-lg hover:bg-[#0f0057] transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
                        >
                            <FaDownload className="mr-3 text-xl" />
                            Download the full Press Release here
                        </a>
                    </div>
                </article>

                {/* Share Section
                <div className="border-t border-gray-200 pt-8 text-center">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: "Press Release: Subsea Security Services",
                                    text: "Indigo Welcomes EU Recommendations For More Resilient Marine Infrastructure As It Advances Its Own Subsea Security Services",
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
