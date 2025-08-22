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
import { newsData } from '@/lib/newsData';
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

    // News data array (now imported from shared file)

    const totalPages = newsData.length;

    // Function to show a specific page
    const showPage = (pageNumber: number) => {
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

    // Scroll animation for news cards
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Kill only news-related ScrollTriggers to prevent conflicts
            ScrollTrigger.getAll().forEach(trigger => {
                const triggerElement = trigger.vars.trigger as Element;
                if (triggerElement && triggerElement.classList && 
                    (triggerElement.classList.contains('news-card') || 
                     triggerElement.classList.contains('pagination-container') ||
                     triggerElement.closest('.news-page'))) {
                    trigger.kill();
                }
            });
            
            // Set initial state for all news cards
            gsap.set('.news-card', {
                opacity: 0,
                y: 100,
                scale: 0.8
            });
            
            // Animate news cards row by row with staggered timing
            const newsCards = document.querySelectorAll('.news-card');
            
            newsCards.forEach((card, index) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5, // Faster duration
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "bottom 10%",
                        toggleActions: "play none none reverse"
                    },
                    delay: index * 0.05 // Faster stagger
                });
            });

            // Animate page title and description
            const pageTitle = document.querySelector('.news-page h2');
            const pageDescription = document.querySelector('.news-page p');
            
            if (pageTitle) {
                gsap.set(pageTitle, { opacity: 0, y: -50 });
                gsap.to(pageTitle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6, // Faster duration
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: pageTitle,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (pageDescription) {
                gsap.set(pageDescription, { opacity: 0, y: -30 });
                gsap.to(pageDescription, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6, // Faster duration
                    delay: 0.2, // Shorter delay
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: pageDescription,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            // Animate pagination
            const paginationContainer = document.querySelector('.pagination-container');
            if (paginationContainer) {
                gsap.set(paginationContainer, { opacity: 0, y: 30 });
                gsap.to(paginationContainer, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5, // Faster duration
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: paginationContainer,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }
    }, [currentPage]); // Re-run when page changes

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

    // News Item Component with animation ref
    const NewsItem = ({ item, index }: { item: any; index: number }) => (
        <div 
            className={`${item.bgColor} rounded-lg overflow-hidden border ${item.borderColor} transition-all duration-300 group h-[500px] flex flex-col news-card`}
            data-index={index}
        >
            <div className="h-48 overflow-hidden">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-300"
                />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{item.date}</span>
                    <span className={`text-xs text-white ${item.numberColor} px-2 py-1 rounded-full`}>
                        {item.id.toString().padStart(2, '0')}
                    </span>
                </div>
                <a 
                    href={`/newsPage/news/${item.slug}`}
                    className="text-xl font-semibold text-[#140079] mb-3 line-clamp-2 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                    {item.title}
                </a>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>
                                <a
                    href={`/newsPage/news/${item.slug}`}
                    className={`inline-flex items-center justify-center w-full px-4 py-2 ${item.buttonColor} text-white font-semibold rounded-lg transition-all duration-200 text-sm mt-auto hover:bg-white hover:text-[#140079] hover:border-2 hover:border-[#140079]`}
                >
                    Read More
                </a>
            </div>
        </div>
    );

    // Dynamic Pagination Component
    const PaginationButtons = () => {
        const maxVisiblePages = 3;
        const totalPagesCount = newsData.length;
        
        if (totalPagesCount <= maxVisiblePages) {
            // Show all pages if 3 or fewer
            return (
                <>
                    {newsData.map((_, pageIndex) => (
                        <button 
                            key={pageIndex + 1}
                            onClick={() => showPage(pageIndex + 1)}
                            className={`pagination-btn ${currentPage === pageIndex + 1 ? 'active' : ''}`}
                        >
                            {pageIndex + 1}
                        </button>
                    ))}
                </>
            );
        }
        
        // Show pages with ellipsis for better UX
        const getVisiblePages = () => {
            const pages = [];
            
            if (currentPage <= 2) {
                // Show first 2 pages + ellipsis + last page
                for (let i = 1; i <= 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPagesCount);
            } else if (currentPage >= totalPagesCount - 1) {
                // Show first page + ellipsis + last 2 pages
                pages.push(1);
                pages.push('...');
                for (let i = totalPagesCount - 1; i <= totalPagesCount; i++) {
                    pages.push(i);
                }
            } else {
                // Show first page + ellipsis + current page + ellipsis + last page
                pages.push(1);
                pages.push('...');
                pages.push(currentPage);
                pages.push('...');
                pages.push(totalPagesCount);
            }
            
            return pages;
        };
        
        return (
            <>
                {getVisiblePages().map((page, index) => (
                    <button 
                        key={index}
                        onClick={() => typeof page === 'number' ? showPage(page) : null}
                        disabled={page === '...'}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
            </>
        );
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
                    <h1 className="text-[8vw] font-bold text-[#140079] [-webkit-text-stroke:2px_#fff] text-center whitespace-nowrap underline">
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
                            href="/newsPage/news/us-fiber-podcast"
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
                            href="/newsPage/news/indigo-company-growth"
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
                            href="/newsPage/news/keeping-subsea-cables-connected"
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
                            href="/newsPage/news/empowering-business-with-iso-recertifications/"
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
                        <h2 className="text-6xl font-light text-[#140079] text-bold mb-4">Latest News</h2>
                        <p className="text-xl text-[#140079] opacity-80">Stay updated with our latest insights and achievements</p>
                    </div>

                    {/* News List */}
                    <div className="grid grid-cols-3 gap-6">
                        {newsData.map((page, pageIndex) => (
                            <div 
                                key={pageIndex + 1}
                                className={`news-page col-span-3 transition-all duration-500 ease-in-out ${pageIndex + 1 === currentPage ? '' : 'hidden'}`} 
                                data-page={pageIndex + 1}
                            >
                            <div className="grid grid-cols-3 gap-6">
                                    {page.map((item, index) => (
                                        <NewsItem key={item.id} item={item} index={index} />
                                    ))}
                                    </div>
                                        </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-16 pagination-container">
                        <button 
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                        >
                            ←
                        </button>
                        
                        <div className="flex items-center gap-2">
                            <PaginationButtons />
                        </div>
                        
                        <button 
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            →
                        </button>
                    </div>
                    
                    {/* Page Indicator */}
                    <div className="text-center mt-6">
                        <span className="text-gray-700 opacity-80 text-sm">
                            Page {currentPage} of {totalPages} • {newsData[currentPage - 1]?.length || 0} news articles
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
