const $sliderUI = document.querySelector(".sliderUl");
const slideList = document.querySelectorAll(".slider");
const $dotContainer = document.querySelector(".slider-dot");
const dotList = $dotContainer.querySelectorAll("span");

let currentInx = 0;
let onClickDelayFlag = false;
let isTransitioning = false; // Avoid transition conflicts
const transitionDuration = 0; // ms

function moveSlideByIdx(index) {
  /*
    해당 인덱스 위치로 이동하는 함수
    */
}

function slideInit() {
  const cloneLastItem = slideList[slideList.length - 1].cloneNode(true);
  slideList[slideList.length - 1].remove();
  slideList[slideList.length - 1] = cloneLastItem;
  $sliderUI.prepend(cloneLastItem);
}

function moveSlide(direction, milliseconds) {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;

  const setTimeOutDelayTime = milliseconds;
  const transitionDelayTime = milliseconds / 1000 + "s";
  const currentSlideList = document.querySelectorAll(".slider");

  let transformValue;
  if (direction === "next") {
    transformValue = "-66.6666%";
    currentInx = currentInx + 1 > slideList.length - 1 ? 0 : currentInx + 1;
  } else {
    transformValue = "0";
    currentInx = currentInx - 1 < 0 ? slideList.length - 1 : currentInx - 1;
  }

  $sliderUI.style.transition = transitionDelayTime;
  $sliderUI.style.transform = `translateX(${transformValue})`;
  moveDot(currentInx);

  setTimeout(() => {
    $sliderUI.style.transition = "none";
    if (direction === "next") {
      const cloneNode = currentSlideList[0].cloneNode(true);
      currentSlideList[0].remove();
      $sliderUI.append(cloneNode);
    } else {
      const cloneNode =
        currentSlideList[currentSlideList.length - 1].cloneNode(true);
      currentSlideList[currentSlideList.length - 1].remove();
      $sliderUI.prepend(cloneNode);
    }
    $sliderUI.style.transform = "translateX(-33.3333%)";
    onClickDelayFlag = false;
  }, setTimeOutDelayTime);
}

function moveDot(index) {
  dotList.forEach((element, i) => {
    if (index === i) {
      element.style.backgroundColor = "black";
      element.style.color = "white";
    } else {
      element.style.backgroundColor = "tomato";
      element.style.color = "black";
    }
  });
}
function onDotClick(e, index) {
  moveSlideByIdx(index);
}

function initEvent() {
  const $nextBtn = document.querySelector(".next");
  const $prevBtn = document.querySelector(".prev");
  $nextBtn.addEventListener("click", () => moveSlide("next", 500));
  $prevBtn.addEventListener("click", () => moveSlide("prev", 500));
  dotList.forEach((element, index) => {
    element.addEventListener("click", (e) => onDotClick(e, index));
  });
}

slideInit();
initEvent();
