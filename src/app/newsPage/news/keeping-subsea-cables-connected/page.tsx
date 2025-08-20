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
                    {/* Article Title with Emoji */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#140079] mb-8 leading-tight">
                        🌊 Keeping Subsea Cables Connected: Security & Operations
                    </h1>

                    {/* Article Description */}
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        Discover how we keep subsea cables secure and operational amid growing threats. Learn about proactive tracking, timely fault fixing, and the technology behind maintaining the backbone of global data traffic.
                    </p>
                    
                    {/* Article Body */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Our comprehensive approach to subsea cable security involves advanced monitoring systems, rapid response protocols, and cutting-edge technology to ensure uninterrupted global connectivity.
                    </p>
                    
                    {/* Security Measures Section */}
                    <h3 className="text-2xl font-bold text-[#140079] mb-4">Security Measures</h3>
                    <ul className="text-lg text-gray-700 leading-relaxed mb-12 space-y-3">
                        <li className="font-medium">Proactive threat monitoring and detection</li>
                        <li className="font-medium">Advanced tracking systems for cable integrity</li>
                        <li className="font-medium">Rapid response protocols for fault resolution</li>
                        <li className="font-medium">Innovative technology for maintenance and repair</li>
                    </ul>

                    {/* Conclusion */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        Read insights from Kathy Kirchner, Network Operations VP for Americas, on how we maintain the backbone of global data traffic.
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
