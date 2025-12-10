import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function Landing() {
      const yidamRef = useRef(null);
      const studioRef = useRef(null);
      const section2Ref = useRef(null);
      const imageIndexRef = useRef(0);
      const section1Ref = useRef(null);
      const cursorRef = useRef(null);
      const [isSection1Hovered, setIsSection1Hovered] = useState(false);


      const xTo = useRef(null);
      const yTo = useRef(null);
      
    
    const imageUrls =[
        'https://picsum.photos/400/400?random=1',
        'https://picsum.photos/400/400?random=2',
        'https://picsum.photos/400/400?random=3',
        'https://picsum.photos/400/400?random=4',
        'https://picsum.photos/400/400?random=5',
        'https://picsum.photos/400/400?random=6',
        'https://picsum.photos/400/400?random=7',
        'https://picsum.photos/400/400?random=8'
    ]

  useEffect(() => {
    
    // Animate "Yidam" - Scale up and fade in with a bounce
    gsap.fromTo(
      yidamRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: -10
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3
      }
    );

    // Animate "Studio" - Slide in from right with fade
    gsap.fromTo(
      studioRef.current,
      {
        x: 300,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 1
      }
    );

    // Add floating animation to both
    gsap.to(yidamRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 2
    });

    gsap.to(studioRef.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 2.2
    });

     if (cursorRef.current) {
        // Set initial position and use GSAP's quickTo for performance and smooth trailing
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
        
        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3" });
    }


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards when section comes into view
            const cards = entry.target.querySelectorAll('.service-card');
            gsap.fromTo(
              cards,
              {
                y: 100,
                opacity: 0,
                rotation: -5
              },
              {
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
              }
            );
            // Animate section title
            const title = entry.target.querySelector('.section2-title');
            const chars = title.textContent.split('');
            title.innerHTML = chars.map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
            
            gsap.fromTo(
              title.querySelectorAll('.char'),
              {
                opacity: 0,
                y: 50,
                rotation: 15
              },
              {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 0.5,
                stagger: 0.03,
                ease: "back.out(1.7)"
              }
            );
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (section2Ref.current) {
      observer.observe(section2Ref.current);
    }
    return () => observer.disconnect();

}, []);
 

  const addToRefs = (el) => {
      if (el && !imageRefs.current.includes(el)) {
        imageRefs.current.push(el);
      }
    };
  

  const handleMouseMove = (e) => {
    // Create new image element as actual img tag
    const imgContainer = document.createElement('div');
    imgContainer.className = 'flash-image fixed pointer-events-none z-[60]';
    
    const img = document.createElement('img');
    
    // Set random image from array
    const randomImage = imageUrls[imageIndexRef.current % imageUrls.length];
    imageIndexRef.current++;
    
    img.src = randomImage;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';
    
    imgContainer.appendChild(img);
    imgContainer.style.left = `${e.clientX - 75}px`;
    imgContainer.style.top = `${e.clientY - 75}px`;
    
    document.body.appendChild(imgContainer);

    // Animate with GSAP
    gsap.fromTo(
      imgContainer,
      {
        scale: 0,
        rotation: Math.random() * 360 - 180,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Fade out and remove
          gsap.to(imgContainer, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.in",
            onComplete: () => imgContainer.remove()
          });
        }
      }
    );
  };

  const handleSection1MouseMove = (e) => {
    if (xTo.current && yTo.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
    }
  };

  const InlineImage = ({ src }) => (
    <span className="inline-block align-middle mx-2 relative group cursor-pointer" style={{ height: '1em', verticalAlign: 'middle' }}>
      <img 
        src={src} 
        alt="Creative Visual" 
        className="h-[.8em] w-[1.9em] object-cover rounded-full border border-black transition-all duration-300 ease-out transform group-hover:scale-[2.5] group-hover:z-50 group-hover:shadow-2xl relative z-10"
      />
    </span>
  );
  

  return (
    <div className="Landing w-full overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full bg-black text-white py-2 z-50 overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          <div className="flex">
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <div className="flex">
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-lg" style={{ fontFamily: 'Coolvetica, sans-serif' }}>
              We sell the drugs of reality &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <section 
        className="h-screen w-full flex items-center justify-center relative"
        style={{ backgroundColor: '#0000FF' }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 30%),
              radial-gradient(circle at 80% 80%, rgba(0, 200, 255, 0.5) 0%, transparent 40%),
              radial-gradient(circle at 40% 20%, rgba(100, 150, 255, 0.4) 0%, transparent 35%),
              radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 30%),
              radial-gradient(circle at 90% 30%, rgba(150, 180, 255, 0.4) 0%, transparent 40%)
            `,
            filter: 'blur(80px)',
            animation: 'fluidMove 15s ease-in-out infinite'
          }}
        />
        
        <style>{`
          @keyframes fluidMove {
            0%, 100% {
              transform: translate(0, 0) scale(1) rotate(0deg);
            }
            25% {
              transform: translate(50px, -40px) scale(1.15) rotate(5deg);
            }
            50% {
              transform: translate(-30px, 30px) scale(0.95) rotate(-5deg);
            }
            75% {
              transform: translate(40px, 20px) scale(1.1) rotate(3deg);
            }
          }
        `}</style>

        {/* Vertical Navigation - Left Bottom (only in hero section) */}
        <nav className="absolute left-7 bottom-8 z-50">
          <ul className="flex flex-col gap-1 text-white text-4xl tracking-2 "
          >
            <li>
              <Link 
                to="/" 
                className="hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Coolvetica, sans-serif' }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Coolvetica, sans-serif' }}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className="hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Coolvetica, sans-serif' }}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Coolvetica, sans-serif' }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="relative w-full flex-col flex items-center">
          <h1 
          ref={yidamRef}
          onMouseMove={handleMouseMove}
            className="text-white font-bold tracking-2 cursor-pointer"
            style={{ 
              fontSize: '75vh',
              fontFamily: 'Coolvetica, sans-serif',
              lineHeight: '.7',
              
            }}
          >
            Yidam
          </h1>
          <p 
          ref={studioRef}
            className="text-white text-8xl "
            style={{ fontFamily: 'Coolvetica, sans-serif',
            marginLeft :'1160px'
             }}
          >
            Studio
          </p>
        </div>
      </section>



      {/* Section 1 */}
      <section 
        ref={section1Ref}
        onMouseEnter={() => setIsSection1Hovered(true)}
        onMouseLeave={() => setIsSection1Hovered(false)}
        onMouseMove={handleSection1MouseMove}
        className="min-h-screen w-full bg-white flex items-center justify-center p-8 md:p-20 relative overflow-hidden cursor-none" // added cursor-none for better effect
      >
        
        <div 
          ref={cursorRef}
          className={`fixed w-48 h-48 rounded-full bg-blue-700/70 transition-opacity duration-300 pointer-events-none ${
            isSection1Hovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: 1,
              backgroundColor: 'rgba(29, 78, 216, 0.7)',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease',
            filter: 'blur(38px)'
           }} 
        />

        
        <div className="max-w-7xl text-center px-4 relative z-20">
          <p 
            className="text-xl md:text-6xl lg:text-8xl font-medium leading-tight text-black"
            style={{ fontFamily: 'Coolvetica, sans-serif', lineHeight: '0.7' }}
          >
            We are the Creative Agency
            <InlineImage src="https://picsum.photos/300/200?random=20" />
            that works with the Brands
            <InlineImage src="https://picsum.photos/300/200?random=21" />
            with Bold vision,
            <InlineImage src="https://picsum.photos/300/200?random=22" />
            Build a best Marketplace value
            <InlineImage src="https://picsum.photos/300/200?random=23" />
            to leverage Sales and Exposure.
          </p>
        </div>
      </section>


      {/* Section 2 */}
            <section 
        ref={section2Ref}
        className="min-h-screen w-full bg-black flex items-center justify-center p-8 py-20"
      >
        <div className="max-w-7xl w-full">
          <h2 
            className="section2-title text-7xl font-bold mb-16 text-white text-center"
            style={{ fontFamily: 'Coolvetica, sans-serif' }}
          >
            What We Create
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div 
              className="service-card bg-white p-8 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  boxShadow: "0 20px 60px rgba(0, 0, 255, 0.3)",
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  duration: 0.3
                });
              }}
            >
              <div className="text-6xl mb-4">🎨</div>
              <h3 
                className="text-3xl font-bold mb-3 text-black"
                style={{ fontFamily: 'Coolvetica, sans-serif' }}
              >
                Design
              </h3>
              <p className="text-gray-700 text-lg">
                Crafting visual experiences that captivate and inspire your audience.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              className="service-card bg-white p-8 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  boxShadow: "0 20px 60px rgba(0, 0, 255, 0.3)",
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  duration: 0.3
                });
              }}
            >
              <div className="text-6xl mb-4">💻</div>
              <h3 
                className="text-3xl font-bold mb-3 text-black"
                style={{ fontFamily: 'Coolvetica, sans-serif' }}
              >
                Development
              </h3>
              <p className="text-gray-700 text-lg">
                Building powerful digital solutions with cutting-edge technology.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="service-card bg-white p-8 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  boxShadow: "0 20px 60px rgba(0, 0, 255, 0.3)",
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  duration: 0.3
                });
              }}
            >
              <div className="text-6xl mb-4">🚀</div>
              <h3 
                className="text-3xl font-bold mb-3 text-black"
                style={{ fontFamily: 'Coolvetica, sans-serif' }}
              >
                Strategy
              </h3>
              <p className="text-gray-700 text-lg">
                Transforming ideas into reality with strategic thinking and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="min-h-screen w-full bg-white flex items-center justify-center p-8">
        <div className="max-w-6xl">
          <h2 className="text-5xl font-bold mb-6 text-black">Section 3</h2>
          <p className="text-xl text-gray-700">
            Add your content for section 3 here. This could be testimonials, 
            case studies, or additional information.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-8">
        <div className="max-w-6xl">
          <h2 className="text-5xl font-bold mb-6 text-black">Section 4</h2>
          <p className="text-xl text-gray-700">
            Add your content for section 4 here. This could be your call to action, 
            contact information, or closing statement.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;