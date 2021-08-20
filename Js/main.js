//============ Navigation tabs ===================

(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
    function showNavMenu() {
        navMenu.classList.toggle("open");
        bodyScrollingToggle();
    }
    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')) {
            // make sure event.target.hash has a value before overridding deafult behaviour
            if (event.target.hash !== "") {
                // prevent deafult  anchor click behaviour
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active seaction
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                //activate new 'section
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                // // deactivate existing  activate menu "link-iteam"
                // navMenu.querySelector("li").classList.add("outer-shadow", "hover-in-shadow");
                // navMenu.querySelector("li").classList.remove("active", "inner-shadow");

                // if clicked "link-item is contained withing the navigation menu"

                if (navMenu.classList.contains("open")) {
                    // activate new navigation menu "links-item"
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");

                    // hide navigation  menu
                    hideNavMenu();
                }
                else {
                    let navItems = navMenu.querySelector(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // activate new nevigation menu "link-item"
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");


                        }

                    })
                    fadeOutEffect();
                }





            }

        }

    })


})();
// _____________________about section tabs___________
(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        // id event.target conatin 'tab-item   class and not  contains
        if (
            event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")
        ) {
            const target = event.target.getAttribute("data-target");
            // deactive existing active 'tab-item
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            //  activation new 'tab-item'
            event.target.classList.add("active", "outer-shadow");

            //  deactication existing active "ta-items"
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // activation new 'tab-content'

            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();



function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}

//*---------- Portfolio filter and popup ------------------

(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, scrrenshots;

    // filter portfolio items

    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")
        ) {
            // deactivate existing active "filter-item"
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            // activate new "filter-item"

            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-heading");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");

                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");

                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;


            // get the portfolioItems Index

            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenShots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshot")

            // Convert screenshots into array

            screenShots = screenShots.split(",");
            if (screenShots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();

        }

    })


    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToogle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();

    }

    function popupSlideshow() {
        const imgSrc = screenShots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // "Active  Loader until the popupImg loaded"

        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;

        popupImg.onload = () => {
            // deactivate loader after the popupimg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + "of" + screenShots.length;

    }

    //  Next slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenShots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
    })

    // prev slide
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenShots.length - 1
        } else {
            slideIndex--;
        }
        popupSlideshow();

    })

    function popupDetails() {

        // if  portfolio-item-details not exist

        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return; // "end function execution"


        }

        projectDetailsBtn.style.display = "block ";
        // get the project details 
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // set the project detais
        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title
        const title = portfolioItems[itemIndex].querySelector(".portifolio-item-title").innerHTML;
        // set the project ttile
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // det the project categroy
        popup.querySelector(".pp-project-category").innerHTML = category?.split("-").join(" ");


    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToogle();


    })


    function popupDetailsToogle() {
        if (projectDetailsContainer.classList.contains("active")) {

            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");

            projectDetailsContainer.classList.remove("active")
            projectDetailsContainer.style.maxHeight = 0 + "px";


        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }


    }



})();


// =========================== Testimonial Slider ========================== //

(() => {


    const slideContainer = document.querySelector(".testi-slider-container"),
        slides = slideContainer.querySelectorAll(".testi-item"),
        slideWidth = slideContainer.offsetWidth,
        prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next"),
        activeSlide = slideContainer.querySelector(".testi-item.active");


    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
        activeSlide
    );

    // set width od all slides

    slides.forEach((slide) => {

        slide.style.width = slideWidth + "px";

    })

    // set width of slideContainer

    slideContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;

        } else {
            slideIndex++;
        }

        slider();

    })

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        } else {

            slideIndex--;

        }
        slider();

    })



    function slider() {

        // Deactivate existing active slide
        slideContainer.querySelector(".testi-item").classList.remove("active");

        // activate new slide
        slides[slideIndex].classList.add("active");
        slideContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
    }




})();

// ---------------------- hide all section sxcept active  ----------------------------//

(() => {
    const section = document.querySelectorAll(".section");
    section.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })


})();


window.addEventListener("load", () => {
    //preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";

    }, 600)
})