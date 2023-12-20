import gsap, { Expo, Power0, Power2 } from 'gsap'
import { CustomEase, Linear, Sine } from 'gsap/all';
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const animationWork = () => {
    const itemWork = document.querySelectorAll('.items-anim-work');
    const imageScale = document.querySelectorAll('.image-scale-animation img');
    let prevIndex = 0;
    let zIndex = 2
    gsap.to(imageScale, { scale: 1.4, opacity: 0, willChange: `transform` })
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
            console.log(line);
            // console.log(singleWord);
            gsap.set(singleWord, { yPercent: 92 })
            gsap.set(singleWord, { yPercent: 92 })
            gsap.set(line, { opacity: .1 })
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
                gsap.to(line, { opacity: 1 })
                gsap.to(arrowAnim, { scale: 1, duration: .6, ease: Power2.easeInOut })
                gsap.to(textAnim, { opacity: 1, x: -50, duration: .6, ease: Power2.easeInOut })
                gsap.to(contextAnim, { opacity: 1, duration: .6, ease: Power2.easeInOut })
            }


            // image-scale-animation
            const timeline = gsap.timeline();
            timeline.to(imageScale, { opacity: 0, scale: 1.21, duration: 0, zIndex: 0, filter: `blur(4px)`, })
            timeline.to(imageScale[prevIndex], { scale: 1.02, opacity: 1, duration: 0 }, `<`)
            timeline.to(imageScale[prevIndex], { zIndex: zIndex - 1, duration: 0 }, `<`)
            timeline.to(imageScale[index], { scale: 1.02, opacity: 1, duration: .3 })
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
                gsap.to(line, { opacity: .1 })
                gsap.to(arrowAnim, { scale: 0, duration: .6, ease: Power2.easeInOut })
                gsap.to(textAnim, { opacity: .4, x: 0, duration: .6, ease: Power2.easeInOut })
                gsap.to(contextAnim, { opacity: .4, duration: .6, ease: Power2.easeInOut })
            }


        })
    })
}



const rotationAnimation = () => {
    const rotateFile = document.querySelector(`.rotate-anim`);
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

    console.log(animOuter.getBoundingClientRect())


    gsap.set(animImg, { opacity: 0, scale: .9, willChange: `transform` })

    animOuter.addEventListener('mouseenter', (e) => {
        setTimeout(() => {
            gsap.to(animImg, { opacity: 1, scale: 1 })
        }, 100);
    })
    animOuter.addEventListener('mouseleave', (e) => {
        gsap.to(animImg, { opacity: 0, scale: .9 })
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
        gsap.to(menuOffset, { x: 0, opacity: 1, pointerEvents: `all` })
        gsap.to(menuOverlay, { opacity: .4, pointerEvents: `all` })
        gsap.to(menuTriggerClose, { duration: 0, pointerEvents: `all`, opacity: 1 })
        gsap.to(menuIcon, { autoAlpha: 0 })
        gsap.to(menuIconClose, { autoAlpha: 1, delay: .2 })
        gsap.to(menuLinksWrapper, { duration: .8, autoAlpha: 1, x: 0, stagger: .08, delay: .015, ease: CustomEase.create("custom", "M0,0 C0.307,0.552 0.492,1 1,1 "), })
        gsap.to(menuLinksWrapperSocial, { duration: .8, autoAlpha: 1, x: 0, stagger: .03, delay: .1, ease: CustomEase.create("custom", "M0,0 C0.307,0.552 0.492,1 1,1 "), })



    }

    const handleMenuClose = () => {
        gsap.to(menuOffset, { x: `20%`, opacity: 0, pointerEvents: `none` })
        gsap.to(menuOverlay, { opacity: 0, pointerEvents: `none` })
        gsap.to(menuTriggerClose, { duration: 0, pointerEvents: `none`, opacity: 0, delay: .3 })
        gsap.to(menuIcon, { autoAlpha: 1 })
        gsap.to(menuIconClose, { autoAlpha: 0 })
        gsap.to(menuLinksWrapper, { autoAlpha: 0, x: 90 })
        gsap.to(menuLinksWrapperSocial, { autoAlpha: 0, x: 90 })

    }



    menuTrigger.addEventListener('click', handleMenuOpen)
    menuOverlay.addEventListener('click', handleMenuClose)
    menuTriggerClose.addEventListener('click', handleMenuClose)
}





const animPin = () => {
    // const animPin = document.querySelector('.anim-pin');
    const animPin2 = document.querySelector('.anim-pin2');
    const animPin3 = document.querySelector('.anim-pin3');
    const animPinMain = document.querySelector('.scroll-pin-init');


    const animWrap = document.querySelector('.pin-wrapper');
    const animPin2Child = document.querySelector('.anim-pin2 > div');
    console.log(animPin2Child)

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
            end: '110%',
            // markers: true,
            pinSpacing: true,
            scrub: true,
        }
    });

    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: animPin2,
            pin: animPin3,
            end: `180%`,
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

    tl4.to(anim, { duration: .5, clipPath: `circle(120vw at 50% 50vh)`, stagger: { each: .05, }, ease: Power2.easeIn })
    tl4.to(animNext, { duration: .5, clipPath: `circle(120vw at 50% 50vh)`, ease: Power2.easeIn }, `-=.42`)

}

window.addEventListener("load", () => {


    // ==========

    // console.log(gsap);
    lenisScrollingAnim();
    animationWork();
    rotationAnimation();
    marqueeScrolling();
    mouseMoveAnimation();
    menuAnimation()
    animPin()















});
