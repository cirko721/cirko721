"use strict";

// Some elements-
const header = document.querySelector(".header");
const message = document.createElement("div");
const section1 = document.querySelector("#section--1");
const sections = document.querySelectorAll(".section");
const h1 = document.querySelector("h1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnLearnMore = document.querySelector(".btn--scroll-to");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Page navigation-
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////
///////////////////////////////////////
// Cookie message-
message.classList.add("cookie-message");
message.innerHTML =
  'We used cookies for best functionality and for some analystics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

message.style.backgroundColor = "#37383d";
message.style.width = "120%";
document.querySelector("body").style.overflowX = "hidden";
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";
// document.documentElement.style.setProperty("--color-primary", "blueviolet");

// Scroll smooth to section-
btnLearnMore.addEventListener("click", function () {
  const seccoord = section1.getBoundingClientRect();

  // window.scrollTo(x,y);
  // window.scrollTo({
  //   left: 0,
  //   top: 667,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

// Nav menu fade animation-
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Adding OPERATIONS content-
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;

  // Active tab-
  tabs.forEach((el) => el.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // Active content-
  const id = clicked.getAttribute("data-tab");
  tabsContent.forEach((el) => {
    el.classList.remove("operations__content--active");
    if (el.classList.contains(`operations__content--${id}`))
      el.classList.add("operations__content--active");
  });
});

// Implementing scroll sticky navbar-

// window.addEventListener("scroll", function (e) {
//   const coord = section1.getBoundingClientRect();                       <------NOT A GOOD PRACTICE.
//   if (window.scrollY > coord.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry)
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const navHeight = nav.getBoundingClientRect().height;
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

observer.observe(header);

// Implementing Reaviling items on scroll-
const revealing = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  reavilObs.unobserve(entry.target);
};

const reavilObs = new IntersectionObserver(revealing, {
  root: null,
  threshold: 0.15,
});

sections.forEach((sec) => {
  sec.classList.add("section--hidden");
  reavilObs.observe(sec);
});

// Implementing Reaviling IMAGES on scroll-
const imgTargets = document.querySelectorAll("img[data-src]");

const imgReveal = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgReveal, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

// Implementing SLIDER-  
const sliderFunc = function () {
  let currSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const dots = document.querySelector(".dots");

  const createDots = function () {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        "beforeend",
        `
    <button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      );
    });
  };

  // ========FUNCTIONS========>
  const dotActive = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // NEXT Slide-
  const nextSlide = function () {
    if (currSlide === slides.length - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    dotActive(currSlide);
  };

  // PREVIOUS Slide-
  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = slides.length - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    dotActive(currSlide);
  };

  // Default parameters on start-
  const init = function () {
    createDots();
    dotActive(0);
    goToSlide(0);
  };
  init();

  // Arrow buttons-
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // ARROW KEY slider-
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Dots button-
  dots.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      dotActive(slide);
    }
  });
};
sliderFunc();

// Adding or remove event listeners-
// const alertH1 = function (e) {
//   alert("Nice! you reed a h1.");
//   h1.removeEventListener("mouseenter", alertH1);
// };
// h1.addEventListener("mouseenter", alertH1);

// Page navigation-
// document.querySelectorAll(".nav__link").forEach(el => el.addEventListener("click", function(e) {
//   e.preventDefault();
//   const id = this.getAttribute("href");
//   document.querySelector(id).scrollIntoView({behavior: "smooth"});
// }));
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains("nav__link")) {
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });
// console.log(h1.children)
// h1.firstElementChild.style.color = "blueviolet";
// console.log(h1.parentElement)

// ============OBSERVER================>
// const observerCallback = function(entries, observer) {
//   entries.forEach(entry => console.log(entry));
// }

// const obsOptions = {
//   root: null,
//   threshold: [0.3, 0.01],
// }

// const observer = new IntersectionObserver(observerCallback, obsOptions)
// observer.observe(section1);

// MESSAGE: Changes you made may not be saved.
// window.addEventListener("beforeunload", function(e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });