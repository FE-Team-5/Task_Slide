const slideList = document.querySelectorAll(".slider");
let currentInx = 0;

function slideInit() {
  const $sliderUI = document.querySelector(".sliderUl");
  const slideList = document.querySelectorAll(".slider");
  //   const cloneLastItem = slideList[slideList.length - 1].cloneNode(true);
  //   $sliderUI.prepend(cloneLastItem);
}
let onClickDelayFlag = false;
function onClickNextBtn() {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  const $sliderUI = document.querySelector(".sliderUl");
  const currentSlideList = document.querySelectorAll(".slider");

  $sliderUI.style.transition = "0.5s";
  $sliderUI.style.transform = "translateX(-66.6666%)";

  setTimeout(() => {
    $sliderUI.style.transition = "none";
    const cloneNode = currentSlideList[0].cloneNode(true);
    currentSlideList[0].remove();
    $sliderUI.append(cloneNode);
    $sliderUI.style.transform = "translateX(-33.3333%)";
    onClickDelayFlag = false;
  }, 500);
  currentInx = currentInx + 1 > slideList.length - 1 ? 0 : currentInx + 1;
}
function onClickPrevBtn() {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;

  const $sliderUI = document.querySelector(".sliderUl");
  const currentSlideList = document.querySelectorAll(".slider");

  $sliderUI.style.transition = "0.5s";
  $sliderUI.style.transform = "translateX(0)";

  setTimeout(() => {
    $sliderUI.style.transition = "none";
    const cloneNode =
      currentSlideList[currentSlideList.length - 1].cloneNode(true);
    currentSlideList[currentSlideList.length - 1].remove();
    $sliderUI.prepend(cloneNode);
    $sliderUI.style.transform = "translateX(-33.3333%)";
    onClickDelayFlag = false;
  }, 500);
  currentInx = currentInx - 1 < 0 ? slideList.length - 1 : currentInx - 1;
}

function initEvent() {
  const $nextBtn = document.querySelector(".next");
  const $prevBtn = document.querySelector(".prev");
  $nextBtn.addEventListener("click", onClickNextBtn);
  $prevBtn.addEventListener("click", onClickPrevBtn);
}
slideInit();
initEvent();
