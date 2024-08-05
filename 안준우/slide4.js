const slideList = document.querySelectorAll(".slider");
const $dotContainer = document.querySelector(".slider-dot");
const dotList = $dotContainer.querySelectorAll("span");
const $sliderUl = document.querySelector(".sliderUl");
const sliderClassName = ".slider";

let currentIdx = 0;
let onClickDelayFlag = false;
const animateTime = 500; //ms

// 슬라이드 초기화
function slideInit() {
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

// 슬라이드 이동
function moveSlide(index, direction) {
  const $firstSlide = $sliderUl.querySelector(sliderClassName + ":first-child");
  const $thirdSlide = $sliderUl.querySelector(
    sliderClassName + ":nth-child(3)"
  );
  $sliderUl.style.transition = animateTime / 1000 + "s";
  if (direction === "next") {
    $sliderUl.insertBefore(slideList[index], $thirdSlide);
    /*
        4 - 1 - 2 에서 4를 클릭시
        1 - 4 - 2 가 되버림. 이 상태에서 움직이면 2가 출력. 
        따라서 2 - 1 - 4 로 변경 해주는 조건문
    */
    if (slideList[index] === $firstSlide) {
      $sliderUl.insertBefore($thirdSlide, slideList[currentIdx]);
    }
    $sliderUl.style.transform = "translateX(-66.6666%)";
  } else {
    $sliderUl.appendChild($firstSlide);
    $sliderUl.insertBefore(slideList[index], slideList[currentIdx]);
    $sliderUl.style.transform = "translateX(0)";
  }

  moveDot(index);
  currentIdx = index;

  setTimeout(() => {
    const $newFirstSlide = $sliderUl.querySelector(
      sliderClassName + ":first-child"
    );
    const $newPrevSlide =
      slideList[(currentIdx - 1 + slideList.length) % slideList.length];
    $sliderUl.style.transition = "none";
    direction === "next"
      ? $sliderUl.appendChild($newFirstSlide)
      : $sliderUl.insertBefore($newPrevSlide, slideList[currentIdx]);

    $sliderUl.style.transform = "translateX(-33.3333%)";
    onClickDelayFlag = false;
  }, animateTime);
}

function moveToNext() {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  const nextIdx = (currentIdx + 1) % slideList.length;
  moveSlide(nextIdx, "next");
}

function moveToPrev() {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  const prevIdx = (currentIdx - 1 + slideList.length) % slideList.length;
  moveSlide(prevIdx, "prev");
}

function onClickDotBtn(e, index) {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  if (currentIdx === index) return;
  if (currentIdx < index) moveSlide(index, "next");
  else moveSlide(index, "prev");
}

function initEvent() {
  document.querySelector(".next").addEventListener("click", moveToNext);
  document.querySelector(".prev").addEventListener("click", moveToPrev);
  dotList.forEach((element, index) => {
    element.addEventListener("click", (e) => onClickDotBtn(e, index));
  });
}

slideInit();
initEvent();

window.addEventListener("resize", () => {
  slideWidth = $sliders[0].offsetWidth;
  $sliderUl.style.transition = "none";
  $sliderUl.style.transform = `translateX(-${slideWidth}px)`;
});
