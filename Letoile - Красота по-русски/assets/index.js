document.addEventListener('DOMContentLoaded', function() {
    let currentPhase = 1;
    let phaseTimer = null;
    let userClicked = false;

    const bannerContainer = document.querySelector('.banner-container');
    const backgroundImage = document.querySelector('.background-image');
    const background = document.querySelector('.background');
    const text = document.querySelector('.text');
    const textElements = document.querySelectorAll('.text img');
    const girl = document.querySelector('.girl');
    const girlNoMakeup = document.querySelector('.girl-no-makeup');
    const girlMakeup = document.querySelector('.girl-makeup');
    const kokoshnikElements = document.querySelectorAll('.kokoshnik');
    const clicker = document.querySelector('.clicker');
    const glitterElements = document.querySelectorAll('.glitter');
    const glitterBlushElements = document.querySelectorAll('.glitter-blush');
    const blushClose = document.querySelector('.blush-close');
    const blushOpen = document.querySelector('.blush-open');
    const buttonPlate = document.querySelector('.button-plate');

    function hideElement(element) {
        if (element) element.style.display = 'none';
    }

    function showElement(element) {
        if (element) {
            element.style.display = 'block';
            if (element.classList.contains('clicker')) {
                element.style.display = 'flex';
            }
        }
    }

    function fadeOutElement(element) {
        if (element) {
            element.classList.add('fade-out');
            setTimeout(() => {
                hideElement(element);
                element.classList.remove('fade-out');
            }, 1000);
        }
    }

    function setBackground(isFirstBackground) {
        if (isFirstBackground) {
            showElement(backgroundImage);
            hideElement(background);
        } else {
            hideElement(backgroundImage);
            showElement(background);
        }
    }

    function clearPhaseTimer() {
        if (phaseTimer) {
            clearTimeout(phaseTimer);
            phaseTimer = null;
        }
    }

    function animateTextElements() {
        textElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(1em)';
            element.style.transition = 'opacity 0.75s cubic-bezier(.3,0,.1,1), transform 0.75s cubic-bezier(.3,0,.1,1)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';

                setTimeout(() => {
                    element.style.opacity = '';
                    element.style.transform = '';
                    element.style.transition = '';
                }, 750);
            }, 125 + (index * 125));
        });
    }

    function startButtonPulse() {
        if (buttonPlate) {
            buttonPlate.classList.add('button-pulse');
        }
    }

    function setKokoshnikTransform(transform, animated = false) {
        kokoshnikElements.forEach(element => {
            if (animated) {
                element.classList.add('kokoshnik-transition');

                if (element.classList.contains('kokoshnik-glow')) {
                    element.style.transition = 'transform 1s cubic-bezier(.3,0,.1,1), opacity 1s linear';
                    element.style.opacity = '0';

                    setTimeout(() => {
                        hideElement(element);
                        element.style.opacity = '0.5';
                        element.style.transition = '';
                    }, 1000);
                }
            } else {
                element.classList.remove('kokoshnik-transition');
            }
            element.style.transform = transform;
        });
    }

    function startKokoshnikWiggle() {
        kokoshnikElements.forEach(element => {
            element.classList.add('kokoshnik-wiggle');
        });
    }

    function stopKokoshnikWiggle() {
        kokoshnikElements.forEach(element => {
            element.classList.remove('kokoshnik-wiggle');
        });
    }

    function animateToPhase2() {
        stopKokoshnikWiggle();

        setTimeout(() => {
            setKokoshnikTransform('translate(-66.6%, -35%)', true);
        }, 50);

        fadeOutElement(clicker);
        fadeOutElement(glitterElements[0]);
        fadeOutElement(glitterElements[1]);

        if (girlMakeup) {
            girlMakeup.style.display = 'block';
            girlMakeup.style.visibility = 'visible';
            girlMakeup.style.opacity = '0';
            girlMakeup.style.transition = 'opacity 1s ease-in';

            setTimeout(() => {
                girlMakeup.style.opacity = '1';
            }, 50);

            setTimeout(() => {
                girlMakeup.style.opacity = '';
                girlMakeup.style.transition = '';
            }, 1050);
        }

        setTimeout(() => {
            showElement(text);
            animateTextElements();
        }, 250);

        setTimeout(() => {
            hideElement(girlNoMakeup);
        }, 1250);
    }

    function animateToPhase3() {
        if (background) {
            background.style.opacity = '0';
            background.style.transition = 'opacity 1s ease-out';
            showElement(background);

            setTimeout(() => {
                background.style.opacity = '1';

                setTimeout(() => {
                    background.style.opacity = '';
                    background.style.transition = '';
                }, 1000);
            }, 1000);
        }

        setTimeout(() => {
            if (blushClose) {
                blushClose.style.opacity = '0';
                blushClose.style.transform = 'translate(-50%, -21.5%) scale(0.75)';
                blushClose.style.transition = 'opacity 1s cubic-bezier(.3,0,.1,1), transform 1s cubic-bezier(.3,0,.1,1)';
                showElement(blushClose);

                setTimeout(() => {
                    blushClose.style.opacity = '1';
                    blushClose.style.transform = 'translate(-50%, -21.5%) scale(1)';

                    setTimeout(() => {
                        blushClose.style.opacity = '';
                        blushClose.style.transform = '';
                        blushClose.style.transition = '';
                    }, 1000);
                }, 1000);
            }

            glitterBlushElements.forEach(element => {
                if (element) {
                    element.style.opacity = '0';
                    element.style.transition = 'opacity 1s ease-out';
                    showElement(element);

                    setTimeout(() => {
                        element.style.opacity = '1';

                        setTimeout(() => {
                            element.style.opacity = '';
                            element.style.transition = '';
                        }, 1000);
                    }, 1000);
                }
            });
        }, 250);

        setTimeout(() => {
            fadeOutElement(girl);
            fadeOutElement(backgroundImage);
        }, 1000);
    }

    function animateToPhase4() {
        setTimeout(() => {
            if (blushClose) {
                blushClose.style.transition = 'opacity 0.75s ease-in-out';
                blushClose.style.opacity = '0';
            }
        }, 1250);

        if (blushOpen) {
            blushOpen.style.opacity = '0';
            blushOpen.style.transition = 'opacity 0.75s ease-in-out';
            showElement(blushOpen);

            setTimeout(() => {
                blushOpen.style.opacity = '1';

                setTimeout(() => {
                    blushOpen.style.opacity = '';
                    blushOpen.style.transition = '';
                }, 1000);
            }, 1000);
        }

        if (buttonPlate) {
            buttonPlate.style.opacity = '0';
            buttonPlate.style.transform = 'translateX(-50%) scale(0.75)';
            buttonPlate.style.transition = 'opacity 1s cubic-bezier(.3,0,.1,1), transform 1s cubic-bezier(.3,0,.1,1)';
            showElement(buttonPlate);

            setTimeout(() => {
                buttonPlate.style.opacity = '1';
                buttonPlate.style.transform = 'translateX(-50%) scale(1)';

                setTimeout(() => {
                    buttonPlate.style.opacity = '';
                    buttonPlate.style.transform = '';
                    buttonPlate.style.transition = '';
                    startButtonPulse();
                }, 1000);
            }, 1000);
        }
    }

    function startPhaseTimer() {
        clearPhaseTimer();
        phaseTimer = setTimeout(() => {
            if (currentPhase < 4) {
                currentPhase++;
                if (currentPhase === 2) {
                    animateToPhase2();
                } else if (currentPhase === 3) {
                    animateToPhase3();
                } else if (currentPhase === 4) {
                    animateToPhase4();
                } else {
                    setPhase(currentPhase);
                }
                startPhaseTimer();
            }
        }, 2500);
    }

    function setPhase(phase) {
        switch(phase) {
            case 1:
                setBackground(true);
                hideElement(text);
                hideElement(blushClose);
                hideElement(blushOpen);
                hideElement(buttonPlate);
                hideElement(girlMakeup);
                showElement(girl);
                showElement(girlNoMakeup);
                showElement(clicker);
                showElement(glitterElements[0]);
                showElement(glitterElements[1]);
                hideElement(glitterBlushElements[0]);
                hideElement(glitterBlushElements[1]);
                setKokoshnikTransform('translate(-66.6%, -125%)');
                startKokoshnikWiggle();
                break;

            case 2:
                setBackground(true);
                showElement(text);
                hideElement(blushClose);
                hideElement(blushOpen);
                hideElement(buttonPlate);
                showElement(girl);
                hideElement(girlNoMakeup);
                showElement(girlMakeup);
                hideElement(clicker);
                hideElement(glitterElements[0]);
                hideElement(glitterElements[1]);
                hideElement(glitterBlushElements[0]);
                hideElement(glitterBlushElements[1]);
                setKokoshnikTransform('translate(-66.6%, -35%)');
                break;

            case 3:
                setBackground(false);
                showElement(text);
                hideElement(blushOpen);
                hideElement(buttonPlate);
                hideElement(girl);
                hideElement(clicker);
                hideElement(glitterElements[0]);
                hideElement(glitterElements[1]);
                break;

            case 4:
                setBackground(false);
                showElement(text);
                hideElement(girl);
                hideElement(clicker);
                hideElement(glitterElements[0]);
                hideElement(glitterElements[1]);
                showElement(glitterBlushElements[0]);
                showElement(glitterBlushElements[1]);
                break;
        }

        if (phase < 4) {
            startPhaseTimer();
        }
    }

    setPhase(1);

    bannerContainer.addEventListener('click', function() {
        if (currentPhase === 1 && !userClicked) {
            userClicked = true;
            clearPhaseTimer();
            currentPhase = 2;
            animateToPhase2();
            startPhaseTimer();
        }
    });
});
