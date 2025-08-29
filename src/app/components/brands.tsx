import Image from "next/image";
import { Fragment } from "react";
import { orbitron } from "../fonts";

interface CompanyStory {
  id: number;
  name: string;
  logo: string;
  image: string;
  description: string;
  category: string;
  industry: string;
  size: string;
  region: string;
  link: string; // Added link property
}

const companyStories: CompanyStory[] = [
  {
    id: 1,
    name: "LightSpeed Networks",
    logo: "/images/success_stories/LightNetwork.PNG",
    image: "/images/success_stories/lightspeed-image.jpg",
    description: "Supporting customer-focused growth for LightSpeed Networks",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe",
    link: "http://indigotg.com/wp-content/uploads/2025/03/Indigo-Lightspeed-Success-Story.pdf"
  },
  {
    id: 2,
    name: "Ogi",
    logo: "/images/success_stories/Ogi-logo.png",
    image: "/images/success_stories/ogi.jpg",
    description: "Ogi forges connected partnership with Indigo, from network design to NOC support",
    category: "Success Stories",
    industry: "Technology",
    size: "Mid-market",
    region: "Europe",
    link: "https://www.indigotg.com/success-story/ogi/"
  },
  {
    id: 3,
    name: "Cellnex",
    logo: "/images/success_stories/Cellnex.png",
    image: "/images/success_stories/cellnex-card.png",
    description: "Indigo offers Cellnex a turnkey solution to turn new tower infrastructure sites into revenue generators in rapid time",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe",
    link: "https://www.indigotg.com/success-story/cellnex/"
  },
  {
    id: 4,
    name: "Netomnia",
    logo: "/images/success_stories/Netomnia.png",
    image: "/images/success_stories/netomnia-card.jpg",
    description: "Netomnia partners with Indigo for leading-edge fibre rollout programme to connect more premises more quickly to ultrafast fibre broadband",
    category: "Success Stories",
    industry: "Technology",
    size: "Mid-market",
    region: "Europe",
    link: "https://www.indigotg.com/success-story/netomnia/"
  },
  {
    id: 5,
    name: "R&M",
    logo: "/images/success_stories/RM-logo.png",
    image: "/images/success_stories/RM-Card.jpg",
    description: "R&M delivered bespoke cabling solution to NTT, enhanced by the engagement and involvement of Indigo from conception to project completion",
    category: "Success Stories",
    industry: "Technology",
    size: "Enterprise",
    region: "Europe",
    link: "https://www.indigotg.com/success-story/rm/"
  },
  {
    id: 6,
    name: "NBI",
    logo: "/images/success_stories/indigo_nbi-colour.png",
    image: "/images/success_stories/NBI.jpeg",
    description: "We have been working closely with NBI to design and plan a new high-speed fibre broadband network for rural Ireland",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe",
    link: "/newsPage" // Placeholder for actual link
  },
  {
    id: 7,
    name: "Orange",
    logo: "/images/success_stories/Orange-logo.svg",
    image: "/images/success_stories/Orange-Card.jpg",
    description: "Expert installation and maintenance at Orange Cloud for Business",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe",
    link: "/newsPage"// Placeholder for actual link
  },
  {
    id: 8,
    name: "SIRO",
    logo: "/images/success_stories/SIRO-logo.png",
    image: "/images/success_stories/SIRO-Card.jpg",
    description: "SIRO partners with Indigo for comprehensive network infrastructure solutions",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe",
    link: "/newsPage"// Placeholder for actual link
  },
];

// Story Card Component
const StoryCard = ({ story }: { story: CompanyStory }) => {
  return (
    <div
      className="group relative h-[280px] w-[280px] md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px] overflow-hidden bg-neutral-200 rounded-3xl shadow-2xl"
    >
      <div
        style={{
          backgroundImage: `url(${story.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-6 lg:p-8">
        {/* Company Name */}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          {story.name}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          {story.description}
        </p>
        
        {/* Company Info and Read More Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-white/60 uppercase tracking-wide" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              {story.industry}
            </span>
            <span className="text-xs text-white/60" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              {story.region} • {story.size}
            </span>
          </div>

          <a
            href={story.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              px-3 py-1.5 md:px-4 md:py-2 rounded-full 
              flex items-center gap-1 md:gap-2 
              text-white
              shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-blue-200
              text-xs md:text-sm font-medium
              cursor-pointer
            `}
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <span>Read Story</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const BrandsSection = () => {
  // Split stories into groups of 4
  const firstGroup = companyStories.slice(0, 4);   // 1-4
  const secondGroup = companyStories.slice(4, 8);  // 5-8

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto flex flex-col items-center text-center px-4 md:px-6 lg:px-8">
        <h2 className={`mb-6 md:mb-8 font-roboto text-3xl md:text-4xl lg:text-6xl font-semibold text-[#04048b] tracking-wide`}>Our Partnerships</h2>

        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 h-full mt-6 md:mt-8">
          {/* First row - Right to Left */}
          <div className="flex gap-3 md:gap-4 overflow-hidden">
            <div className="company-logos-scroll flex gap-3 md:gap-4">
              {[...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup].map((story, index) => (
                <StoryCard story={story} key={`row1-${story.id}-${index}`} />
              ))}
            </div>
          </div>
          
          {/* Second row - Left to Right */}
          <div className="flex gap-3 md:gap-4 overflow-hidden">
            <div className="company-logos-scroll-reverse flex gap-3 md:gap-4">
              {[...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup].map((story, index) => (
                <StoryCard story={story} key={`row2-${story.id}-${index}`} />
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-20%); }
          }
          @keyframes scrollRight {
            from { transform: translateX(-20%); }
            to { transform: translateX(0); }
          }
          .company-logos-scroll { animation: scrollLeft 60s linear infinite; }
          .company-logos-scroll:hover { animation-play-state: paused; }
          .company-logos-scroll-reverse { animation: scrollRight 70s linear infinite; }
          .company-logos-scroll-reverse:hover { animation-play-state: paused; }
        `}</style>
      </div>
    </section>
  );
};