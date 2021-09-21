let map;

const menu = document.querySelector(".menu-btn");
const navigation = document.querySelector(".header__nav__links");
const menuActive = document.querySelector(".menu-btn active");

const openMenu = function () {
  navigation.classList.toggle("active");
  menu.classList.toggle("active");
};

menu.addEventListener("click", openMenu);

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
