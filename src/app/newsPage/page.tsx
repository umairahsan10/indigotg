'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
    FaLightbulb,
    FaRocket,
    FaPuzzlePiece,
    FaChartLine,
    FaArrowRight
} from 'react-icons/fa';
import './newsPage.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function NewsPage() {
    const pinnedSectionRef = useRef<HTMLElement>(null);
    const stickyHeaderRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const progressBarContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const indicesContainerRef = useRef<HTMLDivElement>(null);
    const indicesRef = useRef<HTMLDivElement[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;

    // Pagination function
    const showPage = (pageNumber: number) => {
        // Hide all pages
        const pages = document.querySelectorAll('.news-page');
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        
        // Show the selected page
        const selectedPage = document.querySelector(`[data-page="${pageNumber}"]`);
        if (selectedPage) {
            selectedPage.classList.remove('hidden');
        }
        
        // Update current page state
        setCurrentPage(pageNumber);
        
        // Smooth scroll to the top of the news section
        const newsSection = document.querySelector('#news-section');
        if (newsSection) {
            newsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis();

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Animation setup
        const cards = cardsRef.current;
        const cardCount = cards.length;
        const pinnedHeight = window.innerHeight * (cardCount + 1);
        const startRotations = [0, 5, 0, -5];
        const endRotations = [-10, -5, 10, 5];
        const progressColors = ['#ecb74c', '#7dd8cd', '#e0ff57', '#7dd8cd'];

        // Set initial card rotations
        cards.forEach((card, index) => {
            gsap.set(card, { rotation: startRotations[index] });
        });

        let isProgressBarVisible = false;
        let currentActiveIndex = -1;

        function animateIndexOpacity(newIndex: number) {
            if (newIndex !== currentActiveIndex) {
                indicesRef.current.forEach((index, i) => {
                    // Remove active class from all indices
                    index.classList.remove('active');

                    gsap.to(index, {
                        opacity: i === newIndex ? 1 : 0.25,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                });

                // Add active class to current index
                if (newIndex >= 0 && indicesRef.current[newIndex]) {
                    indicesRef.current[newIndex].classList.add('active');
                }

                currentActiveIndex = newIndex;
            }
        }

        function showProgressAndIndices() {
            gsap.to([progressBarContainerRef.current, indicesContainerRef.current], {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
            });
            isProgressBarVisible = true;
        }

        function hideProgressAndIndices() {
            gsap.to([progressBarContainerRef.current, indicesContainerRef.current], {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
            isProgressBarVisible = false;
            animateIndexOpacity(-1);
        }

        // Create ScrollTrigger
        const scrollTrigger = ScrollTrigger.create({
            trigger: pinnedSectionRef.current,
            start: 'top top',
            end: `+=${pinnedHeight}`,
            pin: true,
            pinSpacing: true,
            onLeave: () => {
                hideProgressAndIndices();
            },
            onEnterBack: () => {
                showProgressAndIndices();
            },
            onUpdate: (self) => {
                const progress = self.progress * (cardCount + 1);
                const currentCard = Math.floor(progress);

                if (progress <= 1) {
                    gsap.to(stickyHeaderRef.current, {
                        opacity: 1 - progress,
                        duration: 0.1,
                        ease: 'none',
                    });
                } else {
                    gsap.set(stickyHeaderRef.current, { opacity: 0 });
                }

                if (progress > 1 && !isProgressBarVisible) {
                    showProgressAndIndices();
                } else if (progress <= 1 && isProgressBarVisible) {
                    hideProgressAndIndices();
                }

                let progressHeight = 0;
                let colorIndex = -1;
                if (progress > 1) {
                    progressHeight = ((progress - 1) / cardCount) * 100;
                    colorIndex = Math.min(Math.floor(progress - 1), cardCount - 1);
                }

                gsap.to(progressBarRef.current, {
                    height: `${progressHeight}%`,
                    backgroundColor: progressColors[colorIndex],
                    duration: 0.3,
                    ease: 'power1.out',
                });

                if (isProgressBarVisible) {
                    animateIndexOpacity(colorIndex);
                }

                cards.forEach((card, index) => {
                    if (index < currentCard) {
                        gsap.set(card, {
                            top: '50%',
                            rotation: endRotations[index],
                        });
                    } else if (index === currentCard) {
                        const cardProgress = progress - currentCard;
                        const newTop = gsap.utils.interpolate(150, 50, cardProgress);
                        const newRotation = gsap.utils.interpolate(
                            startRotations[index],
                            endRotations[index],
                            cardProgress
                        );
                        gsap.set(card, {
                            top: `${newTop}%`,
                            rotation: newRotation,
                        });
                    } else {
                        gsap.set(card, {
                            top: '150%',
                            rotation: startRotations[index],
                        });
                    }
                });
            },
        });

        // Cleanup function
        return () => {
            scrollTrigger.kill();
            lenis.destroy();
        };
    }, []);

    const addCardRef = (el: HTMLDivElement | null, index: number) => {
        if (el) cardsRef.current[index] = el;
    };

    const addIndexRef = (el: HTMLDivElement | null, index: number) => {
        if (el) indicesRef.current[index] = el;
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section
                className="w-screen h-screen overflow-hidden bg-black hero-section"
                style={{
                    background: 'url(/News/hero.jpg) no-repeat 50% 50%',
                    backgroundSize: 'cover'
                }}
            />

            {/* Pinned Section */}
            <section
                ref={pinnedSectionRef}
                className="relative w-screen h-screen overflow-hidden bg-white"
            >
                {/* Sticky Header */}
                <div
                    ref={stickyHeaderRef}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 sticky-header"
                >
                    <h1 className="text-[8vw] font-light text-[#140079] [-webkit-text-stroke:2px_#fff] text-center whitespace-nowrap">
                        Trending News
                    </h1>
                </div>

                {/* Progress Bar */}
                <div
                    ref={progressBarContainerRef}
                    className="absolute top-0 right-0 w-2 h-full bg-white opacity-0 progress-bar"
                >
                    <div
                        ref={progressBarRef}
                        className="w-full h-0 bg-[#353531]"
                    />
                </div>

                {/* Indices */}
                <div
                    ref={indicesContainerRef}
                    className="absolute top-0 right-6 h-full flex flex-col justify-center gap-16 opacity-0 indices"
                >
                    <div ref={(el) => addIndexRef(el, 0)} className="text-right opacity-25 index">
                        <p className="text-[#ecb74c] line-through uppercase text-sm">
                            <FaLightbulb className="inline w-4 h-4 mr-2" />
                        </p>
                        <p className="text-[#ecb74c] text-sm">03 July 2024</p>
                        <p className="text-[#ecb74c] text-lg">US Fiber Podcast</p>
                    </div>
                    <div ref={(el) => addIndexRef(el, 1)} className="text-right opacity-25 index">
                        <p className="text-[#7dd8cd] line-through uppercase text-sm">
                            <FaRocket className="inline w-4 h-4 mr-2" />
                        </p>
                        <p className="text-[#7dd8cd] text-sm">07 June 2024</p>
                        <p className="text-[#7dd8cd] text-lg">Indigo Company Growth</p>
                    </div>
                    <div ref={(el) => addIndexRef(el, 2)} className="text-right opacity-25 index">
                        <p className="text-[#e0ff57] line-through uppercase text-sm">
                            <FaPuzzlePiece className="inline w-4 h-4 mr-2" />
                        </p>
                        <p className="text-[#e0ff57] text-sm">27 May 2024</p>
                        <p className="text-[#e0ff57] text-lg">Subsea Cables</p>
                    </div>
                    <div ref={(el) => addIndexRef(el, 3)} className="text-right opacity-25 index">
                        <p className="text-[#7dd8cd] line-through uppercase text-sm">
                            <FaChartLine className="inline w-4 h-4 mr-2" />
                        </p>
                        <p className="text-[#7dd8cd] text-sm">24 May 2024</p>
                        <p className="text-[#7dd8cd] text-lg">ISO Recertifications</p>
                    </div>
                </div>

                {/* Cards */}
                <div
                    ref={(el) => addCardRef(el, 0)}
                    id="card-1"
                    className="absolute top-[150%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[45%] h-[55%] flex justify-center items-center bg-black rounded-2xl overflow-hidden border-2 border-[rgba(236,183,76,0.35)] card"
                    style={{
                        background: 'url(/News/card-1.png) no-repeat 50% 50%',
                        backgroundSize: 'cover'
                    }}
                >
                    <div className="text-center">
                        <h1 className="text-5xl font-light leading-[90%] text-white">
                            US Fiber <span className="text-transparent [-webkit-text-stroke:1.25px_#fff]">Podcast</span>
                        </h1>
                        <p className="text-lg mt-4 px-6 leading-relaxed text-white">
                            Brad Hine and Ray O'Connor, Sr. VP at Indigo, discuss private equity's role in fiber-to-the-home and its impact in the U.S. and U.K.
                        </p>
                        <a
                            href="https://www.indigotg.com/news/the-uk-experience/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-4 px-5 py-2 bg-[#ecb74c] text-black font-semibold rounded-full text-sm"
                        >
                            Read More
                            <FaArrowRight className="ml-2 w-3 h-3" />
                        </a>
                    </div>
                </div>

                <div
                    ref={(el) => addCardRef(el, 1)}
                    id="card-2"
                    className="absolute top-[150%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[45%] h-[55%] flex justify-center items-center bg-black rounded-2xl overflow-hidden border-2 border-[rgba(125,216,205,0.35)] card"
                    style={{
                        background: 'url(/News/card-2.png) no-repeat 50% 50%',
                        backgroundSize: 'cover'
                    }}
                >

                    <div className="text-center">
                        <h1 className="text-5xl font-light leading-[90%] text-white">
                            Indigo Company <span className="text-transparent [-webkit-text-stroke:1.25px_#fff]">Growth</span>
                        </h1>
                        <p className="text-lg mt-4 px-6 leading-relaxed text-white">
                            Indigo announces new leaders, ISO certification, a Grant Thornton award, and U.S. expansion, showcasing our growth and excellence.
                        </p>
                        <a
                            href="https://www.indigotg.com/news/indigo-company-achievements-june-2024/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-4 px-5 py-2 bg-[#7dd8cd] text-black font-semibold rounded-full text-sm"
                        >
                            Read More
                            <FaArrowRight className="ml-2 w-3 h-3" />
                        </a>
                    </div>
                </div>

                <div
                    ref={(el) => addCardRef(el, 2)}
                    id="card-3"
                    className="absolute top-[150%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[45%] h-[55%] flex justify-center items-center bg-black rounded-2xl overflow-hidden border-2 border-[rgba(224,255,87,0.35)] card"
                    style={{
                        background: 'url(/News/card-3.png) no-repeat 50% 50%',
                        backgroundSize: 'cover'
                    }}
                >

                    <div className="text-center">
                        <h1 className="text-5xl font-light leading-[90%] text-white">
                            Keeping Subsea <span className="text-transparent [-webkit-text-stroke:1.25px_#fff]">Connected</span>
                        </h1>
                        <p className="text-lg mt-4 px-6 leading-relaxed text-white">
                            Learn how we secure subsea cables against rising threats with proactive tracking, rapid repairs, and advanced tech. Insights from Kathy Kirchner, VP of Network Operations, Americas.
                        </p>
                        <a
                            href="https://www.indigotg.com/news/subsea-cable-security/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-4 px-5 py-2 bg-[#e0ff57] text-black font-semibold rounded-full text-sm"
                        >
                            Read More
                            <FaArrowRight className="ml-2 w-3 h-3" />
                        </a>
                    </div>
                </div>

                <div
                    ref={(el) => addCardRef(el, 3)}
                    id="card-4"
                    className="absolute top-[150%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[45%] h-[55%] flex justify-center items-center bg-black rounded-2xl overflow-hidden border-2 border-[rgba(125,216,205,0.35)] card"
                    style={{
                        background: 'url(/News/card-4.png) no-repeat 50% 50%',
                        backgroundSize: 'cover'
                    }}
                >

                    <div className="text-center">
                        <h1 className="text-5xl font-light leading-[90%] text-white">
                            Empowering Your <span className="text-transparent [-webkit-text-stroke:1.25px_#fff]">Business</span>
                        </h1>
                        <p className="text-lg mt-4 px-6 leading-relaxed text-white">
                            Our ISO 9001, 14001, and 45001 recertifications reaffirm Indigo's commitment to excellence, sustainability, security, and safety—empowering your business with the highest standards.
                        </p>
                        <a
                            href="https://www.indigotg.com/news/empowering-business-with-iso-recertifications/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-4 px-5 py-2 bg-[#7dd8cd] text-black font-semibold rounded-full text-sm"
                        >
                            Read More
                            <FaArrowRight className="ml-2 w-3 h-3" />
                        </a>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section id="news-section" className="relative bg-blue-50 py-20">
                {/* Gradient overlay at top to merge with section above */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-blue-50 pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Section Title */}
                    <div className="text-center mb-16 mt-16">
                        <h2 className="text-6xl font-light text-white mb-4">Latest News</h2>
                        <p className="text-xl text-white opacity-80">Stay updated with our latest insights and achievements</p>
                    </div>

                    {/* News List */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Page 1 News Items */}
                        <div className="news-page col-span-3 transition-all duration-500 ease-in-out" data-page="1">
                            <div className="grid grid-cols-3 gap-6">
                                {/* Row 1 */}
                                {/* News Item 1 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-1.png" 
                                            alt="US Fiber Podcast" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">03 July 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">01</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">US Fiber Podcast: The UK Experience</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Brad Hine chats with Ray O'Connor, Sr VP of Sales at Indigo, to discuss the evolving landscape of broadband connectivity in the US.
                                        </p>
                                        <a 
                                            href="https://www.indigotg.com/news/the-uk-experience/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 2 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-2.png" 
                                            alt="Indigo Company Growth" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">07 June 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">02</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Indigo: New Leadership, Certifications, Awards, and USA Growth!</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            At Indigo, we are thrilled to share some significant updates that reflect our continuous growth and commitment to excellence.
                                        </p>
                                        <a 
                                            href="https://www.indigotg.com/news/indigo-company-achievements-june-2024/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 3 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-3.png" 
                                            alt="Keeping Subsea Cables Connected" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">27 May 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">03</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Keeping Subsea Cables Connected</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Learn how we secure subsea cables against rising threats with proactive tracking, rapid repairs, and advanced technology.
                                        </p>
                                        <a 
                                            href="https://www.indigotg.com/news/subsea-cable-security/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                {/* News Item 4 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-4.png" 
                                            alt="Empowering Your Business with ISO Recertifications" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">24 May 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">04</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Empowering Your Business with ISO Recertifications</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Our ISO 9001, 14001, and 45001 recertifications reaffirm Indigo's commitment to excellence, sustainability, security, and safety.
                                        </p>
                                        <a 
                                            href="https://www.indigotg.com/news/empowering-business-with-iso-recertifications/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 5 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-1.png" 
                                            alt="Indigo Expands Network Operations Center" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">15 May 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">05</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Indigo Expands Network Operations Center</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            We're excited to announce the expansion of our Network Operations Center, enhancing our 24/7 monitoring capabilities.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 6 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-2.png" 
                                            alt="New Data Center Solutions Launch" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">08 May 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">06</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">New Data Center Solutions Launch</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Indigo introduces cutting-edge data center solutions designed to meet the growing demands of modern businesses.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                {/* News Item 7 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-3.png" 
                                            alt="Wireless Network Innovation Award" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">01 May 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">07</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Wireless Network Innovation Award</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Indigo receives recognition for our innovative approach to wireless network design and deployment.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 8 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-4.png" 
                                            alt="Subsea Cable Maintenance Success" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">25 April 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">08</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Subsea Cable Maintenance Success</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Our team successfully completed critical maintenance on multiple subsea cable systems, ensuring uninterrupted connectivity.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 9 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-1.png" 
                                            alt="5G Network Deployment Milestone" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">18 April 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">09</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">5G Network Deployment Milestone</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Indigo reaches a significant milestone in our 5G network deployment project, bringing high-speed connectivity to underserved rural communities.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Page 2 News Items (Hidden by default) */}
                        <div className="news-page hidden col-span-3 transition-all duration-500 ease-in-out" data-page="2">
                            <div className="grid grid-cols-3 gap-6">
                                {/* Row 1 */}
                                {/* News Item 10 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-2.png" 
                                            alt="Cybersecurity Partnership Announcement" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">12 April 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">10</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Cybersecurity Partnership Announcement</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            We're proud to announce a strategic partnership with leading cybersecurity firms to enhance our network security offerings.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 11 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-3.png" 
                                            alt="Environmental Sustainability Initiative" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">05 April 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">11</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Environmental Sustainability Initiative</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Indigo launches comprehensive environmental sustainability initiatives, including renewable energy integration and carbon footprint reduction.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 12 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-4.png" 
                                            alt="Customer Success Story: Global Bank" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">29 March 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">12</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Customer Success Story: Global Bank</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Discover how Indigo helped a major global bank transform their network infrastructure, resulting in 40% improved performance.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                {/* News Item 13 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-1.png" 
                                            alt="AI-Powered Network Optimization" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">22 March 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">13</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">AI-Powered Network Optimization</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Our new AI-powered network optimization platform is now live, providing real-time insights and automated performance improvements.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 14 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-2.png" 
                                            alt="Industry Conference Participation" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">15 March 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">14</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Industry Conference Participation</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Indigo's experts will be presenting at major industry conferences this year, sharing insights on network infrastructure trends.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 15 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-3.png" 
                                            alt="New Office Opening: Singapore" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">08 March 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">15</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">New Office Opening: Singapore</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            We're excited to announce the opening of our new office in Singapore, expanding our presence in the Asia-Pacific region.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                {/* News Item 16 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-4.png" 
                                            alt="Employee Recognition Program" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">01 March 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">16</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Employee Recognition Program</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Indigo launches our annual employee recognition program, celebrating the outstanding contributions of our team members.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 17 */}
                                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-1.png" 
                                            alt="Network Security Enhancement" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">25 February 2024</span>
                                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">17</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Network Security Enhancement</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            We've implemented advanced security protocols to protect our clients' critical network infrastructure from emerging threats.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>

                                {/* News Item 18 */}
                                <div className="bg-sky-100 rounded-lg overflow-hidden border border-sky-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img 
                                            src="/News/card-2.png" 
                                            alt="Global Expansion Milestone" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">18 February 2024</span>
                                            <span className="text-xs text-white bg-sky-500 px-2 py-1 rounded-full">18</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">Global Expansion Milestone</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            Indigo celebrates reaching 25 countries worldwide, marking a significant milestone in our international growth strategy.
                                        </p>
                                        <a 
                                            href="#"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-all duration-200 text-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-16">
                        <button 
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="pagination-btn px-6 py-3 rounded-full font-semibold transition-all duration-200"
                        >
                            Previous
                        </button>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => showPage(1)}
                                className={`pagination-btn px-6 py-3 rounded-full font-semibold transition-all duration-200 ${currentPage === 1 ? 'active' : ''}`}
                            >
                                1
                            </button>
                            <button 
                                onClick={() => showPage(2)}
                                className={`pagination-btn px-6 py-3 rounded-full font-semibold transition-all duration-200 ${currentPage === 2 ? 'active' : ''}`}
                            >
                                2
                            </button>
                        </div>
                        
                        <button 
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-btn px-6 py-3 rounded-full font-semibold transition-all duration-200"
                        >
                            Next
                        </button>
                    </div>
                    
                    {/* Page Indicator */}
                    <div className="text-center mt-6">
                        <span className="text-gray-700 opacity-80 text-sm">
                            Page {currentPage} of {totalPages} • {currentPage === 1 ? '9' : '9'} news articles
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
