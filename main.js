import gsap, { Expo, Power0, Power2, Power4 } from 'gsap'
import { CustomEase, Linear, Sine } from 'gsap/all';
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Swiper from 'swiper';
import { Controller, Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';



const textSplitting = (element) => {
    var text = element.innerText;
    var wordsArray = text.split(' ');
    var newHTMLContent = wordsArray.map(function (word) {
        return '<span class="inline-flex"><span class="inline-flex will-change-transform">' + word + '</span></span>';
    }).join(' ');
    element.innerHTML = newHTMLContent;
}







const animationWork = () => {
    const itemWork = document.querySelectorAll('.items-anim-work');
    const imageScale = document.querySelectorAll('.image-scale-animation img');
    let prevIndex = 0;
    let zIndex = 2
    gsap.to(imageScale, { scale: 1.4, autoAlpha: 0, willChange: `transform` })
    itemWork.forEach((item, index) => {


        // split heading
        const itemHead = item.querySelectorAll('.heading-item');
        const itemHeadTitle = itemHead[0].innerText.split('');
        itemHead[0].innerHTML = `<span></span><span></span>`;
        const innerSpan1 = itemHead[0].querySelectorAll(`span`);
        itemHeadTitle.forEach((item) => {
            innerSpan1[0].innerHTML += `<span>${item}</span>`
            innerSpan1[1].innerHTML += `<span>${item}</span>`
        })


        itemWork.forEach(item => {
            const singleWord = item.querySelectorAll(`.heading-item > span`)[0]?.querySelectorAll('span');
            const line = item.querySelectorAll('.line-separator');

            // console.log(singleWord);
            gsap.set(singleWord, { yPercent: 92 })
            gsap.set(singleWord, { yPercent: 92 })
            gsap.set(line, { autoAlpha: .1 })
        });


        item.addEventListener('mouseenter', () => {

            const title = itemWork[index].querySelectorAll(`.heading-item > span`);
            const line = itemWork[index].querySelectorAll('.line-separator');
            const textAnim = itemWork[index].querySelectorAll('.text-anim');
            const arrowAnim = itemWork[index].querySelectorAll('.arrow-anim');
            const contextAnim = itemWork[index].querySelectorAll('.context-anim');





            if (title) {
                gsap.to(title[0].querySelectorAll('span'), { yPercent: 0, stagger: .025, ease: Power2.easeInOut, duration: .4, willChange: `transform` })
                gsap.to(title[1].querySelectorAll('span'), { yPercent: -92, stagger: .025, ease: Power2.easeInOut, duration: .4, willChange: `transform` })
                gsap.to(line, { autoAlpha: 1 })
                gsap.to(arrowAnim, { scale: 1, duration: .6, ease: Power2.easeInOut })
                gsap.to(textAnim, { autoAlpha: 1, x: -50, duration: .6, ease: Power2.easeInOut })
                gsap.to(contextAnim, { autoAlpha: 1, duration: .6, ease: Power2.easeInOut })
            }


            // image-scale-animation
            const timeline = gsap.timeline();
            timeline.to(imageScale, { autoAlpha: 0, scale: 1.21, duration: 0, zIndex: 0, filter: `blur(4px)`, })
            timeline.to(imageScale[prevIndex], { scale: 1.02, autoAlpha: 1, duration: 0 }, `<`)
            timeline.to(imageScale[prevIndex], { zIndex: zIndex - 1, duration: 0 }, `<`)
            timeline.to(imageScale[index], { scale: 1.02, autoAlpha: 1, duration: .3 })
            timeline.to(imageScale[index], { zIndex: zIndex, duration: 0 }, `<`)
            timeline.to(imageScale[index], { filter: `blur(0px)` }, `<`)
            prevIndex = index;
            zIndex++;


        })

        item.addEventListener('mouseleave', () => {

            const title = itemWork[index].querySelectorAll(`.heading-item > span`);
            const line = itemWork[index].querySelectorAll('.line-separator');
            const textAnim = itemWork[index].querySelectorAll('.text-anim');
            const arrowAnim = itemWork[index].querySelectorAll('.arrow-anim');
            const contextAnim = itemWork[index].querySelectorAll('.context-anim');

            if (title) {
                gsap.to(title[0].querySelectorAll('span'), { yPercent: 92, stagger: .025, ease: Power2.easeInOut, duration: .4, willChange: `transform` })
                gsap.to(title[1].querySelectorAll('span'), { yPercent: 0, stagger: .025, ease: Power2.easeInOut, duration: .4, willChange: `transform` })
                gsap.to(line, { autoAlpha: .1 })
                gsap.to(arrowAnim, { scale: 0, duration: .6, ease: Power2.easeInOut })
                gsap.to(textAnim, { autoAlpha: .4, x: 0, duration: .6, ease: Power2.easeInOut })
                gsap.to(contextAnim, { autoAlpha: .4, duration: .6, ease: Power2.easeInOut })
            }


        })
    })
}



const rotationAnimation = () => {
    const rotateFile = document.querySelectorAll(`.rotate-anim`);
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(rotateFile, { rotate: 360, duration: 10, ease: Linear.easeNone })



}



const lenisScrollingAnim = () => {
    const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.00001 - Math.pow(3, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    })

    // lenis.on('scroll', (e) => {
    //     console.log(e)
    // })

    window.lenis = lenis
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}



const marqueeScrolling = () => {


    let direction = 1;

    const duration = 34;
    const marquees = document.querySelectorAll(".marquee");






    const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: false,
        onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration());
        },
        scrollTrigger: {
            trigger: marquees[0],
            // markers: true,
            onEnter: () => {
                tl.play();
            },
            onLeave: () => {
                tl.pause()
            },
            onLeaveBack: () => {
                tl.pause()
            },
            onEnterBack: () => {
                tl.resume()
            }
        }
    });



    marquees.forEach(marquee => {
        tl.to(marquee.querySelectorAll("li"), {
            duration: duration,
            xPercent: marquee.dataset.reversed === "true" ? 100 : -100,
            repeat: 0,
            ease: "linear",
        }, "<");
    });


    let scroll = ScrollTrigger.create({
        onUpdate(self) {
            if (self.direction !== direction) {
                direction *= -1;
            }

            tl.timeScale(duration * self.getVelocity() / 2600);

            gsap.to(tl, { timeScale: direction });
        }
    });







}



const mouseMoveAnimation = () => {
    const animOuter = document.querySelector('.hover-anim-outer');
    const animImg = document.querySelector('.anim-img');




    gsap.set(animImg, { autoAlpha: 0, scale: .9, willChange: `transform` })

    animOuter.addEventListener('mouseenter', (e) => {
        setTimeout(() => {
            gsap.to(animImg, { autoAlpha: 1, scale: 1 })
        }, 100);
    })
    animOuter.addEventListener('mouseleave', (e) => {
        gsap.to(animImg, { autoAlpha: 0, scale: .9 })
    })

    animOuter.addEventListener('mousemove', (e) => {
        // console.log(e.offsetX, e.offsetY)
        const offsetLeft = animOuter.getBoundingClientRect().x;
        const offsetTop = animOuter.getBoundingClientRect().y;
        gsap.to(animImg,
            {
                duration: .7,
                x: (e.clientX - offsetLeft) - (animImg.clientWidth / 2),
                y: (e.clientY - offsetTop) - (animImg.clientHeight / 2),
            }
        )
    })
}



const menuAnimation = () => {

    let isMenuActive = false;
    const menuTrigger = document.querySelector('.menu-click');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuOffset = document.querySelector('.menu-offset');
    const menuTriggerClose = document.querySelector('.menu-close');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconClose = document.querySelector('.menu-close-icon');
    const menuLinksWrapper = document.querySelectorAll('.menu-links-wrapper li');
    const menuLinksWrapperSocial = document.querySelectorAll('.menu-links-wrapper-social li');



    gsap.set(menuLinksWrapper, { autoAlpha: 0, x: 90, willChange: `transform` })
    gsap.set(menuLinksWrapperSocial, { autoAlpha: 0, x: 90, willChange: `transform` })


    const handleMenuOpen = () => {
        gsap.to(menuOffset, { x: 0, autoAlpha: 1, pointerEvents: `all` })
        gsap.to(menuOverlay, { autoAlpha: .4, pointerEvents: `all` })
        gsap.to(menuTriggerClose, { duration: 0, pointerEvents: `all`, autoAlpha: 1 })
        gsap.to(menuIcon, { autoAlpha: 0 })
        gsap.to(menuIconClose, { autoAlpha: 1, delay: .2 })
        gsap.to(menuLinksWrapper, { duration: .8, autoAlpha: 1, x: 0, stagger: .08, delay: .015, ease: CustomEase.create("custom", "M0,0 C0.307,0.552 0.492,1 1,1 "), })
        gsap.to(menuLinksWrapperSocial, { duration: .8, autoAlpha: 1, x: 0, stagger: .03, delay: .1, ease: CustomEase.create("custom", "M0,0 C0.307,0.552 0.492,1 1,1 "), })



    }

    const handleMenuClose = () => {
        gsap.to(menuOffset, { x: `20%`, autoAlpha: 0, pointerEvents: `none` })
        gsap.to(menuOverlay, { autoAlpha: 0, pointerEvents: `none` })
        gsap.to(menuTriggerClose, { duration: 0, pointerEvents: `none`, autoAlpha: 0, delay: .3 })
        gsap.to(menuIcon, { autoAlpha: 1 })
        gsap.to(menuIconClose, { autoAlpha: 0 })
        gsap.to(menuLinksWrapper, { autoAlpha: 0, x: 90 })
        gsap.to(menuLinksWrapperSocial, { autoAlpha: 0, x: 90 })

    }



    menuTrigger.addEventListener('click', handleMenuOpen)
    menuOverlay.addEventListener('click', handleMenuClose)
    menuTriggerClose.addEventListener('click', handleMenuClose)


    return {
        handleMenuClose
    }
}





const animPin = () => {
    // const animPin = document.querySelector('.anim-pin');
    const animPin2 = document.querySelector('.anim-pin2');
    const animPin3 = document.querySelector('.anim-pin3');
    const animPinMain = document.querySelector('.scroll-pin-init');


    const animWrap = document.querySelector('.pin-wrapper');
    const animPin2Child = document.querySelector('.anim-pin2 > div');


    // animWrap.style.paddingBottom = `${animWrap.clientHeight / 2}px`

    // const animPin3 = document.querySelector('.anim-pin3');

    const anim = document.querySelectorAll('.anim-move');
    const animNext = document.querySelectorAll('.anim-move-next');
    const animMainWRap = document.querySelector('.scroll-pin-init-wrap');


    let tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: animPinMain,
            pin: animPinMain,
            end: `230%`,
            // markers: true,
            scrub: true,
        }
    });
    // console.log(anim, 'aim')
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: animPin2,
            pin: animPin2,
            end: '90%',
            // markers: true,
            pinSpacing: true,
            scrub: true,
            onLeave: () => {
                parallaxAnimation();
                ScrollTrigger.refresh()
            }
        }
    });

    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: animPin2,
            pin: animPin3,
            end: `145%`,
            // markers: true,
            pinSpacing: true,
        }
    });


    let tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: animMainWRap,
            start: `10% 10%`,
            end: `240%`,
            // markers: true,
            pinSpacing: true,
            scrub: .8,
        }
    });

    tl4.to(anim, { duration: .5, clipPath: `circle(145vw at 50% 50vh)`, stagger: { each: .05, }, ease: Power2.easeIn })
    tl4.to(animNext, { duration: .5, clipPath: `circle(145vw at 50% 50vh)`, ease: Power2.easeIn }, `-=.42`)

}


const swiperSliderAnimation = () => {
    const swiperOne = new Swiper('.slider-one', {
        // configure Swiper to use modules
        modules: [Controller, Navigation],


    })


    const swiperTwo = new Swiper('.slider-two', {
        // configure Swiper to use modules
        modules: [Controller, Navigation, EffectFade],
        navigation: {
            nextEl: '.next-swipe',
            prevEl: '.prev-swipe',
        },
        effect: 'fade'

    })

    swiperOne.controller.control = swiperTwo
    swiperTwo.controller.control = swiperOne


}




const parallaxAnimation = () => {

    const animSelector = document.querySelectorAll('.anim-parallax');
    const animSelectorWrap = document.querySelectorAll('.anim-parallax-wrap');
    animSelector.forEach((item) => {
        const itemAnim = item.querySelector('img');

        const tlParallax = gsap.timeline({
            scrollTrigger: {
                trigger: animSelectorWrap,
                start: `top+=100% bottom`,
                end: `bottom+=150% top`,
                // markers: true,
                scrub: true,
            }
        })
        // tlParallax.scrollTrigger.refresh()
        tlParallax.to(itemAnim, { yPercent: 22, ease: Linear.easeNone })

        // document.addEventListener('DOMNodeInserted', tlParallax.scrollTrigger.refresh(), false)
        // document.addEventListener('DOMNodeRemoved', tlParallax.scrollTrigger.refresh(), false)



    })

}



const formHandling = () => {
    // form-wrapper
    // video-items




    const fromInputMain = document.querySelector('.form-wrapper');
    const fromInput = document.querySelector('.form-wrapper input');
    const fromVideo = document.querySelectorAll('.video-items video');
    const caseStudy = document.querySelector('.case-study');
    const errorMessage = document.querySelector('.error-message');
    const caseStudyTrigger = document.querySelector('.case-study-trigger');
    const modelClose = document.querySelector('.model-close');
    const caseOverlay = document.querySelector('.case-overlay');
    const menuAnim = menuAnimation()

    fromVideo.forEach(element => {
        element.volume = 0.1;
    });

    caseStudyTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(caseStudy, { autoAlpha: 1, scale: 1, pointerEvents: 'all', duration: .3 })
        gsap.to(caseOverlay, { autoAlpha: .3, pointerEvents: 'all', duration: .3 })
        caseOverlay
        fromVideo[0].play();
        menuAnim.handleMenuClose()
        window?.lenis?.stop();
    })

    modelClose.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(caseStudy, { autoAlpha: 0, scale: .9, pointerEvents: 'none', duration: .3 })
        gsap.to(caseOverlay, { autoAlpha: 0, pointerEvents: 'none', duration: .3 })
        caseOverlay
        window?.lenis?.start();
        fromVideo.forEach(element => { element.pause() });
        fromInput.value = '';
        gsap.to(fromVideo, { autoAlpha: 0 })
        gsap.to(fromVideo[0], { autoAlpha: 1 })
        gsap.to(caseStudy, { backgroundColor: `#CCEF92` })
        errorMessage.innerHTML = ``

    })


    caseOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(caseStudy, { autoAlpha: 0, scale: .9, pointerEvents: 'none', duration: .3 })
        gsap.to(caseOverlay, { autoAlpha: 0, pointerEvents: 'none', duration: .3 })
        caseOverlay
        window?.lenis?.start();
        fromVideo.forEach(element => { element.pause() });
        fromInput.value = '';
        gsap.to(fromVideo, { autoAlpha: 0 })
        gsap.to(fromVideo[0], { autoAlpha: 1 })
        gsap.to(caseStudy, { backgroundColor: `#CCEF92` })
        errorMessage.innerHTML = ``
    })

    let error = 0;




    const playPauseVideo = (id) => {
        fromVideo.forEach(element => {
            element.pause()
        });
        fromVideo[id].play();
    }

    fromInput.addEventListener('input', (e) => {
        // console.log(e.target.value, 'ok')
        const lengthOfInput = e.target.value;
        if (lengthOfInput.length > 0) {
            gsap.to(caseStudy, { backgroundColor: `#BCFFEF` })
            gsap.to(fromVideo, { autoAlpha: 0 })
            gsap.to(fromVideo[1], { autoAlpha: 1 })
            playPauseVideo(1)
            errorMessage.innerHTML = ``
        }
        else {
            if (error !== 1) {
                gsap.to(caseStudy, { backgroundColor: `#CCEF92` })
                gsap.to(fromVideo, { autoAlpha: 0 })
                gsap.to(fromVideo[0], { autoAlpha: 1 })
                playPauseVideo(0)
            }

        }
    })






    fromInputMain.addEventListener('submit', (e) => {
        e.preventDefault();

        if (fromInput.value.length < 4) {
            error = 1;
            errorMessage.innerHTML = `Minimum 4 words required`
            gsap.to(fromVideo, { autoAlpha: 0 })
            gsap.to(fromVideo[2], { autoAlpha: 1 })
            playPauseVideo(2)

        }

        else if (fromInput.value !== 'heheheheisit?') {
            error = 1;
            errorMessage.innerHTML = `Password is wrong`
            gsap.to(fromVideo, { autoAlpha: 0 })
            gsap.to(fromVideo[2], { autoAlpha: 1 })
            playPauseVideo(2)
        }
        else {
            error = 0;
            errorMessage.innerHTML = ``
        }



        if (error === 1) {
            gsap.to(caseStudy, { backgroundColor: `#FFCACA` })
        }

        // console.log(error)
    })




}




const videoWrapper = () => {
    const pinVideo = document.querySelector('.video-pin');
    const pinVideoOuter = document.querySelector('.pin-outer');
    const pinVideoEnd = document.querySelector('.video-end');
    const pinVideoEndVideo = document.querySelector('.video-end video');
    pinVideoEndVideo.pause()

    if (window.innerWidth > 767) {
        gsap.timeline({
            scrollTrigger: {
                trigger: pinVideo,
                pin: true,
                // markers: true,
                start: `center center`,
                end: `100%`,
            }
        })




        gsap.timeline({
            scrollTrigger: {
                trigger: pinVideoOuter,
                endTrigger: pinVideoEnd,
                // markers: true,
                start: `top-=30% center`,
                end: `center center`,
                scrub: .4,
                onEnter: () => {
                    pinVideoEndVideo.play()
                    pinVideoEndVideo.currentTime = 0;

                },
                onLeaveBack: () => {
                    pinVideoEndVideo.pause()
                }
            }
        }).to(pinVideoEndVideo, { scale: 1 })



        gsap.timeline({
            scrollTrigger: {
                trigger: pinVideoOuter,
                // markers: true,
                start: `100%-=${pinVideoEndVideo.clientHeight / 2} center`,
                end: `130%  bottom`,
                scrub: .4,
                onEnterBack: () => {
                    pinVideoEndVideo.play()
                    pinVideoEndVideo.currentTime = 0;
                    ScrollTrigger.refresh();
                },
                onLeave: () => {
                    pinVideoEndVideo.pause()
                }
            }
        })
            .to(pinVideoEndVideo, { scale: .5 })
    }
    else {
        gsap.timeline({
            scrollTrigger: {
                trigger: pinVideoEnd,
                endTrigger: pinVideoEnd,
                markers: true,
                start: `top bottom`,
                end: `bottom bottom`,
                scrub: .4,
                onEnter: () => {
                    pinVideoEndVideo.play()
                    pinVideoEndVideo.currentTime = 0;

                },
            }
        }).to(pinVideoEndVideo, { scale: 1 })



        gsap.timeline({
            scrollTrigger: {
                trigger: pinVideoEnd,
                endTrigger: pinVideoEnd,
                markers: true,
                start: `top bottom`,
                end: `bottom top`,
                scrub: .4,

                onEnterBack: () => {
                    pinVideoEndVideo.play()
                    pinVideoEndVideo.currentTime = 0;
                },
                onLeave: () => {
                    pinVideoEndVideo.pause()
                    pinVideoEndVideo.currentTime = 0;
                },
                onLeaveBack: () => {
                    pinVideoEndVideo.pause()
                    pinVideoEndVideo.currentTime = 0;
                }
            }
        })
    }






}


const pulseAnimation = () => {
    const pulseAnim = document.querySelector('.pulse-anim')
    gsap.to(pulseAnim, {
        scale: 1.12,
        repeat: -1,
        yoyo: true,
        ease: Power0.easeNone,
    });
}


const loadingLetter = () => {
    window.lenis.stop();
    const mainWrapper = document.querySelector(`main`);
    const rotateFile1 = document.querySelector(`.rotate-anim-1`);
    const maskImgWrap = document.querySelector(`.mask-img-wrap`);
    const svgMask = document.querySelector(`.mask-svg`);
    const svgMaskImg = document.querySelector(`.mask-svg img`);

    const tl1 = gsap.timeline({});
    const letters = document.querySelectorAll('.loading-letter');
    const lettersFirst = document.querySelectorAll('.loading-letter > span');
    const lettersSecond = document.querySelectorAll('.loading-letter > span > span');

    const textMain = document.querySelector('.brak-text-into-multi-span');
    textSplitting(textMain)




    const textMainWrap = document.querySelectorAll('.brak-text-into-multi-span > span');
    const textMainSpan = document.querySelectorAll('.brak-text-into-multi-span > span > span');
    const lineAnimFade = document.querySelector('.line-anim-fade');
    const imageFade = document.querySelector('.image-fade');


    letters.forEach((element, index) => {
        const firstChild = element.querySelector
        letters[index].style.height = `${lettersSecond[1].clientHeight}px`;

    });
    gsap.set(lettersFirst[1], { y: -lettersFirst[1].clientHeight + lettersSecond[1].clientHeight })
    gsap.to(lettersFirst, { autoAlpha: 1 })
    gsap.to(maskImgWrap, { autoAlpha: 1 })

    gsap.set(mainWrapper, { y: 400 })
    gsap.set(textMainSpan, { yPercent: 100 })
    gsap.set(textMainWrap, { overflow: `hidden` })
    gsap.set(imageFade, { y: 40, autoAlpha: 0 })
    gsap.set(lineAnimFade, { y: 30, autoAlpha: 0 })



    setTimeout(() => {
        tl1.to(rotateFile1, { rotate: 360, duration: 3, })
        gsap.to(lettersFirst[0], { duration: 3, y: -lettersFirst[1].clientHeight + lettersSecond[1].clientHeight, ease: Power2.easeOut })
        gsap.to(lettersFirst[1], { duration: 3, y: 0, ease: Power2.easeOut })
        gsap.to(lettersFirst[2], {
            duration: 3, y: -lettersFirst[1].clientHeight + lettersSecond[1].clientHeight, ease: Power2.easeOut, onComplete: () => {
                gsap.to(maskImgWrap, { autoAlpha: 0 })
                setTimeout(() => {
                    gsap.to(svgMask, { yPercent: -100, transformOrigin: `top`, ease: Power4.easeOut, duration: 1.1 })
                    gsap.to(svgMaskImg, {
                        scaleY: 0, transformOrigin: `top`, ease: Power4.easeOut, duration: 1.1, onComplete: () => {
                            window.lenis.start();

                        }
                    })
                    gsap.to(mainWrapper, {
                        duration: .6, y: 0, onComplete: () => {
                            gsap.set(mainWrapper, { clearProps: "all" });
                            ScrollTrigger.refresh()
                        }
                    })

                    gsap.to(textMainSpan, { duration: 1.1, autoAlpha: 1, yPercent: -2, display: `inline-block`, stagger: .03, ease: Power2.easeOut })
                    gsap.to(lineAnimFade, { duration: .6, y: 0, autoAlpha: 1, delay: .5 })
                    gsap.to(imageFade, { duration: .6, y: 0, autoAlpha: 1, delay: .65 })

                }, 200);
            }
        })
    }, 200);
}



const parallaxProfile = () => {
    const parallaxProfile = document.querySelector('.parallax-profile img');
    gsap.set(parallaxProfile, { scale: 1.1, yPercent: -10 })


    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: parallaxProfile,
            start: `top bottom`,
            end: `bottom top`,
            // markers: true,
            scrub: .2,
        }
    })

    timeline.to(parallaxProfile, { scale: 1.1, yPercent: 10, ease: Linear.easeNone })

}


const waveAnimation = () => {
    const wave = document.querySelector('.wave-wrap')
    const waveAnim = document.querySelector('.wave-anim');
    const wavedDribble = document.querySelector('.wave-dribble');
    const waveRounded = document.querySelector('.wave-rounded');
    const waveRotate = document.querySelector('.wave-rotate');
    const waveText = document.querySelectorAll('.wave-text span');
    const waveRotateWrap = document.querySelectorAll('.wave-rotate-wrap');
    const waveLine = document.querySelectorAll('.wave-line');
    const pulseAnimWrap = document.querySelectorAll('.pulse-anim-wrap');



    gsap.set(wavedDribble, { autoAlpha: 0, scale: .5 })
    gsap.set(waveRotateWrap, { autoAlpha: 0, scale: .5 })
    gsap.set(pulseAnimWrap, { autoAlpha: 0, scale: .5 })
    gsap.set(waveLine, { autoAlpha: 0, scaleX: .2, display: `inline-block` })
    gsap.set(waveText, { autoAlpha: 1, yPercent: 100, display: `inline-block` });



    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: wave,
            start: `top 80%`,
            end: `bottom top`,
            // markers: true,

        }
    })




    timeline.to(waveText, { duration: .6, autoAlpha: 1, yPercent: 0, display: `inline-block`, stagger: .03, ease: Power2.easeOut })
    timeline.to(waveAnim, { strokeDashoffset: 0, duration: 1.5 }, `<`)
    timeline.to(waveRounded, { strokeDashoffset: 0, duration: 1.5 }, `<`)
    timeline.to(wavedDribble, { autoAlpha: 1, scale: 1, duration: 1.5 }, `<`)
    timeline.to(waveRotateWrap, { autoAlpha: 1, scale: 1, duration: 1.5 }, `<`)
    timeline.to(pulseAnimWrap, { autoAlpha: 1, scale: 1, duration: 1.5 }, `<`)
    timeline.to(waveLine, { autoAlpha: 1, scaleX: 1, duration: 1.5 }, `<`)


    const timelineRotate = gsap.timeline({
        scrollTrigger: {
            trigger: wave,
            start: `top 80%`,
            end: `bottom top`,
            // markers: true,
            scrub: true,
        }
    })



    timelineRotate.to(waveRotate, { rotate: 360 })

    // wave-dribble
    // wave-rounded
}





const textLandingAnimation = () => {
    const animText = document.querySelectorAll('.text-landing-anim');
    animText.forEach(element => {
        textSplitting(element)
    });




    animText.forEach(item => {

        const itemSpanWrap = item.querySelectorAll('span');
        const itemSpan = item.querySelectorAll('span span');


        gsap.set(itemSpanWrap, { overflow: `hidden` })
        gsap.set(itemSpan, { yPercent: 100 })


        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: `top 80%`,
                end: `bottom top`,
                // markers: true,

            }
        })

        timeline.to(itemSpan, { duration: .89, autoAlpha: 1, yPercent: 0, display: `inline-block`, stagger: .03, ease: Power2.easeOut })



    });
}



const mobFadeAnim = () => {
    const fadeAnim = document.querySelectorAll('.fade-anim-mob');
    fadeAnim.forEach(element => {
        gsap.set(element, { autoAlpha: 0, y: 30 })
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                // markers: true,
                start: `top 90%`
            }
        })
        timeline.to(element, { autoAlpha: 1, y: 0, ease: Power2.easeOut })
    });
}



const sliderMentors = () => {

    const swiperOne = new Swiper('.slider-mentors', {
        // configure Swiper to use modules
        pagination: {
            el: ".swiper-pagination",
        },

        slidesPerView: 1.4,
        spaceBetween: 16,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        modules: [Pagination, Autoplay],



    })
}


const videoUnmuteAnimation = () => {
    const videoAnim = document.querySelector('.follow-animation-mouse');
    const videoAnimSpan = document.querySelector('.follow-animation-mouse button > span');
    gsap.set(videoAnim, { xPercent: -50, yPercent: -50, opacity: 0 });

    const pos = { x: window.innerWidth, y: window.innerHeight };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.35;

    const xSet = gsap.quickSetter(videoAnim, "x", "px");
    const ySet = gsap.quickSetter(videoAnim, "y", "px");

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    gsap.ticker.add(() => {
        const dt = 0.8 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
    });

    let muted = true;
    gsap.set(videoAnimSpan, { yPercent: -50 })
    const pinVideoEndVideo = document.querySelector('.video-end video');
    pinVideoEndVideo.addEventListener('click', () => {
        muted = !muted
        pinVideoEndVideo.muted = muted;
        gsap.to(videoAnimSpan, { yPercent: muted ? -50 : 0 })
    })

    pinVideoEndVideo.addEventListener('mouseenter', () => {
        gsap.to(videoAnim, { opacity: 1 });
    })

    pinVideoEndVideo.addEventListener('mouseleave', () => {
        gsap.to(videoAnim, { opacity: 0 });
    })

};


window.addEventListener("load", () => {


    // ==========

    // console.log(gsap);
    lenisScrollingAnim();
    parallaxProfile();
    loadingLetter();
    videoWrapper();
    waveAnimation()
    marqueeScrolling();
    window.innerWidth > 1023 && animationWork();
    rotationAnimation();

    mouseMoveAnimation();
    menuAnimation();
    animPin();
    swiperSliderAnimation();

    formHandling();
    pulseAnimation();
    textLandingAnimation();
    window.innerWidth < 767 && mobFadeAnim();
    window.innerWidth < 1024 && sliderMentors()
    window.addEventListener('resize', () => window.innerWidth < 1024 && sliderMentors())

    videoUnmuteAnimation();













});
