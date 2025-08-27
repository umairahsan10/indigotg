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
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
                
                <div className="relative z-10 h-full flex items-center">
                    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="text-white">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
                                US Fiber podcast
                            </h1>
                            <div className="flex items-center text-white px-2 sm:px-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                                    <FaCalendar className="text-sm sm:text-base md:text-lg" />
                                </div>
                                <span className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide">03 July 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
                {/* Breadcrumb */}
                <nav className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 overflow-x-auto">
                    <div className="flex items-center min-w-max">
                        <Link href="/" className="hover:text-[#140079] transition-colors duration-300 ease-in-out">
                            Home
                        </Link>
                        <span className="mx-2">•</span>
                        <Link href="/newsPage" className="hover:text-[#140079] transition-colors duration-300 ease-in-out">
                            News
                        </Link>
                        <span className="mx-2">•</span>
                        <span className="text-[#140079]">US Fiber podcast</span>
                    </div>
                </nav>

                {/* Article Content */}
                <article className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none">
                    {/* Article Title with Emoji */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#140079] mb-6 sm:mb-8 leading-tight">
                        🎙️ The UK Experience: Consolidation in Broadband Markets is America's Future
                    </h1>

                    {/* Article Description */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                        Brad Hine chats with Ray O'Connor, Sr VP of Sales at Indigo, to discuss the evolving landscape of broadband connectivity in the US. Ray highlights the critical role of private equity in the fiber-to-the-home market and the transformative impact on both the U.K. and U.S.
                    </p>
                    
                    {/* Article Body */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                        In this insightful episode, Ray delves into the current state and future of broadband in the US, highlighting key issues such as:
                    </p>
                    
                    {/* Key Points List */}
                    <ol className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-12 space-y-2 sm:space-y-3 pl-4 sm:pl-6">
                        <li className="font-medium">Rural Connectivity Inequity</li>
                        <li className="font-medium">Importance of PE's role in closing the digital divide</li>
                        <li className="font-medium">How connectivity can change lives, economies and environment</li>
                    </ol>

                    {/* Podcast Section */}
                    <div className="mb-8 sm:mb-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#140079] mb-3 sm:mb-4">LISTEN NOW</h2>
                        <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6">Ray O'Connor podcast</p>

                        {/* Podcast Image */}
                        <div className="mb-4 sm:mb-6">
                            <img
                                src="/news/NewsTemplate/t1/img1.jpg"
                                alt="Ray O'Connor Podcast"
                                className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
                            />
                        </div>

                        {/* Listen Button */}
                        <a
                            href="https://soundcloud.com/broadband-bunch/bb-061424-ray-oconnor-v-3-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#140079] text-white font-bold rounded-full hover:bg-[#0a0033] transition-all duration-300 ease-in-out text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            🎧 Listen on SoundCloud
                        </a>
                    </div>
                </article>

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-6 sm:pt-8 text-center">
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
                        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out hover:scale-105 text-sm sm:text-base"
                    >
                        <FaShare className="mr-2" />
                        Share this article
                    </button>
                </div>
            </main>
        </div>
    );
}
