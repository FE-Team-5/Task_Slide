/* 
1. 4 1 2 3 4 1 구조로 변경
2. 너비를 계산해서 움직이고, 이후에 display block, none으로 조정
3. 3->4 로 이동하는 경우, 
*/
const $sliderUI = document.querySelector(".sliderUl");
const $dotContainer = document.querySelector(".slider-dot");
const dotList = $dotContainer.querySelectorAll("span");
let currentIdx = 1;
let onClickDelayFlag = false;

//슬라이드 초기화
function slideInit() {
  const slideList = document.querySelectorAll(".slider");
  const cloneLastItem = slideList[slideList.length - 1].cloneNode(true);
  const cloneFirstItem = slideList[0].cloneNode(true);
  $sliderUI.prepend(cloneLastItem);
  $sliderUI.append(cloneFirstItem);
}
function initEvent() {
  const $nextBtn = document.querySelector(".next");
  const $prevBtn = document.querySelector(".prev");
  $nextBtn.addEventListener("click", onClickNextBtn);
  $prevBtn.addEventListener("click", onClickPrevBtn);
  dotList.forEach((element, index) => {
    element.addEventListener("click", (e) => onDotClick(e, index));
  });
}

function onDotClick(e, index) {
  moveSlideByIdx(index + 1);
}

function moveSlideByIdx(index) {
  if (onClickDelayFlag) return;
  if (currentIdx === index) return;
  if (currentIdx + 1 === index) onClickNextBtn();
  else if (currentIdx - 1 === index) onClickPrevBtn();
  else if (currentIdx < index) {
    onClickDelayFlag = true;
    changeDisPlay(currentIdx + 1, 1, "none");
    changeDisPlay(index, 1, "block");
    $sliderUI.style.transition = "0.5s";
    $sliderUI.style.transform = `translateX(-66.6666%)`;
    moveDot(index);

    setTimeout(() => {
      $sliderUI.style.transition = "none";
      changeDisPlay(currentIdx - 1, 2, "none");
      changeDisPlay(index - 1, 1, "block");
      changeDisPlay(index + 1, 1, "block");
      $sliderUI.style.transform = `translateX(-33.3333%)`;
      currentIdx = index;
      onClickDelayFlag = false;
    }, 500);
  } else {
    onClickDelayFlag = true;
    changeDisPlay(currentIdx - 1, 1, "none");
    changeDisPlay(index, 1, "block");
    $sliderUI.style.transition = "0.5s";
    $sliderUI.style.transform = `translateX(0)`;
    moveDot(index);
    setTimeout(() => {
      $sliderUI.style.transition = "none";
      changeDisPlay(currentIdx, 2, "none");
      changeDisPlay(index - 1, 1, "block");
      changeDisPlay(index + 1, 1, "block");
      $sliderUI.style.transform = `translateX(-33.3333%)`;
      currentIdx = index;
      onClickDelayFlag = false;
    }, 500);
  }
}
function changeDisPlay(startIdx, cnt, mode) {
  for (let i = 0; i < cnt; i++) {
    $sliderUI.children[startIdx + i].style.display = mode;
  }
}
function onClickNextBtn() {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  const previousIdx = currentIdx - 1;
  currentIdx = currentIdx + 1;
  $sliderUI.style.transition = "0.5s";
  $sliderUI.style.transform = `translateX(-66.6666%)`;
  moveDot(currentIdx + 1 >= $sliderUI.children.length ? 1 : currentIdx);
  setTimeout(() => {
    $sliderUI.style.transition = "none";
    if (currentIdx + 1 < $sliderUI.children.length) {
      $sliderUI.children[previousIdx].style.display = "none";
      $sliderUI.children[currentIdx + 1].style.display = "block";
    } else {
      changeDisPlay($sliderUI.children.length - 3, 3, "none");
      changeDisPlay(0, 3, "block");
      currentIdx = 1;
    }
    $sliderUI.style.transform = `translateX(-33.3333%)`;
    onClickDelayFlag = false;
  }, 500);
}
function onClickPrevBtn() {
  if (onClickDelayFlag) return;
  onClickDelayFlag = true;
  const nextIdx = currentIdx + 1;
  currentIdx = currentIdx - 1;
  $sliderUI.style.transition = "0.5s";
  $sliderUI.style.transform = `translateX(0)`;
  moveDot(currentIdx - 1 < 0 ? $sliderUI.children.length - 2 : currentIdx);
  setTimeout(() => {
    $sliderUI.style.transition = "none";
    if (currentIdx - 1 >= 0) {
      $sliderUI.children[nextIdx].style.display = "none";
      $sliderUI.children[currentIdx - 1].style.display = "block";
    } else {
      changeDisPlay($sliderUI.children.length - 3, 3, "block");
      changeDisPlay(0, 3, "none");
      currentIdx = $sliderUI.children.length - 2;
    }
    $sliderUI.style.transform = `translateX(-33.3333%)`;
    onClickDelayFlag = false;
  }, 500);
}
function moveDot(index) {
  dotList.forEach((element, i) => {
    if (index - 1 === i) {
      element.style.backgroundColor = "black";
      element.style.color = "white";
    } else {
      element.style.backgroundColor = "tomato";
      element.style.color = "black";
    }
  });
}

slideInit();
initEvent();
