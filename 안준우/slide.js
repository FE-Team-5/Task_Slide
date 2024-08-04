const slideList = document.querySelectorAll(".slider");
let currentInx = 0;
let onClickDelayFlag = false;

function slideInit() {
  const $sliderUI = document.querySelector(".sliderUl");
  const cloneLastItem = slideList[slideList.length - 1].cloneNode(true);
  slideList[slideList.length - 1].remove();
  $sliderUI.prepend(cloneLastItem);
}

function moveSlide(direction) {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;

  const $sliderUI = document.querySelector(".sliderUl");
  const currentSlideList = document.querySelectorAll(".slider");

  let transformValue;
  if (direction === "next") {
    transformValue = "-66.6666%";
  } else {
    transformValue = "0";
  }

  $sliderUI.style.transition = "0.5s";
  $sliderUI.style.transform = `translateX(${transformValue})`;

  setTimeout(() => {
    $sliderUI.style.transition = "none";
    if (direction === "next") {
      const cloneNode = currentSlideList[0].cloneNode(true);
      currentSlideList[0].remove();
      $sliderUI.append(cloneNode);
      currentInx = currentInx + 1 > slideList.length - 1 ? 0 : currentInx + 1;
    } else {
      const cloneNode =
        currentSlideList[currentSlideList.length - 1].cloneNode(true);
      currentSlideList[currentSlideList.length - 1].remove();
      $sliderUI.prepend(cloneNode);
      currentInx = currentInx - 1 < 0 ? slideList.length - 1 : currentInx - 1;
    }
    $sliderUI.style.transform = "translateX(-33.3333%)";
    onClickDelayFlag = false;
  }, 500);
}

function initEvent() {
  const $nextBtn = document.querySelector(".next");
  const $prevBtn = document.querySelector(".prev");
  $nextBtn.addEventListener("click", () => moveSlide("next"));
  $prevBtn.addEventListener("click", () => moveSlide("prev"));
}
slideInit();
initEvent();
