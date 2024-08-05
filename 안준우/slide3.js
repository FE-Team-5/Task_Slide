const slideList = document.querySelectorAll(".slider");
const $dotContainer = document.querySelector(".slider-dot");
const dotList = $dotContainer.querySelectorAll("span");

let currentIdx = 0;
let onClickDelayFlag = false;
//슬라이드 초기화
function slideInit() {
  const $sliderUl = document.querySelector(".sliderUl");
  $sliderUl.insertBefore(slideList[slideList.length - 1], slideList[0]);
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

function moveToNext(e, index) {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  const $sliderUl = document.querySelector(".sliderUl");
  const $firstSlide = $sliderUl.querySelector(".slider:first-child");
  const $thirdSlide = $sliderUl.querySelector(".slider:nth-child(3)");
  $sliderUl.insertBefore(slideList[index], $thirdSlide);
  /*
    4 - 1 - 2 에서 4를 클릭시
    1 - 4 - 2 가 되버림. 이 상태에서 움직이면 2가 출력. 
    따라서 2 - 1 - 4 로 변경 해주는 조건문
  */
  if (slideList[index] === $firstSlide) {
    $sliderUl.insertBefore($thirdSlide, slideList[currentIdx]);
  }
  $sliderUl.style.transition = "0.5s";
  $sliderUl.style.transform = `translateX(-66.6666%)`;
  moveDot(index);
  currentIdx = index;

  setTimeout(() => {
    const $firstSlide = $sliderUl.querySelector(".slider:first-child");
    $sliderUl.style.transition = "none";
    $sliderUl.appendChild($firstSlide);
    $sliderUl.style.transform = `translateX(-33.3333%)`;
    onClickDelayFlag = false;
  }, 500);
}

function moveToPrev(e, index) {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  const $sliderUl = document.querySelector(".sliderUl");
  const $firstSlide = $sliderUl.querySelector(".slider:first-child");
  $sliderUl.appendChild($firstSlide);
  $sliderUl.insertBefore(slideList[index], slideList[currentIdx]);
  $sliderUl.style.transition = "0.5s";
  $sliderUl.style.transform = `translateX(0)`;
  moveDot(index);
  currentIdx = index;
  setTimeout(() => {
    $sliderUl.style.transition = "none";
    $sliderUl.insertBefore(
      slideList[index - 1 < 0 ? slideList.length - 1 : index - 1],
      slideList[index]
    );
    $sliderUl.style.transform = `translateX(-33.3333%)`;
    onClickDelayFlag = false;
  }, 500);
}
function onClickDotBtn(e, index) {
  if (currentIdx === index) return;
  if (currentIdx < index) moveToNext(e, index);
  else moveToPrev(e, index);
}
function initEvent() {
  const $nextBtn = document.querySelector(".next");
  const $prevBtn = document.querySelector(".prev");
  $nextBtn.addEventListener("click", (e) =>
    moveToNext(e, slideList.length - 1 < currentIdx + 1 ? 0 : currentIdx + 1)
  );
  $prevBtn.addEventListener("click", (e) =>
    moveToPrev(e, currentIdx - 1 < 0 ? slideList.length - 1 : currentIdx - 1)
  );
  dotList.forEach((element, index) => {
    element.addEventListener("click", (e) => onClickDotBtn(e, index));
  });
}

slideInit();
initEvent();
