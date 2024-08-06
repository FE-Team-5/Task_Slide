const $sliderUl = document.querySelector(".sliderUl");
const $sliderList = document.querySelectorAll(".slider");
const $prevBtn = document.querySelector(".prev");
const $nextBtn = document.querySelector(".next");
const $sliderDot = document.querySelector(".slider-dot");
const $spanList = document.querySelectorAll("span");

// 1. sliderUl 하위 li 요소들을 배열로 받는다.
// 2. li 요소 배열 중, 초기 itemIndex(0)을 기준으로 -1(배열 마지막),0,1번째 3개요소를 갖는 배열을 만든다.
// 3. 버튼 종류에 따라 +/- 방향으로 SliderUl이 이동한다.
// 3.1 prev버튼 클릭시, 우측으로 이동하고 itemIndex 변경한다(-1)
// 3.2 next버튼 클릭시, 좌측으로 이동하고 itemIndex 변경한다(+1)
// 4. li 요소 배열 중, itemIndex 기준으로 양쪽 3개 슬라이드 정보를 갖는 배열을 만든다.
// 4.1 prev버튼을 클릭했다면, transformX(33.3333);
// 3.2 next버튼을 클릭했다면, transformY(-33.3333);

let itemIndex = 0;
let isFirst = true;
let isPaginationMode = true;
const sliderItemArr = getSlideArray();
InitSlide();
AddPagenationEvent();

// html코드상 슬라이드 배열 가져오는 함수
function getSlideArray() {
  let slideArr = new Array();
  $sliderList.forEach((slider) => {
    let slideItem = new Object();
    slideItem.slideText = slider.querySelector("p").innerText;
    slideItem.slideImg = slider.querySelector("img").getAttribute("src");
    slideArr.push(slideItem);
  });
  return slideArr;
}

//from : 현재 슬라이드 index
//to : 선택한 슬라이드 index
function moveSlide(from, to) {
  if (from < to) {
    InitSlide(from);
    for (let i = 0; i < to - from; i++) {
      moveNext();
    }
  } else if (to < from) {
    InitSlide(to);
    for (let i = 0; i < from - to; i++) {
      movePrev();
    }
  }
}

function movePrev() {
  setTimeout(() => {
    itemIndex = getValidIndex(--itemIndex);
    changeBtnStyles(itemIndex);
    InitSlide(itemIndex);
  }, 1000);
  $sliderUl.style.cssText = `
  transform: translateX(0%);
  transition: 1s `;
}

function moveNext() {
  setTimeout(() => {
    itemIndex = getValidIndex(++itemIndex);
    changeBtnStyles(itemIndex);
    InitSlide(itemIndex);
  }, 1000);

  $sliderUl.style.cssText = `
   transform: translateX(-66.6666%);
   transition: 1s `;
}

function InitSlide(idx) {
  getThreeItems(itemIndex).forEach((element) => {
    addElement(element);
  });
  removeUnnecessaryLi();
  $sliderUl.style.cssText = `transform: translateX(-33.3333%); `;
}

function getThreeItems(index) {
  let slideArr = new Array();
  slideArr.push(sliderItemArr[getValidIndex(index - 1)]);
  slideArr.push(sliderItemArr[getValidIndex(index)]);
  slideArr.push(sliderItemArr[getValidIndex(index + 1)]);
  return slideArr;
}

function addElement(item) {
  const newLi = document.createElement("li");
  newLi.classList.add(`slider`);
  newLi.innerHTML = `
  <div>
  <p>${item.slideText}</p>
  <img src ="${item.slideImg}" alt=""/>
  </div>`;
  $sliderUl.append(newLi);
}

function removeUnnecessaryLi() {
  // 최초일 경우, 기존 슬라이드 수량만큼 제거
  // 이후 기존 3개 제거
  let removeArLength = isFirst ? getSlideArray().length : 3;

  if (isFirst) isFirst = false;
  const itemLi = document.querySelectorAll(".slider");
  for (let i = 0; i < removeArLength; i++) {
    itemLi[i].remove();
  }
}

// 선택된 슬라이드 Index 유효성 검사
function getValidIndex(index) {
  return index >= sliderItemArr.length
    ? 0
    : index < 0
    ? sliderItemArr.length - 1
    : index;
}

$prevBtn.addEventListener("click", () => {
  movePrev();
});

$nextBtn.addEventListener("click", () => {
  moveNext();
});

// Pagination버튼 스타일 변경함수
function changeBtnStyles(selectedIndex) {
  // pagination 선택된 버튼 표시
  for (let i = 0; i < $spanList.length; i++) {
    $spanList[i].style.cssText = `
      position: absolute;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: tomato;
      color:black;
    `;
  }

  $spanList[selectedIndex].style.cssText = `
    background-color: black;
    color: white;`;
}

// Pagination 버튼 클릭 이벤트 선언
function AddPagenationEvent() {
  for (let i = 0; i < $spanList.length; i++) {
    $spanList[i].addEventListener("click", (e) => {
      let selectedIndex = e.target.classList[0].replace("dot", "") - 1;
      changeBtnStyles(i);

      moveSlide(itemIndex, selectedIndex);
    });
  }
}
