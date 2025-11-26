import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function Landing() {
      const yidamRef = useRef(null);
      const studioRef = useRef(null);
      const section2Ref = useRef(null);
      const [images, setImages] = useState([]);
      const imageIndexRef = useRef(0);
      const lastImageTimeRef = useRef(0);
    
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
 


  

  const handleMouseMove = (e) => {
    // Create new image element as actual img tag
    const imgContainer = document.createElement('div');
    imgContainer.className = 'flash-image';
    
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
      <section className="min-h-screen w-full bg-white flex items-center justify-center p-8">
        <div className="max-w-6xl">
          <h2 className="text-5xl font-bold mb-6 text-black">Section 1</h2>
          <p className="text-xl text-gray-700">
            Add your content for section 1 here. This could be about your services, 
            introduction, or any other content you'd like to showcase.
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