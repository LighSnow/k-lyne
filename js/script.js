
document.addEventListener('DOMContentLoaded', function () {
  const accordionArrow = document.querySelectorAll('.nav__link-arrow');
  const body = document.querySelector('body');
  const burger = document.querySelector('.burger-btn');
  const menu = document.querySelector('.header__nav-inner');
  const menuClose = document.querySelector('.burger-close');
  const user = document.querySelector('.user .header__item-link');
  const footerAccordion = document.querySelectorAll('.footer__columns-title');


  const getClass = (item) => {
    if (!item.classList.contains('active')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  };

  const removeClass = (item) => {
    item.classList.remove('active');
  };

  const onresize = () => {
    let width = document.body.clientWidth;

    if (width <= 916) {
      console.log(width);
      window.addEventListener('click', openClose);

      footerAccordion.forEach(item => {
        const accordionWrapper = item.parentNode;
        item.addEventListener('click', () => {
          getClass(accordionWrapper);
        });
      });
    } else {
      // body.classList.remove('active');
      removeClass(menu);
      removeClass(body);
    }
  };
  // menuClose.addEventListener('click', () => {
  //   menu.classList.remove('active');
  // });
  // accordionArrow.forEach(arrow => {
  //   const arrowParent = arrow.parentNode;
  //   arrow.addEventListener('click', () => {
  //     if (!arrowParent.classList.contains('active')) {
  //       arrowParent.classList.add('active');
  //     } else {
  //       arrowParent.classList.remove('active');
  //     }
  //   });
  // });

  const openClose = (e) => {


    let userParent = user.parentNode;
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
    // else {
    //   removeClass(userParent);
    // }
  };


  onresize();
  window.addEventListener("resize", onresize);
  // window.addEventListener("load", onresize);





  // function openClose(e) {
  //   accordionArrow.forEach(arrow => {
  //     const arrowParent = arrow.parentNode;
  //     if (arrow.contains(e.target)) {
  //       arrowParent.classList.toggle('active');
  //     }
  //   });

  //   if (burger.contains(e.target)) {
  //     // openMenu(e);
  //     // getClass(menu);
  //     menu.classList.add('active');
  //     body.classList.add('active');
  //   } else if (!menu.contains(e.target) || menuClose.contains(e.target)) {
  //     if (!user.classList.contains(e.target)) {
  //       user.classList.remove('active');
  //     }
  //     menu.classList.remove('active');
  //     body.classList.remove('active');

  //     accordionArrow.forEach(arrow => {
  //       arrow.parentNode.classList.remove('active');
  //     });
  //   } else if (user.contains(e.target)) {
  //     if (!user.classList.contains('active')) {
  //       user.classList.add('active');
  //     } else {
  //       user.classList.remove('active');
  //     }
  //   }
  // }

  // Динамический адаптив

  class DynamicAdapt {
    // массив объектов
    elementsArray = [];

    init() {
      // массив DOM-элементов
      this.elements = [...document.querySelectorAll('[data-da]')];

      // наполнение elementsArray объктами
      this.elements.forEach((element) => {
        const data = element.dataset.da.trim();
        if (data !== '') {
          const dataArray = data.split(',');

          const oElement = {};
          oElement.element = element;
          oElement.parent = element.parentNode;
          oElement.destination = document.querySelector(`.${dataArray[0].trim()}`);
          oElement.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
          oElement.place = dataArray[2] ? dataArray[2].trim() : 'last';
          oElement.type = dataArray[3] ? dataArray[3].trim() : 'max';

          this.elementsArray.push(oElement);
        }
      });

      this.arraySort(this.elementsArray);

      // массив уникальных медиа-запросов
      this.mediaArray = this.elementsArray
        .map(({ type, breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`)
        .filter((item, index, self) => self.indexOf(item) === index);

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      this.mediaArray.forEach((item) => {
        const itemSplit = item.split(',');
        const media = window.matchMedia(itemSplit[0]);
        const breakpoint = itemSplit[1];
        media.addEventListener('change', this.mediaHandler.bind(this, media, breakpoint));
        this.mediaHandler.call(this, media, breakpoint);
      });
    }

    // Основная функция
    mediaHandler(media, breakpointMeida) {
      // массив объектов с подходящим брейкпоинтом
      const elementsFilter = this.elementsArray.filter(
        ({ breakpoint }) => breakpoint === breakpointMeida,
      );

      if (media.matches) {
        elementsFilter.forEach((oElement) => {
          // получение индекса внутри родителя
          oElement.index = this.indexInParent(
            oElement.parent, oElement.element,
          );
          this.moveTo(oElement.place, oElement.element, oElement.destination);
        });
      } else {
        elementsFilter.forEach(({ parent, element, index }) => {
          this.moveBack(parent, element, index);
        });
      }
    }

    // Функция перемещения
    moveTo(place, element, destination) {
      if (place === 'last' || place >= destination.children.length) {
        destination.append(element);
        return;
      }
      if (place === 'first') {
        destination.prepend(element);
        return;
      }
      destination.children[place].before(element);
    }

    // Функция возврата
    moveBack(parent, element, index) {
      if (parent.children[index] === undefined) {
        parent.append(element);
        return;
      }
      parent.children[index].before(element);
    }

    // Функция получения индекса внутри родителя
    indexInParent(parent, element) {
      return [...parent.children].indexOf(element);
    }

    // Функция сортировки массива по breakpoint и place по возрастанию
    arraySort(arr) {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }
          return a.place - b.place;
        }
        return a.breakpoint - b.breakpoint;
      });
    }
  }

  const da = new DynamicAdapt();
  da.init();

  let sliderInner = document.querySelector('.slider__inner');
  let nextBtn = sliderInner.querySelector('.swiper-button-next');
  let prevBtn = sliderInner.querySelector('.swiper-button-prev');
  let sliderContainer = sliderInner.querySelector('.swiper-container1');

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

  const sliders = document.querySelectorAll('.swiper-container');

  
  
  const ourWorksSlider = document.querySelector('.our-works__slider');
  const reviewSlider = document.querySelector('.reviews-swiper');

  const ourWorks = new Swiper(ourWorksSlider, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: false,
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

  // createSwipe(reviewSlider, 2, 30);
  const slidersSwipe = [];
  sliders.forEach(el => {
    let mySwiper = new Swiper(el, {
      slidesPerView: 'auto',
      // spaceBetween: 30,
      loop: true,
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true,
      },
      
    });
    slidersSwipe.push(mySwiper);
  });
  console.log(slidersSwipe);

  // 2 of 4 : PHOTOSWIPE #######################################
  // https://photoswipe.com/documentation/getting-started.html //

  let initPhotoSwipeFromDOM = function (gallerySelector) {
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
        return el.tagName && el.tagName.toUpperCase() === "DIV";
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

      /* ########### PART 4 - EXTRA CODE  ########### */
      /* EXTRA CODE (NOT FROM photoswipe CORE) - 
      1/2. UPDATE SWIPER POSITION TO THE CURRENT ZOOM_IN IMAGE (BETTER UI) */
      // photoswipe event: Gallery unbinds events
      // (triggers before closing animation)

      let functionHuy = (currentSlider) => {
        // This is index of current photoswipe slide
        let getCurrentIndex = gallery.getCurrentIndex();
        // Update position of the slider
        currentSlider.slideTo(getCurrentIndex, true);
        // 2/2. Start swiper autoplay (on close - if swiper autoplay is true)
        // currentSlider.autoplay.start();
      };

      let functionHuy2 = (currentSlider) => {
        if (currentSlider.autoplay.running) {
          currentSlider.autoplay.stop();
        }
      };

      gallery.listen("unbindEvents", function () {
        functionHuy(ourWorks);
      });

      gallery.listen('initialZoomIn', function () {
        functionHuy2(ourWorks);
      });




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
  initPhotoSwipeFromDOM(".my-gallery");

});