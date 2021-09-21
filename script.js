let map;

const menu = document.querySelector(".menu-btn");
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

const openMenu = function () {
  navigation.classList.toggle("active");
  menu.classList.toggle("active");
};

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

    // add text
  });
}

// btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  // console.log(event.key) Pokazuje ,ktory klawisz naciskamy
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
