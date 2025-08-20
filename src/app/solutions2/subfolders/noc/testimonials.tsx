'use client';

import { useState, useEffect, useRef } from 'react';

export default function WorkingAtIndigo() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [stats, setStats] = useState({ satisfaction: 0, recommend: 0, growth: 0 });
    const [statsVisible, setStatsVisible] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    const imageCards = [
        {
            leftImage: "/careers/1.1.jpg",
            rightImage: "/careers/1.2.jpg",
            title: "Digital Infrastructure Excellence",
            description: "Building the backbone of tomorrow's connected world"
        },
        {
            leftImage: "/careers/2.1.jpg",
            rightImage: "/careers/2.2.jpg",
            title: "Innovation at Every Level",
            description: "Pushing boundaries with cutting-edge technology"
        },
        {
            leftImage: "/careers/3.1.jpg",
            rightImage: "/careers/3.2.jpg",
            title: "Team Collaboration & Growth",
            description: "Fostering a culture of excellence and continuous learning"
        }
    ];

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevCard();
            } else if (e.key === 'ArrowRight') {
                nextCard();
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (statsVisible) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepDuration = duration / steps;

            const finalValues = { satisfaction: 4.8, recommend: 95, growth: 2.5 };

            let currentStep = 0;
            const interval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                setStats({
                    satisfaction: Number((finalValues.satisfaction * progress).toFixed(1)),
                    recommend: Math.floor(finalValues.recommend * progress),
                    growth: Number((finalValues.growth * progress).toFixed(1))
                });

                if (currentStep >= steps) {
                    clearInterval(interval);
                }
            }, stepDuration);

            return () => clearInterval(interval);
        }
    }, [statsVisible]);

    const nextCard = () => {
        if (slideDirection) return;
        setSlideDirection('right');
        setCurrentTestimonial((prev) => (prev + 1) % imageCards.length);
        setTimeout(() => setSlideDirection(null), 300);
    };

    const prevCard = () => {
        if (slideDirection) return;
        setSlideDirection('left');
        setCurrentTestimonial((prev) => (prev - 1 + imageCards.length) % imageCards.length);
        setTimeout(() => setSlideDirection(null), 300);
    };

    const current = imageCards[currentTestimonial];

    return (
        <section className="bg-white relative overflow-hidden flex items-center overflow-x-hidden">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Enhanced Header */}

                {/* Enhanced Image Card */}
                <div className={`flex flex-col items-center mb-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className={`flex w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 group h-64 sm:h-80 ${slideDirection === 'left' ? 'transform -translate-x-4' :
                        slideDirection === 'right' ? 'transform translate-x-4' :
                            'transform translate-x-0'
                        }`}>
                        {/* Left Image Section */}
                        <div className="w-1/2 relative overflow-hidden bg-yellow-400 flex items-center justify-center pt-4 sm:pt-8">
                            <img
                                src={current.leftImage}
                                alt={current.title}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Right Image Section */}
                        <div className="w-1/2 relative overflow-hidden bg-gray-100">
                            <img
                                src={current.rightImage}
                                alt={current.title}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Read More Button - Lower Left */}
                    <div className="flex justify-start w-full max-w-4xl mt-3">
                        <button className="bg-yellow-400 border-2 border-blue-800 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2 group shadow-md text-sm">
                            <span>Read more</span>
                            <span className="text-base group-hover:translate-x-1 transition-transform duration-300">{'>'}</span>
                        </button>
                    </div>
                </div>

                {/* Enhanced Navigation */}
                <div className={`flex justify-center items-center gap-4 sm:gap-8 transition-all duration-1000 delay-800 mb-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    {/* Previous Button */}
                    <button
                        onClick={prevCard}
                        className="group w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-xl"
                    >
                        <span className="text-lg sm:text-xl group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
                    </button>

                    {/* Enhanced Pagination Dots */}
                    <div className="flex gap-2 sm:gap-3">
                        {imageCards.map((_, i: number) => (
                            <button
                                key={i}
                                onClick={() => {
                                    if (slideDirection) return;
                                    setSlideDirection('right');
                                    setCurrentTestimonial(i);
                                    setTimeout(() => setSlideDirection(null), 300);
                                }}
                                className={`transition-all duration-300 rounded-full ${i === currentTestimonial
                                    ? 'w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                                    : 'w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125'
                                    }`}
                            ></button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextCard}
                        className="group w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-xl"
                    >
                        <span className="text-lg sm:text-xl group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                    </button>
                </div>
            </div>


        </section>
    );
}