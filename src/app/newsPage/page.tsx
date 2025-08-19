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

    // News data array
    const newsData = [
        // Page 1
        [
            {
                id: 1,
                date: "03 July 2024",
                title: "US Fiber podcast",
                description: "Brad Hine chats with Ray O'Connor, Sr VP of Sales at Indigo, to discuss the evolving landscape of broadband connectivity in the US. Ray highlights the critical role of private equity in the fiber-to-the-home market and the transformative impact on both the U.K. and U.S.",
                image: "/news/c1.png",
                link: "https://www.indigotg.com/news/the-uk-experience/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 2,
                date: "07 June 2024",
                title: "Indigo company growth",
                description: "Discover Indigo's latest updates: new leadership with Neil Yusuf as CCO and Nigel Sperring as CFO, ISO certification, a Grant Thornton award, and USA expansion. Learn more about our growth and commitment to excellence.",
                image: "/news/c2.png",
                link: "https://www.indigotg.com/news/indigo-company-achievements-june-2024/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 3,
                date: "27 May 2024",
                title: "Keeping subsea cables connected",
                description: "Discover how we keep subsea cables secure and operational amid growing threats. Learn about proactive tracking, timely fault fixing, and the technology behind maintaining the backbone of global data traffic. Read insights from Kathy Kirchner, Network Operations VP for Americas",
                image: "/news/c3.jpg",
                link: "https://www.indigotg.com/news/subsea-cable-security/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 4,
                date: "24 May 2024",
                title: "Empowering Your Business with ISO Recertifications",
                description: "Our ISO recertifications symbolize our commitment to excellence, sustainability, security, and safety. Discover how Indigo empowers your business with the highest standards including ISO Recertifications (ISO 9001, ISO 14001 and ISO 45001).",
                image: "/news/c4.png",
                link: "https://www.indigotg.com/news/empowering-business-with-iso-recertifications/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 5,
                date: "14 May 2024",
                title: "Press Release: Subsea Security Services",
                description: "Press Release: Indigo Welcomes EU Recommendations For More Resilient Marine Infrastructure As It Advances Its Own Subsea Security Services",
                image: "/news/c5.png",
                link: "https://www.indigotg.com/news/pr-subsea-security-services/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 6,
                date: "26 April 2024",
                title: "Rising up to meet subsea cybersecurity challenges",
                description: "This blog explores how Indigo Subsea rises to meet subsea cybersecurity challenges, offering secure monitoring services and robust infrastructure solutions. Learn about our proactive approach, resilient network management, and compliance with industry standards.",
                image: "/news/c6.png",
                link: "https://www.indigotg.com/news/subsea-cybersecurity-challenge/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 7,
                date: "15 April 2024",
                title: "Indigo Wins Esri GIS Customer Success Award",
                description: "We were thrilled to win the Esri Ireland customer success award for Field Operations for the tools we use in our fiber designs. Our field operations team has consistently demonstrated excellence in developing our survey and design capabilities with GIS tools.",
                image: "/news/c7.jpg",
                link: "https://www.indigotg.com/news/indigo-wins-esri-gis-customer-success-award/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 8,
                date: "29 March 2024",
                title: "Our fiber design experts at FTTH Conference 2024",
                description: "At the forefront of fiber optics innovation in Europe lies the FTTH Conference 2024, a pivotal event hosted by the FTTH Council of Europe in Berlin. As Our experts, Will Tobin and Colin Higgins, provide insights into the evolving landscape of fiber-to-the-home (FTTH) technology.",
                image: "/news/c8.jpg",
                link: "https://www.indigotg.com/news/ftth-conference-2024/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 9,
                date: "07 March 2024",
                title: "Kathy Kirchner appointed as Network Operations VP, Americas",
                description: "Welcome to Kathy Kirchner who joins Indigo as Network Operations VP. Kathy will drive operational excellence and operational leadership for the Americas.",
                image: "/news/c9.png",
                link: "https://www.indigotg.com/news/kathy-kirchner-appointment-network-operations-vp-americas/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            }
        ],
        // Page 2
        [
            {
                id: 10,
                date: "06 March 2024",
                title: "Unleashing Human Potential",
                description: "The human element of an efficient and effective digital infrastructure is often overlooked. Find out why network engineering skills are core to optimizing networks.",
                image: "/news/c10.jpg",
                link: "https://www.indigotg.com/news/network-engineering-skills-the-human-element/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 11,
                date: "29 February 2024",
                title: "Indigo shortlisted for esri field operations award 2024",
                description: "Indigo has been shortlisted for the 2024 esri Ireland Field Operations Award: celebrating the best extended the reach of our GIS system.",
                image: "/news/c11.jpg",
                link: "https://www.indigotg.com/news/esri-field-operations-award-2024/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 12,
                date: "22 January 2024",
                title: "Acquiring and Retaining Talent in Telecoms",
                description: "For years one of the major challenge for telecoms, hyperscalers and OEMs has been finding the right people with the right skills. What are these challenges and how do digital infrastructure providers overcome them?",
                image: "/news/c12.png",
                link: "https://www.indigotg.com/news/acquiring-and-retaining-telecoms-expertise/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 13,
                date: "03 January 2024",
                title: "Generative AI Infrastructure Concerns",
                description: "Navigating the Generative AI Wave: Infrastructure Concerns and Challenges faced by digital infrastructure providers as a result of the generative AI phenomenon",
                image: "/news/c13.jpg",
                link: "https://www.indigotg.com/news/generative-ai-infrastructure-concerns/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 14,
                date: "04 December 2023",
                title: "Celebrating 25 Years of Indigo: A Journey of Growth and Innovation",
                description: "Indigo, now proudly celebrating 25 years in business, has a story woven with innovation, expansion, and a commitment to excellence.",
                image: "/news/c14.jpg",
                link: "https://www.indigotg.com/news/celebrating-25-years-of-indigo/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 15,
                date: "21 November 2023",
                title: "Black Friday internet traffic: Navigating the Network Storm",
                description: "As Black Friday and Cyber Monday sees an explosion in internet traffic explodes, this blog gives us an overview on how to navigate the network storm and the crucial role of digital infrastructure.",
                image: "/news/c15.png",
                link: "https://www.indigotg.com/news/black-friday-internet-traffic/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 16,
                date: "13 November 2023",
                title: "Small Cell Network Deployment Services",
                description: "Explore these wireless services, from precision survey and detailed design assessments to custom solution engineering tailored to your unique specifications. Indigo acts as your trusted partner, ensuring compliance, safety, and efficiency throughout the entire deployment process.",
                image: "/news/c16.png",
                link: "https://www.indigotg.com/news/small-cell-network-deployment-services/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 17,
                date: "04 October 2023",
                title: "Safety always comes first at Indigo",
                description: "Our SHEQ (Safety, Health, Environmental & Quality) priorities include protecting people at work, non-employees affected by work, and staff from workplace hazards.",
                image: "/news/c17.png",
                link: "https://www.indigotg.com/news/safety-always-comes-first/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 18,
                date: "25 September 2023",
                title: "New phase of growth through NOC and subsea success",
                description: "Indigo's new phase of growth through NOC services and subsea systems operator support, noting the increasing demand for bandwidth.",
                image: "/news/c18.png",
                link: "https://www.indigotg.com/news/new-phase-of-growth/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            }
        ],
        // Page 3
        [
            {
                id: 19,
                date: "04 September 2023",
                title: "Amitié subsea cable system: Indigo's proactive support",
                description: "This blog discusses Indigo's proactive support for the Amitié subsea cable system.",
                image: "/news/c19.png",
                link: "https://www.indigotg.com/news/indigo-support-to-the-amitie-subsea-cable/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 20,
                date: "29 August 2023",
                title: "Ron Righter at Fiber Connect 23",
                description: "Highlights of Fiber Connect 23, an event in Orlando, and an insightful conversation with Ron Righter, Senior Vice President of the Americas, about key themes in the fiber industry.",
                image: "/news/c20.jpg",
                link: "https://www.indigotg.com/news/fiber-connect-23/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 21,
                date: "22 August 2023",
                title: "Rich Hollins' appointed as Global Operations Director",
                description: "We are thrilled to mark yet another significant milestone in our Indigo journey as we announce the appointment of Rich Hollins as our Global Operations Director.",
                image: "/news/c21.jpg",
                link: "https://www.indigotg.com/news/rich-hollins-appointment-as-global-operation-director/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 22,
                date: "14 June 2023",
                title: "How to Enhance Network Reliability",
                description: "How to Enhance Network Reliability- Maximize network resilience and minimize downtime with Indigo through NOC and Global Service Desk",
                image: "/news/c22.jpg",
                link: "https://www.indigotg.com/news/how-to-enhance-network-reliability/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 23,
                date: "03 June 2023",
                title: "Indigo's North America Presence",
                description: "Our Multinational client list has brought us across the Atlantic to work on their networks, data centers, fiber services and deliver NOC support. Read about Indigo's presence in North America in this blog.",
                image: "/news/c23.jpg",
                link: "https://www.indigotg.com/news/indigo-north-america/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 24,
                date: "01 June 2023",
                title: "Maximizing Network Reliability",
                description: "This blog discusses how to maximize network reliability and minimize downtime with our NOC facilities in the USA and the UK",
                image: "/news/c24.png",
                link: "https://www.indigotg.com/news/maximizing-network-reliability/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 25,
                date: "22 May 2023",
                title: "Indigo in the USA: unleashing the power of broadband",
                description: "Our CCO and Board Member, Ray O'Connor, spent nearly a month in the USA in May 2023 visiting our offices, new employees, customers, and stakeholders. Find out how he got on.",
                image: "/news/c25.png",
                link: "https://www.indigotg.com/news/indigo-in-the-usa-unleashing-broadband/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 26,
                date: "27 April 2023",
                title: "Fiber Insights: Creating Sustainable Fiber Networks",
                description: "As Thought Leaders in Fiber Telecommunications, this blog shares insights from fiber-related events we attended and presented at in March and April 2023.",
                image: "/news/c26.png",
                link: "https://www.indigotg.com/news/fiber-insights-april-2023/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 27,
                date: "06 April 2023",
                title: "How We Help the Telecoms Digital Transformation Journey",
                description: "The explosion of data has left many companies wanting to digitise their data. Indigo can offer the ongoing lifecycle management, coordination, maintenance of the model via the Indigo NOC. This will ensure that the model is always kept accurate and up to date.",
                image: "/news/c27.jpg",
                link: "https://www.indigotg.com/news/how-we-help-the-telecoms-digital-transformation-journey/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            }
        ],
        // Page 4
        [
            {
                id: 28,
                date: "15 March 2023",
                title: "Indigo's Highly Skilled Data Centre Engineers",
                description: "Indigo's engineers help support our customers across all of our Data Centre services.",
                image: "/news/c28.png",
                link: "https://www.indigotg.com/news/indigos-data-centre-engineers-are-driving-customers-to-success/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 29,
                date: "08 March 2023",
                title: "Cambridge MC & Indigo Partner to Offer End-to-end Due Diligence Service for Digital Infrastructure Assets",
                description: "Press Release",
                image: "/news/c29.png",
                link: "https://www.indigotg.com/news/partnership-with-cambridge-fibre-due-diligence/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 30,
                date: "07 February 2023",
                title: "Indigo Strengthens Leadership Team",
                description: "Indigo is bolstering its board and leadership team in preparation for a period of expected growth. New appointments Chief People Officer, Chief Commercial Officer, SVP of Americas.",
                image: "/news/c30.png",
                link: "https://www.indigotg.com/news/leadership-team-growth/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 31,
                date: "16 December 2022",
                title: "Indigo in 2022",
                description: "A round-up of the company's milestones in 2022 including our expansion in the US, opening our NOCs globally, winning awards, and new roles and people.",
                image: "/news/c31.png",
                link: "https://www.indigotg.com/news/indigo-in-2022/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 32,
                date: "09 December 2022",
                title: "Minister Andrew Bowie visits Indigo",
                description: "Minister Andrew Bowie, Parliamentary Under Secretary of State at the Department for International Trade, visits the Indigo Wales HQ.",
                image: "/news/c32.png",
                link: "https://www.indigotg.com/news/minister-andrew-bowie-visits-indigo/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 33,
                date: "08 December 2022",
                title: "Indigo tops the \"FAST-GROWING FIRMS\" on the INSIDER LIST",
                description: "Indigo is on top as a result of its adjusted average annual growth of 42.1 per cent.",
                image: "/news/c33.png",
                link: "https://www.indigotg.com/news/fast-growing-firms-on-insider-list/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            }
        ],
        // Page 5
        [
            {
                id: 34,
                date: "29 October 2022",
                title: "What's driving data centre demand?",
                description: "Read about how the data centre's role in satisfying a worldwide appetite for more bandwidth and connectivity is also significant.",
                image: "/news/c34.png",
                link: "https://www.indigotg.com/news/whats-driving-data-centre-demand/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 35,
                date: "15 September 2022",
                title: "Navigating the risks and rewards of fibre rollout in the UK",
                description: "Indigo is recruited by large telecom incumbents and investors looking to buy up smaller players and extend their fibre footprints. Find out how we can help.",
                image: "/news/c35.png",
                link: "https://www.indigotg.com/news/risk-and-rewards-of-fibre-roll/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            },
            {
                id: 36,
                date: "01 September 2022",
                title: "Ray O'Connor appointed CCO and Indigo Board member",
                description: "The Indigo Board of Directors and its investors, GCP London, has appointed its CRO Ray O'Connor to the role of CCO and Board member.",
                image: "/news/c36.png",
                link: "https://www.indigotg.com/news/ray-oconnor-appointed-cco-and-indigo-board-member/",
                bgColor: "bg-gradient-to-br from-sky-100 via-white to-blue-100",
                borderColor: "border-blue-200",
                buttonColor: "bg-[#140079] hover:bg-[#0a0033] text-white",
                numberColor: "bg-blue-600"
            }
        ]
    ];

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
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-[#140079] mb-3 line-clamp-2 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                    {item.title}
                </a>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>
                <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-full px-4 py-2 ${item.buttonColor} text-white font-semibold rounded-lg transition-all duration-200 text-sm mt-auto`}
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
