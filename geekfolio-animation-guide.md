# 🎨 Geekfolio — Animation, Design System & Component Guide
> Extracted from the **GeekFolio Dark Theme** by UI-ThemeZ  
> Use this as a reference / AI prompt for recreating the design in React.

---

## 📦 Libraries & Dependencies

| Library | Version / CDN | Purpose |
|---|---|---|
| **GSAP** | `gsap.min.js` | Core animation engine |
| **ScrollTrigger** | `ScrollTrigger.min.js` | Scroll-driven animations |
| **ScrollSmoother** | `ScrollSmoother.min.js` | Smooth scroll (GSAP plugin) |
| **Swiper.js** | (via plugins.js) | Sliders & carousels |
| **WOW.js** | (via plugins.js) | Scroll-reveal entry animations |
| **Splitting.js** | (via plugins.js) | Character/word split text animations |
| **simpleParallax** | (via plugins.js) | Image parallax on scroll |
| **jQuery** | `jquery-3.6.0.min.js` | DOM / interaction base |
| **isotope** | (via plugins.js) | Masonry / filterable grid |
| **Magnific Popup** | (via plugins.js) | Lightbox popups |
| **countUp.js** | (via plugins.js) | Animated number counters |
| **hover3d.js** | (via plugins.js) | 3D tilt hover card effect |
| **parallax.js** | `parallax.min.js` | Depth/mouse-parallax scenes |

### React Equivalents (npm packages)
```
gsap                    → gsap + @gsap/react
swiper                  → swiper
framer-motion           → replaces WOW.js (better for React)
splitting               → splitting
react-countup           → react-countup
vanilla-tilt            → vanilla-tilt (replaces hover3d)
react-parallax          → react-parallax
```

---

## 🔤 Typography

### Google Fonts Used
```html
<!-- All loaded simultaneously -->
Poppins      : 100–900 weights  (primary UI font)
Sora         : 100–800 weights  (clean modern headings)
Playfair Display : 400–800 (italic + normal)  (editorial/luxury headings)
Epilogue     : 100–900 weights  (subheadings / accent text)
```

### Font Usage Patterns
- **Body / small text** → `Poppins` light (300–400)
- **Hero headlines** → `Playfair Display` bold italic  
- **Section titles** → `Sora` 600–800  
- **Subheadings / labels** → `Epilogue` 500–600  
- **Navigation links** → `Poppins` 500 with `rolling-text` animation

---

## 🎬 Animation System

### 1. WOW.js — Scroll Reveal Animations

**Setup (JS):**
```js
wow = new WOW({
  animateClass: 'animated',
  offset: 100
});
wow.init();
```

**HTML usage:**
```html
<!-- Basic fadeIn on scroll -->
<div class="wow fadeIn">Content</div>

<!-- With staggered delay -->
<div class="wow fadeIn" data-wow-delay=".4s">Content</div>
<div class="wow fadeIn" data-wow-delay=".8s">Content</div>
<div class="wow fadeIn" data-wow-delay="1.2s">Content</div>

<!-- FadeInUp variant -->
<div class="wow fadeInUp" data-wow-delay=".1s">Item 1</div>
<div class="wow fadeInUp" data-wow-delay=".3s">Item 2</div>
<div class="wow fadeInUp" data-wow-delay=".5s">Item 3</div>
```

**React (Framer Motion equivalent):**
```jsx
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' }
  })
};

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  custom={0.4}
  variants={fadeIn}
  viewport={{ once: true, margin: '-100px' }}
>
  Content
</motion.div>
```

---

### 2. Rolling Text (Hover Nav Animation)

**How it works:** Each letter in a nav link gets split into two identical layers stacked vertically. On hover, both layers slide up — creating a smooth "roll" effect.

**CSS:**
```css
.rolling-text {
  display: inline-block;
  overflow: hidden;
  line-height: 50px;
  height: 50px;
}

.rolling-text:hover .letter,
.rolling-text.play .letter {
  transform: translateY(-100%);
}

.rolling-text .letter {
  display: inline-block;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

/* Staggered letter delays */
.letter:nth-child(1)  { transition-delay: 0s; }
.letter:nth-child(2)  { transition-delay: 0.015s; }
.letter:nth-child(3)  { transition-delay: 0.03s; }
/* ...up to nth-child(21) at 0.3s delay */
```

**JS (to split letters):**
```js
let elements = document.querySelectorAll('.rolling-text');
elements.forEach((element) => {
  let innerText = element.innerText;
  element.innerHTML = '';
  let textContainer = document.createElement('div');
  textContainer.classList.add('block');
  for (let letter of innerText) {
    let span = document.createElement('span');
    span.innerText = letter.trim() === '' ? '\xa0' : letter;
    span.classList.add('letter');
    textContainer.appendChild(span);
  }
  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true)); // duplicate for roll effect
});
```

**React component:**
```jsx
function RollingText({ children }) {
  return (
    <span className="rolling-text">
      <span className="block">
        {[...children].map((l, i) => (
          <span key={i} className="letter" style={{ transitionDelay: `${i * 0.015}s` }}>
            {l === ' ' ? '\u00a0' : l}
          </span>
        ))}
      </span>
      <span className="block" aria-hidden>
        {[...children].map((l, i) => (
          <span key={i} className="letter" style={{ transitionDelay: `${i * 0.015}s` }}>
            {l === ' ' ? '\u00a0' : l}
          </span>
        ))}
      </span>
    </span>
  );
}
```

---

### 3. GSAP Preloader / Page Entry Animation

**HTML Structure:**
```html
<div class="loader-wrap">
  <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
    <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
  </svg>
  <div class="loader-wrap-heading">
    <div class="load-text">
      <span>L</span><span>o</span><span>a</span>
      <span>d</span><span>i</span><span>n</span><span>g</span>
    </div>
  </div>
</div>
```

**GSAP Timeline:**
```js
const svg = document.getElementById('svg');
const tl = gsap.timeline();
const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
const flat  = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';

tl
  .to('.loader-wrap-heading .load-text', {
    delay: 1.5, y: -100, opacity: 0
  })
  .to(svg, { duration: 0.5, attr: { d: curve }, ease: 'power2.in' })
  .to(svg, { duration: 0.5, attr: { d: flat },  ease: 'power2.out' })
  .to('.loader-wrap', { y: -1500 })
  .to('.loader-wrap', { zIndex: -1, display: 'none' })
  .from('header', { y: 200 }, '-=1.5')
  .from('header .container', { y: 40, opacity: 0, delay: 0.3 }, '-=1.5');
```

---

### 4. GSAP + ScrollTrigger — Smooth Footer Reveal

```js
gsap.set('.footer-container', { yPercent: -50 });
const uncover = gsap.timeline({ paused: true });
uncover.to('.footer-container', { yPercent: 0, ease: 'none' });

ScrollTrigger.create({
  trigger: 'main',
  start: 'bottom bottom',
  end: '+=50%',
  animation: uncover,
  scrub: true,
});
```

---

### 5. Parallax Effects

#### A. Mouse-tracking Parallax (elements follow cursor)
```html
<div class="parallax" data-speed="0.05">Floating element</div>
```
```js
const parallaxTargets = document.querySelectorAll('.parallax');
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function updateParallax() {
  parallaxTargets.forEach(target => {
    let speed = target.dataset.speed;
    let x = (window.innerWidth / 2 - mouseX) * speed;
    let y = (window.innerHeight / 2 - mouseY) * speed;
    target.style.transform = `translate3d(${x / 10}rem, ${y / 10}rem, 0)`;
  });
  requestAnimationFrame(updateParallax);
}
updateParallax();
```

#### B. simpleParallax — Image scroll parallax
```html
<img class="thumparallax" src="image.jpg" alt="">       <!-- moves up -->
<img class="thumparallax-down" src="image.jpg" alt="">  <!-- moves down -->
```
```js
new simpleParallax(document.getElementsByClassName('thumparallax'), {
  delay: 1, scale: 1.2
});
new simpleParallax(document.getElementsByClassName('thumparallax-down'), {
  orientation: 'down', delay: 1, scale: 1.2
});
```

#### C. Background parallax (parallaxie plugin)
```html
<div class="parallaxie" data-speed="0.8">...</div>
```
```js
$('.parallaxie').parallaxie({ speed: 0.8, size: 'cover' });
```

#### D. Swiper Parallax Slider
```js
new Swiper('.parallax-slider', {
  speed: 1500,
  autoplay: { delay: 5000 },
  parallax: true,
  loop: true,
  on: {
    init: function() {
      this.slides.forEach(slide => {
        $(slide).find('.bg-img').attr('data-swiper-parallax', 0.75 * this.width);
      });
    }
  },
  pagination: { el: '.swiper-pagination', type: 'fraction' },
  navigation: { nextEl: '.next-ctrl', prevEl: '.prev-ctrl' }
});
```

---

### 6. Custom Cursor

```html
<div class="cursor"></div>
```
```css
.cursor {
  pointer-events: none;
  position: fixed;
  padding: 0.3rem;
  background-color: #fff;
  border-radius: 50%;
  mix-blend-mode: difference;
  transition: transform 0.3s ease, opacity 0.4s ease;
  z-index: 99999;
}

.cursor-active {
  transform: translate(-50%, -50%) scale(8);
  opacity: 0.1;
}
```
```js
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
// Expand on hover over links
$('a, .cursor-pointer').hover(
  () => $('.cursor').addClass('cursor-active'),
  () => $('.cursor').removeClass('cursor-active')
);
```

**React (Framer Motion cursor):**
```jsx
import { motion, useMotionValue, useSpring } from 'framer-motion';

function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className="cursor"
      style={{ left: springX, top: springY }}
    />
  );
}
```

---

### 7. Hover Magnetic Effect (`.hover-this`)

```js
const animateit = function(e) {
  const hoverAnim = this.querySelector('.hover-anim');
  const { offsetX: x, offsetY: y } = e;
  const { offsetWidth: w, offsetHeight: h } = this;
  const move = 25;
  const xMove = x / w * (move * 2) - move;
  const yMove = y / h * (move * 2) - move;
  hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
  if (e.type === 'mouseleave') hoverAnim.style.transform = '';
};
```

---

### 8. CSS Keyframe Animations

#### `@keyframes rotateCircle` — spinning loader circle
```css
@keyframes rotateCircle {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

#### `@keyframes slide-har` — horizontal marquee (left)
```css
@keyframes slide-har {
  0%   { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
@keyframes slide-har-revers {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(0%); }
}
```

#### `@keyframes slide-vertical` — vertical auto-scroll ticker
```css
@keyframes slide-vertical {
  0%   { transform: translateY(0%); }
  100% { transform: translateY(-100%); }
}

/* Usage */
.slide-vertical .box {
  animation: slide-vertical 50s linear infinite;
}
.slide-vertical:hover .box {
  animation-play-state: paused;
}
```

#### `@keyframes loading` — dot/spinner loading
```css
@keyframes loading {
  /* varies — typically opacity/scale pulse */
}
```

#### `@keyframes starPathRotate` — decorative star/path rotation
```css
@keyframes starPathRotate {
  /* rotates SVG path for decorative elements */
}
```

---

### 9. Image Reveal Animation (`.imago`)

```css
.imago {
  clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);
  transform: scale(1.2);
  filter: blur(5px);
  transition:
    clip-path 0.8s ease-in-out 0.3s,
    transform  0.8s ease-in-out 1.1s,
    filter     0.5s ease-in-out 1.1s;
}

/* Triggered by WOW.js adding .animated */
.imago.animated {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  transform: scale(1);
  filter: blur(0);
}
```

---

### 10. 3D Rotate Text on Scroll (`.d-rotate`)

```css
.d-rotate { perspective: 1000px; }

.d-rotate .rotate-text {
  transform-style: preserve-3d;
  transform-origin: 50% 0%;
  transform: translate3d(0, 50px, -50px) rotateX(-45deg) scale(0.95);
  opacity: 0;
  transition: all 0.8s;
  transition-delay: 0.3s;
}

.d-rotate.animated .rotate-text {
  transform: translate3d(0, 0, 0) rotateX(0deg) scale(1);
  opacity: 1;
}
```

---

### 11. Smooth Scroll Progress Button

```html
<div class="progress-wrap cursor-pointer">
  <svg class="progress-circle" viewBox="-1 -1 102 102">
    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
  </svg>
</div>
```
```js
const progressPath = document.querySelector('.progress-wrap path');
const pathLength = progressPath.getTotalLength();
progressPath.style.strokeDasharray  = `${pathLength} ${pathLength}`;
progressPath.style.strokeDashoffset = pathLength;

window.addEventListener('scroll', () => {
  const scroll   = window.scrollY;
  const height   = document.body.scrollHeight - window.innerHeight;
  const progress = pathLength - (scroll * pathLength / height);
  progressPath.style.strokeDashoffset = progress;
});
```

---

### 12. Scroll-triggered Background Color Change (Portfolio Hover)

```js
// On hover, the whole portfolio section background changes
$('.portfolio.changed-bg .item').on('mouseenter', '.img', function() {
  const bgcolor = $(this).attr('data-bgcolor');
  $('.portfolio.changed-bg').css('background-color', bgcolor);
});
$('.portfolio.changed-bg .item').on('mouseleave', '.img', function() {
  $('.portfolio.changed-bg').css('background-color', 'transparent');
});
```
```html
<div class="item">
  <div class="img" data-bgcolor="#ff5e57">...</div>
</div>
```

---

### 13. Fixed Header Fade on Scroll

```css
/* Caption fades and moves up as user scrolls */
.fixed-slider .caption {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
```
```js
$(window).scroll(function() {
  const scrolled = $(this).scrollTop();
  $('.fixed-slider .caption').css({
    'transform': `translate3d(0, ${-(scrolled * 0.20)}px, 0)`,
    'opacity':   1 - scrolled / 600
  });
});
```

---

### 14. Navbar Scroll Behavior

```js
$(window).on('scroll', function() {
  if ($(this).scrollTop() > 300) {
    $('.navbar').addClass('nav-scroll');   // solid bg appears
  } else {
    $('.navbar').removeClass('nav-scroll');
  }
});
```

---

### 15. Horizontal Marquee (Sliding Text Bands)

```html
<div class="main-marqv">
  <div class="slide-horizontal">
    <div class="box">
      <!-- repeat items twice for seamless loop -->
      <span>Item 1</span><span>Item 2</span>
      <span>Item 1</span><span>Item 2</span>
    </div>
  </div>
</div>
```
```css
.slide-horizontal .box {
  animation: slide-har 20s linear infinite;
}
.slide-horizontal:hover .box {
  animation-play-state: paused;
}
```

---

## 🎠 Swiper Slider Configurations

### Data-attribute driven (HTML-controlled)
```html
<div data-carousel="swiper"
     data-items="3"
     data-loop="true"
     data-autoplay="5000"
     data-space="30"
     data-swiper-speed="1500"
     data-effect="fade"
     data-center="true"
     class="work-crus3">
  <div id="mySwiper" data-swiper="container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">...</div>
    </div>
  </div>
  <div id="myPagination" data-swiper="pagination"></div>
  <div id="myPrev" data-swiper="prev"></div>
  <div id="myNext" data-swiper="next"></div>
</div>
```

### Breakpoint presets
| Class | xs | sm | md | lg |
|---|---|---|---|---|
| `swiper5` | 2 | 3 | 3 | 5 |
| `swiper4` | 1 | 2 | 3 | 4 |
| `work-crus3` | 1 | 2 | 2 | 3 |
| `work-crus2` | 1 | 2 | 2 | 2 |
| `work-crsol-clum` | 1 | 2 | 2 | 4 |
| `testim-swiper2` | 1 | 1 | 1 | 2 |
| `testim-swiper3` | 1 | 1 | 2 | 3 |
| `blog-carsouel` | 1 | 2 | 2 | 3 |
| `serv-swiper` | 1 | 2 | 3 | 5 |

### Special Slider Types
- **Parallax Slider** — full-page with `data-swiper-parallax` on bg images (speed: 1500ms)
- **Half Image Slider** — thumbnail sync (`gallery-thumb` + `gallery-top`, effect: fade)
- **CRev Slider** — synced text+image sliders (speed: 1500ms, loop: true)
- **Frame Slider, Circle Slider, Interactive Center** — custom showcase types

---

## 🃏 Interactive Work Section

```html
<div class="inter-links-center">
  <ul class="links-text">
    <li data-tab="tab-1">Project Name</li>
    <li data-tab="tab-2">Project Name</li>
  </ul>
  <div class="links-img">
    <div class="img" id="tab-1"><img src="..." alt=""></div>
    <div class="img" id="tab-2"><img src="..." alt=""></div>
  </div>
</div>
```
```js
$('.links-text li').on('mouseenter', function() {
  const tab = $(this).attr('data-tab');
  $('.links-text li').removeClass('current');
  $(this).addClass('current');
  $('.links-img .img').removeClass('current');
  $(`#${tab}`).addClass('current');
  $(this).removeClass('no-active').siblings().addClass('no-active');
});
```

---

## 📊 Skills / Progress Bars

### Linear Progress Bar
```html
<div class="skill-progress">
  <div class="progres" data-value="85%"></div>
</div>
```
```js
// Animates when scrolled into view
$(window).on('scroll', function() {
  $('.skill-progress .progres').each(function() {
    const bottom = $(this).offset().top + $(this).outerHeight();
    if ($(window).scrollTop() + $(window).height() > bottom) {
      $(this).css({ width: $(this).attr('data-value') });
    }
  });
});
```

### Circle Progress
```html
<div class="skills-circle">
  <div class="skill" data-value="0.85"></div>
</div>
```
```js
$('.skills-circle .skill').circleProgress({
  startAngle: -Math.PI / 2,
  value: dataValue,
  thickness: 4,
  size: 140,
  fill: { color: '#ff5e57' }
});
```

---

## 🔢 CountUp Numbers

```html
<div class="number-sec">
  <span class="count">250</span>+
</div>
```
```js
$('.number-sec .count').countUp({ delay: 10, time: 500 });
```

**React equivalent:**
```jsx
import CountUp from 'react-countup';
<CountUp end={250} duration={2} enableScrollSpy scrollSpyOnce />
```

---

## 💡 Data Attributes Reference

| Attribute | Element | Effect |
|---|---|---|
| `data-background="path/to/img.jpg"` | `.bg-img`, `section` | Sets `background-image` via JS |
| `data-solid-color="#000"` | `.bg-solid-color`, `section` | Sets `background-color` via JS |
| `data-bgcolor="#ff5e57"` | `.img` inside portfolio | Triggers section bg change on hover |
| `data-wow-delay=".4s"` | `.wow` elements | Stagger delay for scroll reveal |
| `data-value="85%"` | `.progres` | Width target for progress bars |
| `data-value="0.85"` | `.skill` | Circle progress fill amount (0–1) |
| `data-speed="0.05"` | `.parallax` | Mouse parallax speed multiplier |
| `data-tab="tab-id"` | `.links-text li` | Maps list item to image panel |
| `data-swiper-parallax` | `.bg-img` inside swiper | Parallax offset on swiper transition |
| `data-carousel="swiper"` | Swiper wrapper | Enables data-driven swiper init |
| `data-items="3"` | `[data-carousel]` | slides per view |
| `data-loop="true"` | `[data-carousel]` | Enable looping |
| `data-autoplay="5000"` | `[data-carousel]` | Autoplay delay in ms |
| `data-space="30"` | `[data-carousel]` | Space between slides |
| `data-effect="fade"` | `[data-carousel]` | Transition effect |

---

## 🎨 Color & Visual Style

| Token | Value | Usage |
|---|---|---|
| Accent / Red | `#ff5e57` | Skill circles, CTAs, highlights |
| Dark Background | `#1a1a1a` | Body bg, marquee fade overlay |
| Text Primary | `#ffffff` | Headings on dark |
| Text Muted | `#ccc` | Progress icons, muted text |
| Overlay | `rgba(0,0,0,0.5)` | Image overlays |
| Border | `1px solid rgba(255,255,255,0.1)` | Card borders (`.bord`) |

---

## 🗂️ Pages Reference

| File | Description |
|---|---|
| `home-main.html` | Main dark portfolio home |
| `home-creative.html` | Creative agency home |
| `home-corporate.html` | Corporate business |
| `home-onepage.html` | Single-page portfolio |
| `home-digital-agency.html` | Digital agency layout |
| `home-freelancer.html` | Freelancer personal |
| `home-marketing-agency.html` | Marketing agency |
| `home-creative-agency.html` | Creative agency alt |
| `home-startup.html` | Startup business |
| `home-architecture.html` | Architecture studio |
| `home-personal.html` | Personal/CV style |
| `showcase-parallax.html` | Full parallax showcase |
| `showcase-parallax-slider.html` | Parallax slider showcase |
| `showcase-carousel.html` | Carousel showcase |
| `showcase-circle-slider.html` | Circle/wheel slider |
| `showcase-frame-slider.html` | Frame-style slider |
| `showcase-interactive-center.html` | Interactive hover list |
| `portfolio-grid.html` – `portfolio-grid-4.html` | Grid portfolio layouts |
| `portfolio-masonry-2.html` – `portfolio-masonry-4.html` | Masonry layouts |
| `portfolio-metro.html` | Metro/Windows tile layout |
| `portfolio-modern.html` | Modern portfolio |
| `blog-classic.html` | Classic blog layout |
| `page-about.html` | About page with team/story |
| `page-services.html` | Services listing |
| `page-team.html` | Team grid |
| `page-contact.html` | Contact + map |
| `page-FAQS.html` | Accordion FAQ |
| `page-Oops404.html` | 404 error page |

---

## 🔧 React Implementation Notes

1. **Smooth scroll wrapper** — wrap in `<div id="smooth-wrapper">` and init `ScrollSmoother` with GSAP.
2. **Preloader** — control `body.loaded` class or use React state + GSAP timeline on mount.
3. **WOW.js → Framer Motion** — use `whileInView` + `viewport={{ once: true }}` for identical behavior.
4. **Splitting.js** — works directly in React, call `Splitting()` in `useEffect` after DOM is ready.
5. **Swiper** — use `import { Swiper, SwiperSlide } from 'swiper/react'` and map config props directly.
6. **Custom cursor** — use `useMotionValue` + `useSpring` from framer-motion for smooth tracking.
7. **Isotope Masonry** — use `react-masonry-css` or `@egjs/react-infinitegrid` in React.
8. **Portfolio fixed scroll** — use `IntersectionObserver` or `ScrollTrigger.create` in `useEffect`.

---

## 🤖 AI Prompt (copy-paste for ChatGPT / Claude)

```
Build a dark portfolio React website inspired by the GeekFolio HTML theme. Requirements:

TECH STACK:
- React + Vite (TypeScript optional)
- Framer Motion for all scroll-reveal animations (replaces WOW.js)
- GSAP + ScrollTrigger for the SVG morphing preloader
- Swiper.js React for carousels/sliders
- react-countup for animated statistics

FONTS:
- Poppins (100–900) — primary body font
- Playfair Display (400–800, italic) — hero headings
- Sora (100–800) — section headings
- Epilogue (100–900) — accent/subheadings

ANIMATIONS TO IMPLEMENT:
1. SVG morphing preloader: a full-screen dark overlay with per-letter animated "Loading" text;
   GSAP animates an SVG path from wave-curve → flat, then slides the entire overlay off screen,
   revealing the page with header sliding in from y:200.
2. Rolling text nav links: each nav item letter is duplicated (two blocks stacked);
   on hover all letters translateY(-100%) with staggered cubic-bezier(0.76,0,0.24,1) delays (0s → 0.3s).
3. WOW-style scroll reveal: elements with class "wow fadeIn" or "wow fadeInUp" animate in
   when scrolled into view. Use Framer Motion whileInView, once:true, offset -100px.
   Stagger delays: .1s, .3s, .4s, .5s, .8s, 1s, 1.2s, 1.5s.
4. Image reveal via clip-path: images start with clip-path polygon(0 0,0% 0,0% 100%,0 100%)
   + scale(1.2) + blur(5px), transition to full clip + scale(1) + blur(0) over 0.8s on scroll.
5. Mouse-tracking parallax: floating decorative elements move in opposite direction of cursor
   at configurable speed (data-speed attribute, typically 0.05).
6. Custom cursor: small white dot that follows cursor with spring physics;
   mix-blend-mode:difference; expands to scale(8) opacity(0.1) on hover over links.
7. Horizontal auto-scroll marquee bands: duplicate text items, animate translateX(-100%)
   over 20–30s linear infinite; pause on hover.
8. GSAP ScrollTrigger footer reveal: footer is initially translateY(-50%), scrub-animates
   to translateY(0%) as user scrolls to bottom of main content.
9. Progress scroll button: SVG circle with animated stroke-dashoffset tracking scroll %.
10. 3D rotate text: text starts rotateX(-45deg) translate3d(0,50px,-50px) scale(0.95) opacity:0;
    animates to identity transform on scroll reveal.

COLOR PALETTE:
- Dark bg: #1a1a1a
- Accent red: #ff5e57
- Text: #ffffff
- Muted: #cccccc
- Border: rgba(255,255,255,0.1)

COMPONENTS TO BUILD:
- Preloader (SVG morph + letter animation)
- Navbar with rolling-text links + scroll shrink
- Hero section (multiple variants: split text, parallax bg, full-height slider)
- Services grid with hover card glow
- Portfolio grid with isotope-style category filter
- Interactive work list (hover to reveal image)
- Testimonials Swiper carousel
- Skills section (linear progress bars animated on scroll)
- CountUp statistics section
- Blog cards carousel
- Smooth reveal footer

Make all transitions silky smooth. Use a dark premium aesthetic.
Cards should use glassmorphism with border rgba(255,255,255,0.08) and backdrop-filter blur(10px).
```
