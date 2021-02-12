
document.addEventListener('DOMContentLoaded', function () {



  const accordionArrow = document.querySelectorAll('.nav__link-arrow');
  const body = document.querySelector('body');
  const burger = document.querySelector('.burger-btn');
  const menu = document.querySelector('.header__nav-inner');
  const menuClose = document.querySelector('.btn-close__burger');
  const user = document.querySelector('.user .user-burger');
  const footerAccordion = document.querySelectorAll('.footer__columns-title');
  let nextBtn = document.querySelector('.slider__nav-next');
  let prevBtn = document.querySelector('.slider__nav-prev');
  let sliderContainer = document.querySelector('.swiper-container1');

  const getClass = (item) => {
    if (!item.classList.contains('active')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  };

  const openClose = (e) => {
    footerAccordion.forEach(item => {
      const accordionWrapper = item.parentNode;
      // item.addEventListener('click', () => {
      //   getClass(accordionWrapper);
      // });
      if (item.contains(e.target)) {
        getClass(accordionWrapper);
      }
    });
    let userParent = user.parentNode;
    console.log(user.parentNode);
    accordionArrow.forEach(arrow => {
      const arrowParent = arrow.parentNode;
      if (arrow.contains(e.target)) {
        arrowParent.classList.toggle('active');
      }
    });
    if (burger.contains(e.target)) {
      getClass(menu);
      getClass(body);
    } else if (!menu.contains(e.target) || menuClose.contains(e.target)) {
      if (userParent.classList.contains('active')) {
        removeClass(userParent);
      }
      removeClass(menu);
      removeClass(body);

      accordionArrow.forEach(arrow => {
        arrow.parentNode.classList.remove('active');
      });
    } else if (user.contains(e.target)) {
      getClass(userParent);
    }
  };



  const removeClass = (item) => {
    item.classList.remove('active');
  };

  const onresize = () => {
    let width = document.body.clientWidth;

    if (width <= 916) {
      console.log(width);
      document.addEventListener('click', openClose);

    } else {
      // body.classList.remove('active');
      removeClass(menu);
      removeClass(body);
    }
  };

  onresize();

  window.addEventListener("resize", onresize);
  window.addEventListener("load", onresize);
  window.addEventListener('scroll', () => {
    const stickyHeader = document.querySelector('.sticky-header');
    let width = document.body.clientWidth;

    if (window.pageYOffset > 196 && width > 916) {
      stickyHeader.classList.add('sticky');
    } else {
      stickyHeader.classList.remove('sticky');
    }
  });
  // window.addEventListener("load", onresize);









  let mainSwiper = new Swiper('.main-swiper', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'fraction',
    },
  });


  // Динамический адаптив

  let swiper = new Swiper(sliderContainer, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    breakpoints: {
      640: {
        slidesPerView: 'auto',
        spaceBetween: 10,
      },
      1065: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1425: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
  });

  const ourWorksSlider = document.querySelector('.our-works__slider');
  const reviewSlider = document.querySelector('.reviews-swiper');

  const ourWorks = new Swiper(ourWorksSlider, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: ".our-works__slider .swiper-button-next",
      prevEl: ".our-works__slider .swiper-button-prev",
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
      },
    },
  });

  // let createSwipe = (swiper, slidesView, margin) => {
  //   let mySwiper = new Swiper(swiper, {
  //     slidesPerView: slidesView,
  //     spaceBetween: margin,
  //     loop: true,
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //   });
  // };
  let reviewSwiper = new Swiper(reviewSlider, {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoHeight: true,
    navigation: {
      nextEl: ".reviews-swiper .swiper-button-next",
      prevEl: ".reviews-swiper .swiper-button-prev",
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      916: {
        slidesPerView: 2,
        spaceBetween: 30,

        navigation: false
      },
    },
  });


  let asideItem = document.querySelectorAll('.aside__filter-item');
  asideItem.forEach(elem => {
    if (elem.classList.contains('aside__filter-slider')) {
      let nonLinearSlider = document.querySelector('.range-slider');
      noUiSlider.create(nonLinearSlider, {
        connect: true,
        behaviour: 'tap',
        start: [198, 1249],
        animationDuration: 300,
        step: 1,
        range: {
          'min': [0],
          'max': [1529]
        }
      });
      let nodes = [
        document.getElementById('lower-value'), // 0
        document.getElementById('upper-value')  // 1
      ];
      nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
        nodes[handle].innerHTML = `$${Math.floor(values[handle])}`;
      });
    }
  });

  const selectFunction = () => {
    const customSelect = document.querySelectorAll('.custom-select');
    customSelect.forEach(elem => {
      const choices = new Choices(elem, {
        searchEnabled: false,
        itemSelectText: '',
      });
    });
  };

  selectFunction();

  const galleryThumbs = new Swiper('.product-cart__slider-thumbs', {
    spaceBetween: 10,
    slidesPerView: 3,
    loop: false,
    freeMode: true,
    direction: 'horizontal',
    loopedSlides: 4,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      800: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1205: {
        slidesPerView: 4,
        spaceBetween: 20,
        direction: 'vertical',
      },
    },
  });
  const galleryTop = new Swiper('.product-cart__slider-top', {

    spaceBetween: 10,
    loop: true,
    loopedSlides: 4,
    thumbs: {
      swiper: galleryThumbs,
    },
  });

  const aboutUsSwiper = new Swiper('.about-us-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".about-us__slider-wrapper .swiper-button-next",
      prevEl: ".about-us__slider-wrapper .swiper-button-prev",
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: false,
      },
    },
  });
  const blogPostSlider = new Swiper('.blog-post-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".about-us__slider-wrapper .swiper-button-next",
      prevEl: ".about-us__slider-wrapper .swiper-button-prev",
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: false,
      },
      917: {
        slidesPerView: 4,
        spaceBetween: 20,
        centeredSlides: false,
      },
      1205: {
        slidesPerView: 5,
        spaceBetween: 20,
        centeredSlides: false,
      },
    },
  });

  const relatedPostSwiper = new Swiper('.related-post__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    // centeredSlides: false,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      560: {
        slidesPerView: 2,
        spaceBetween: 10,
        centeredSlides: false,
      },
      661: {
        slidesPerView: 3,
        spaceBetween: 10,
        centeredSlides: false,
      },
      917: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
      },
    },
  });

  const catalogSliderWrapper = document.querySelector('.catalog__slider-container');

  let catalogSlider = new Swiper(catalogSliderWrapper, {
    slidesPerView: 'auto',
    // spaceBetween: 30,
    // loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  const catalogSliderCard = document.querySelectorAll('.catalog__slider-card');
  catalogSliderCard.forEach(el => {
    let catalogCardSlider = new Swiper(el, {
      slidesPerView: 1,
      // spaceBetween: 20,
      autoHeight: true,
      loop: false,
      pagination: {
        el: '.catalog__slider-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: el.querySelector('.catalog__slider-card__btns .swiper-button-next'),
        prevEl: el.querySelector('.catalog__slider-card__btns .swiper-button-prev'),
      },
      breakpoints: {
        575: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  });

  // const shoppingSiderCard = document.querySelector('.shopping-cart__slider');

  let shoppingCardSlider = new Swiper('.shopping-cart__slider', {
    slidesPerView: 1,
    // spaceBetween: 20,
    autoHeight: true,
    loop: true,
    pagination: {
      el: '.catalog__slider-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.catalog__slider-card__btns .swiper-button-next',
      prevEl: '.catalog__slider-card__btns .swiper-button-prev',
    },
    breakpoints: {
      575: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      917: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });


  // 2 of 4 : PHOTOSWIPE #######################################
  // https://photoswipe.com/documentation/getting-started.html //

  let initPhotoSwipeFromDOM = function (gallerySelector, slider) {
    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    let parseThumbnailElements = function (el) {
      let thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

      for (let i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element

        // include only element nodes
        if (figureEl.nodeType !== 1) {
          continue;
        }

        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute("data-size").split("x");

        // create slide object
        item = {
          src: linkEl.getAttribute("href"),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        // if (figureEl.children.length > 1) {
        //   // <figcaption> content
        //   // item.title = figureEl.children[1].innerHTML;
        // }

        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute("src");
        }

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    // find nearest parent element
    let closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    let onThumbnailsClick = function (e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);

      let eTarget = e.target || e.srcElement;

      // find root element of slide
      let clickedListItem = closest(eTarget, function (el) {
        return el.tagName && el.tagName.toUpperCase() === "FIGURE";
      });

      if (!clickedListItem) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      let clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (let i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }

      if (index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    let photoswipeParseHash = function () {
      let hash = window.location.hash.substring(1),
        params = {};

      if (hash.length < 5) {
        return params;
      }

      let vars = hash.split("&");
      for (let i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        let pair = vars[i].split("=");
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    let openPhotoSwipe = function (
      index,
      galleryElement,
      disableAnimation,
      fromURL
    ) {
      let pswpElement = document.querySelectorAll(".pswp")[0],
        gallery,
        options,
        items;

      items = parseThumbnailElements(galleryElement);

      // #################### 3/4 define photoswipe options (if needed) ####################
      // https://photoswipe.com/documentation/options.html //
      options = {
        /* "showHideOpacity" uncomment this If dimensions of your small thumbnail don't match dimensions of large image */
        //showHideOpacity:true,

        // Buttons/elements
        closeEl: true,
        captionEl: false,
        fullscreenEl: true,
        zoomEl: true,
        shareEl: false,
        counterEl: false,
        arrowEl: true,
        preloaderEl: true,
        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute("data-pswp-uid"),
        getThumbBoundsFn: function (index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          let thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
            pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      };

      // PhotoSwipe opened from URL
      if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for (let j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // exit if index not found
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();

      gallery.listen("unbindEvents", function () {
        // This is index of current photoswipe slide
        let getCurrentIndex = gallery.getCurrentIndex();
        // Update position of the slider
        if (slider) {
          slider.slideTo(getCurrentIndex, false);
        }

        // 2/2. Start swiper autoplay (on close - if swiper autoplay is true)
        // slider.autoplay.start();
      });
      // 2/2. Extra Code (Not from photo) - swiper autoplay stop when image zoom */
      // gallery.listen('initialZoomIn', function () {
      //   if (slider.autoplay.running) {
      //     // slider.autoplay.stop();
      //   }
      // });
      // 2/2. Extra Code (Not from photo) - swiper autoplay stop when image zoom */

    };

    // loop through all gallery elements and bind events
    let galleryElements = document.querySelectorAll(gallerySelector);

    for (let i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute("data-pswp-uid", i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    let hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  };

  // execute above function

  initPhotoSwipeFromDOM(".my-gallery", galleryTop);
  initPhotoSwipeFromDOM(".about-us-gallery", aboutUsSwiper);
  initPhotoSwipeFromDOM(".blog-post-gallery", blogPostSlider);
  initPhotoSwipeFromDOM(".ourWorks-gallery");


  const passwordToggle = () => {
    const passwordBtn = document.querySelectorAll('.password-icon');
    passwordBtn.forEach(btn => {
      const input = btn.parentElement.querySelector('input[type="password"]');
      btn.addEventListener('click', () => {
        if (input.type === 'password') {
          input.type = 'text';
          btn.classList.add('active');
        } else {
          input.type = 'password';
          btn.classList.remove('active');
        }
      });
    });
  };


  passwordToggle();





});



// let validateForms = function (selector, rules) {
//   new window.JustValidate(selector, {
//     rules: rules
//   });
// };

// validateForms('.form', {
//   name: {
//     required: true,
//     minLength: 3,
//   },
//   email: {
//     required: true
//   },
//   surname: {
//     required: true,
//     minLength: 3,
//   },
//   password: {
//     required: true,
//     password: true,
//   },
//   repassword: {
//     required: true,
//     password: true,
//   },
// });

// validateForms('.form__register', {
//   email: {
//     required: true
//   },
//   name: {
//     required: true,
//     minLength: 3,
//   },
//   surname: {
//     required: true,
//     minLength: 3,
//   },
//   password: {
//     required: true,
//     password: true,
//   },
//   repassword: {
//     required: true,
//     password: true,
//   },
// });

// validateForms('.form__login', {
//   email: {
//     required: true,
//     email: true,
//   },
//   password: {
//     required: true,
//     password: true,
//   },
// });


/**
 * @param {string} hash_trigger Hash string, that will be used to trigger open and close menu
 * @param {string} open_class Optional style class name when menu is opened, default 'menu-opened'
 * @param {string} close_class  Optional style class name when menu is closed, default menu-closed
  */


class MenuOpenClose {

  constructor(hash_trigger = 'open-menu', open_class = 'menu-opened', close_class = 'menu-closed') {
    this.hash_trigger = hash_trigger;
    this.open_class = open_class;
    this.close_class = close_class;
    this.open = false;
    this.init();
  }

  get openMenu() {
    const body_classList = document.body.classList;
    body_classList.add(this.open_class);
    body_classList.remove(this.close_class);
    this.open = true;

    return true;
  }

  get closeMenu() {
    const body_classList = document.body.classList;
    body_classList.add(this.close_class);
    body_classList.remove(this.open_class);
    this.open = false;

    return false;
  }


  get toggle() {
    if (location.hash.includes(this.hash_trigger)) {
      this.closeMenu;
      location.hash = '';
    }
    else {
      this.openMenu;
      location.hash = this.hash_trigger;
    }
  }

  hashTrigger(event) {

    if (event) event.preventDefault();

    if (location.hash.includes(this.hash_trigger))
      this.openMenu;
    else
      this.closeMenu;
  }

  init() {
    window.addEventListener("hashchange", event => this.hashTrigger(event));
    // window.addEventListener("scroll", event => this.closeMenu);
    this.hashTrigger();
  }
}

const counterBtn = document.querySelectorAll('.counter__btn');
let input = document.querySelector('.counter__input');
input.addEventListener('change', () => {
  if (input.value.length > 2) {
    input.value = 99;
  }
});
console.log(input);

counterBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let input = btn.parentElement.querySelector('.counter__input');
    if (input.value >= 99) {
      input.value = 0;
    }
    // const plus = document.querySelector('.counter__btn-plus');

    // if (plus.contains(e.target)) {
    //   input.value++;
    // }
    // else if(input.value <= 1){
    //   input.value = 1;
    // }
    // else {
    //   input.value--;
    // }
    const plusMinus = btn.classList.contains('counter__btn-plus') ?
      'plus' :
      'minus';

    switch (plusMinus) {
      case "plus":
        input.value++;
        break;
      case "minus":
        if (input.value > 1) {
          input.value--;
        }
        break;
    }
  });
});






