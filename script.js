// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Initialize animations cleanly
    initHeroLoadAnimation();
    initCarScrollAnimation();
    initMouseEffects();
    initParticles();
});

/**
 * Enhanced Mouse Spotlight Interaction
 */
function initMouseEffects() {
    const spotlight = document.querySelector('.mouse-spotlight');
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        gsap.to(spotlight, {
            '--x': `${clientX}px`,
            '--y': `${clientY}px`,
            duration: 0.1,
            ease: "none"
        });
    });
}

/**
 * Subtle Ambient Particle System
 */
function initParticles() {
    const container = document.getElementById('particles-container');
    const count = 30;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        gsap.set(particle, {
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
        });
        
        container.appendChild(particle);
        
        // Floating animation
        gsap.to(particle, {
            x: `random(-100, 100)`,
            y: `random(-100, 100)`,
            duration: `random(10, 20)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

/**
 * Handles the initial entry animations when the page first loads.
 */
function initHeroLoadAnimation() {
    const loadTimeline = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    // Preset elements
    gsap.set(".road-container", { scaleY: 0.8, opacity: 0 });

    // 1. Reveal the road
    loadTimeline.to(".road-container", {
        scaleY: 1,
        opacity: 1,
        duration: 1.2
    })
        // 2. Stagger reveal the headline letters to a dim state
        .to(".letter", {
            opacity: 0.4,
            color: "#52525b", // zinc-600 outline look
            y: 0,
            duration: 0.8,
            stagger: 0.05
        }, "-=0.8")
        // 3. Pop in the statistics cards
        .to(".stat-card", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)"
        }, "-=0.6")
        // 4. Reveal the scroll hint
        .to(".scroll-indicator", {
            opacity: 1,
            y: 0,
            duration: 1
        }, "-=0.4");
}

/**
 * Handles the scroll-driven animations (the car moving left-to-right).
 */
function initCarScrollAnimation() {
    // Create the main pinned scroll timeline
    const scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero-pin",
            start: "top top",
            endTrigger: "#scroll-space",
            end: "bottom bottom",
            scrub: 1,          // Link animation seamlessly to mouse wheel
            pin: true,         // Pin section while scrolling
            anticipatePin: 1
        }
    });

    // Hide scroll hint immediately upon scrolling
    scrollTimeline.to(".scroll-indicator", {
        opacity: 0,
        duration: 0.1
    }, 0);

    // Car drives: Moves from its parked left position across to the right edge
    scrollTimeline.to(".car-container", {
        x: "100vw",
        ease: "none",
        duration: 1
    }, 0);

    // Green Trail paints the road from left to right in absolute sync with car
    scrollTimeline.to(".green-trail", {
        width: "100%",
        ease: "none",
        duration: 1
    }, 0);

    // Letters light up dynamically when the car crosses them
    // Stagger creates the 'painting' illusion
    scrollTimeline.to(".letter", {
        color: "#ffffff",
        opacity: 1,
        filter: "drop-shadow(0px 0px 10px rgba(255,255,255,0.8))",
        duration: 0.1,
        stagger: 0.03,
        ease: "none"
    }, 0.3);

    // Stat cards trigger 'pop' animations dynamically
    // Left side stats pop near 25% scroll
    scrollTimeline.to([".stat-card:nth-of-type(1)", ".stat-card:nth-of-type(3)"], {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    }, 0.25);

    // Right side stats pop near 75% scroll
    scrollTimeline.to([".stat-card:nth-of-type(2)", ".stat-card:nth-of-type(4)"], {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    }, 0.7);
}
