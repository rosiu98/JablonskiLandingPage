let map;

const menu = document.querySelector(".menu-btn");
const linkMenu = document.querySelectorAll(".link");
const navigation = document.querySelector(".header__nav__links");
const menuActive = document.querySelector(".menu-btn active");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const modalContent = [
  {
    image: "./images/box3.png",
    title: "Kategoria B",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.",
    list: [
      "Ukończone 18 lat",
      "Badania lekarskie",
      "Profil Kandydata na Kierowce(PKK)",
    ],
  },

  {
    image: "./images/box2.png",
    title: "Kategoria D",
    text: "Lorem ipsum consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore.",
    list: [
      "Ukończone 18 lat",
      "Badania lekarskie",
      "Profil Kandydata na Kierowce(PKK)",
    ],
  },

  {
    image: "./images/box1.png",
    title: "Kategoria C + E",
    text: "Lorem ipsum dolor sit amet, consectetur tempor incididunt ut labore et dolore magna aliqua.",
    list: ["Ukończone 18 lat", "Badania lekarskie"],
  },
];

//javascript for scroll to top button
const scrollBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function () {
  scrollBtn.classList.toggle("show", window.scrollY > 500);
});

//javascript for scroll back to top on on click scroll-to-top button
scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

//javascript for reveal website elements on scroll
window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

// navbar show on scroll to top and hide on down
let lastScrollTop = 0;
const navbar = document.querySelector(".header__nav");
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-200px";
  } else {
    navbar.style.top = "0";
  }

  if (window.scrollY > 0) {
    navbar.style.background = "white";
    navbar.style.boxShadow = "5px 10px 20px rgba(0, 0, 0, 0.25)";
  } else {
    navbar.style.background = "none";
    navbar.style.boxShadow = "none";
  }

  lastScrollTop = scrollTop;
});

const openMenu = function () {
  navigation.classList.toggle("active");
  menu.classList.toggle("active");
};

// on click on menu link remove navigation active class
linkMenu.forEach((link) =>
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
    menu.classList.remove("active");
  })
);

menu.addEventListener("click", openMenu);

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", function (e) {
    //openModal
    e.preventDefault();
    modal.innerHTML = `
    <button class="close-modal">&times;</button>
    <div class="modal__main">
      <div class="modal__main__image">
        <img src="${modalContent[i].image}" alt="kategoria-b">
      </div>
      <div class="modal__main__title">
        <h1 class="h1-primary">${modalContent[i].title}</h1>
      </div>
      
      <div class="modal__main__text">
        <p>
        ${modalContent[i].text}
        </p>
      </div>
      <div class="modal__main__list">
        <ul>
        ${modalContent[i].list
          .map(
            (item) =>
              `<li><span>✅</span>
            ${item}
          </li>`
          )
          .join(" ")}
        </ul>
      </div>


    </div>
`;
    document
      .querySelector(".close-modal")
      .addEventListener("click", closeModal);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
}

overlay.addEventListener("click", closeModal);
// overlay.addEventListener("click", );

document.addEventListener("keydown", function (event) {
  // Pokazuje ,ktory klawisz naciskamy
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.19097656879167, lng: 20.292741113753102 },
    zoom: 16,
    disableDefaultUI: true,
  });

  new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: { lat: 50.19097656879167, lng: 20.292741113753102 },
    map: map,
  });
}

function initParadoxWay() {
  if ($(".testimonials-carousel").length > 0) {
    var j2 = new Swiper(".testimonials-carousel .swiper-container", {
      preloadImages: false,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      mousewheel: false,
      centeredSlides: true,
      pagination: {
        el: ".tc-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".listing-carousel-button-next",
        prevEl: ".listing-carousel-button-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
}

//   Init All ------------------
$(document).ready(function () {
  initParadoxWay();
});
