'use client';

import Link from 'next/link';
import { FaCalendar, FaShare } from 'react-icons/fa';

export default function USFiberPodcastPage() {
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
                                US Fiber podcast
                            </h1>
                            <div className="flex items-center text-white">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                    <FaCalendar className="text-lg" />
                                </div>
                                <span className="text-2xl font-medium tracking-wide">03 July 2024</span>
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
                    <span className="text-[#140079]">US Fiber podcast</span>
                </nav>

                {/* Article Content */}
                <article className="prose prose-xl max-w-none">
                    {/* Article Title with Emoji */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#140079] mb-8 leading-tight">
                        🎙️ The UK Experience: Consolidation in Broadband Markets is America's Future
                    </h1>

                    {/* Article Description */}
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        Brad Hine chats with Ray O'Connor, Sr VP of Sales at Indigo, to discuss the evolving landscape of broadband connectivity in the US. Ray highlights the critical role of private equity in the fiber-to-the-home market and the transformative impact on both the U.K. and U.S.
                    </p>
                    
                    {/* Article Body */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        In this insightful episode, Ray delves into the current state and future of broadband in the US, highlighting key issues such as:
                    </p>
                    
                    {/* Key Points List */}
                    <ol className="text-lg text-gray-700 leading-relaxed mb-12 space-y-3">
                        <li className="font-medium">Rural Connectivity Inequity</li>
                        <li className="font-medium">Importance of PE's role in closing the digital divide</li>
                        <li className="font-medium">How connectivity can change lives, economies and environment</li>
                    </ol>

                    {/* Podcast Section */}
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-[#140079] mb-4">LISTEN NOW</h2>
                        <p className="text-xl text-gray-700 mb-6">Ray O'Connor podcast</p>

                        {/* Podcast Image */}
                        <div className="mb-6">
                            <img
                                src="/news/NewsTemplate/t1/img1.jpg"
                                alt="Ray O'Connor Podcast"
                                className="w-full max-w-sm mx-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
                            />
                        </div>

                        {/* Listen Button */}
                        <a
                            href="https://soundcloud.com/broadband-bunch/bb-061424-ray-oconnor-v-3-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 bg-[#140079] text-white font-bold rounded-full hover:bg-[#0a0033] transition-all duration-300 ease-in-out text-lg shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            🎧 Listen on SoundCloud
                        </a>
                    </div>
                </article>

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-8 text-center">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: "US Fiber podcast",
                                    text: "Brad Hine chats with Ray O'Connor, Sr VP of Sales at Indigo, to discuss the evolving landscape of broadband connectivity in the US.",
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
