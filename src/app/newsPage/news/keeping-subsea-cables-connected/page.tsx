'use client';

import Link from 'next/link';
import { FaCalendar, FaShare } from 'react-icons/fa';

export default function KeepingSubseaCablesConnectedPage() {

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
                                Keeping subsea cables connected
                            </h1>
                            <div className="flex items-center text-white">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                    <FaCalendar className="text-lg" />
                                </div>
                                <span className="text-2xl font-medium tracking-wide">27 May 2024</span>
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
                    <span className="text-[#140079]">Keeping subsea cables connected</span>
                </nav>

                {/* Article Content */}
                <article className="prose prose-xl max-w-none">
                                         {/* Article Title */}
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#140079] mb-8 leading-tight">
                         Keeping subsea cables connected
                     </h1>

                                         {/* Author Section */}
                     <div className="mb-8">
                         <h3 className="text-xl font-bold text-[#140079] mb-3">By Kathy Kirchner, Network Operations VP for Americas</h3>
                     </div>

                     {/* Author Image */}
                     <div className="my-8">
                         <img 
                             src="/news/newspage3_1.jpg" 
                             alt="Kathy Kirchner, Network Operations VP for Americas" 
                             className="rounded-lg shadow-lg"
                         />
                     </div>

                     {/* Author Description Below Image */}
                     <div className="mb-8">
                         <p className="text-lg text-gray-700 leading-relaxed">
                             Subsea cables carrying 99% of the world's data traffic are an increasing cause for security concerns after maritime incidents in the Ukraine and Gaza highlighted their vulnerabilities. Both war zones have seen undersea infrastructure destroyed or damaged, the Nord Stream gas pipeline in the Baltic Sea and internet cables in the Red Sea.
                         </p>
                     </div>
                    
                    {/* Main Content */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        [Find out more about our cybersecurity capabilities in my previous blog "Rising up to meet subsea cybersecurity challenges"]
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Targeting pipes and cables in acts of aggression adds to more benign risks that the subsea sector has learned to live with and has fuelled calls in US and European administrations for making maritime infrastructure more resilient. The threats fall into three categories: natural events, external factors, and human error.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Natural events account for around a fifth of incidents and range from extreme weather to undersea geological activity, like the 2022 eruption that took out the single cable that connected the island of Tonga to the internet. External factors include power outages, land-based communication infrastructure going down, or cable operators falling short on backup and maintenance responsibilities.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Unintentional human error is by far the biggest problem, contributing to more than 70% of yearly incidents. According to a European Parliament report in 2022, 40% of cable disruptions are caused by commercial fishing and dredging equipment; another 15% of damage is down to anchoring incidents, related to adverse sea conditions and dropping anchors outside approved areas.
                    </p>

                    {/* Indigo Subsea NOC engineers image */}
                    <div className="my-8">
                                                 <img 
                             src="/news/newspage3_2.jpg" 
                             alt="Indigo Subsea NOC engineers keeping submarine cables monitored" 
                             className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                         />
                        <p className="text-center text-gray-600 text-sm mt-2 italic">
                            Indigo Subsea NOC engineers keeping submarine cables monitored
                        </p>
                    </div>

                                         {/* Preventative ship tracking section */}
                     <h2 className="text-3xl md:text-4xl font-bold text-[#140079] mb-6">Preventative ship tracking</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        In our role as a subsea systems operator support provider, our job is to be proactive in identifying any of the above issues and set in motion plans to fix breaks or outages that might occur, as quickly and cost-effectively as possible. To do this we use a combination of existing technologies and innovative new systems, borne of a need to meet the demands of hyperscale tech companies who have made huge investments in subsea cables and expect more resilience.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Like everyone involved in the shipping industry, we use the automatic identification system (AIS) to track transponders on ships, which provides a satellite view onscreen that displays the position of each vessel as well as its course and speed. It has a similar function to marine radar, a system primarily used to aid navigation and avoid collisions, but what we use it to identify any vessels approaching a geofenced zone a logical zone, marked around the physical location of an undersea cable.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        If a ship enters a zone and exhibits predetermined criteria – like a fishing vessel moving at a slow speed or a large vessel maneuvering to drop anchor – an alert is generated. Using AIS is mandatory under international maritime law, so if it's switched off and a vessel is identified through other means, it immediately arouses suspicion of illicit activity and a possible threat to subsea cables.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        For the most part, our 24x7x365 tracking service ends with our team contacting the vessel and making sure any risk of cable damage is averted.
                    </p>

                                         {/* Indigo Subsea Infographic image */}
                     <div className="my-8">
                         <img 
                             src="/news/newspage3_3.png" 
                             alt="Indigo Subsea Infographic" 
                             className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                         />
                         <p className="text-center text-gray-600 text-sm mt-2 italic">
                             Indigo Subsea Infographic
                         </p>
                     </div>

                                         {/* Timely fault fixing section */}
                     <h2 className="text-3xl md:text-4xl font-bold text-[#140079] mb-6">Timely fault fixing</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        In the event of an outage, caused by a cable break or an electric shunt, our NOC (Network Operations Centre) must identify what the issue is. The average ocean depth is 3,682m, which makes any remote and underwater visual monitoring expensive and time consuming, and extremely challenging. It is, therefore, imperative to identify the precise location of a fault.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        If it's an electrical short circuit, (or shunt fault) our NOC Team uses the system "as-built" data and the voltage and current values from PFE Power Feed Equipment to carry out a complex calculation to estimate the fault location.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        If the fault is a cable break or an individual fiber break, we use a technique called Coherent Optical Time Domain Reflectometry (COTDR) to locate the damaged area. The COTDR shoots optical pulses down the fiber and accurately measures the reflected power and time taken for the light to return.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Having provided the expertise to locate and isolate the fault, we coordinate the dispatch of the ship to carry out the repairs. It's an expensive business – sending a repair vessel to fix a broken cable can cost several tens of thousands of dollars a day – so ensuring an accurate, timely and successful fix is paramount. That's why we often provide an on-board representative, for quality assurance and to ensure the repairs are carried out in accordance with the best interests of our customers.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Essentially, we provide an end-to-end service from fault identification to remediation, all run out from our dedicated Subsea NOC. It demands a challenging combination of skills that we have been developing over many years – the technical ability to locate a fault and the logistical know-how to fix it cost effectively.
                    </p>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        If you want to find out more about how Indigo Subsea go to <Link href="/solutions/subsea" className="text-[#140079] hover:underline font-semibold">Indigo Subsea webpage</Link>.
                    </p>
                </article>

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-8 text-center">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: "Keeping subsea cables connected",
                                    text: "Discover how we keep subsea cables secure and operational amid growing threats. Learn about proactive tracking, timely fault fixing, and the technology behind maintaining the backbone of global data traffic.",
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
                </div>
            </main>
        </div>
    );
}
