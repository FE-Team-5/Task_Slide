const $sliderUl = document.querySelector(".sliderUl");
let $sliderList = document.querySelectorAll(".slider");
const $prevBtn = document.querySelector(".prev");
const $nextBtn = document.querySelector(".next");

let itemIndex = 0;

// 1. sliderUl 하위 li 요소들을 배열로 받는다.
// 2. li 요소 배열 중, 초기 itemIndex(0)을 기준으로 -1(배열크기-1번째),0,1번째 3개요소를 갖는 배열을 만든다.
// 3. 버튼 종류에 따라 +/- 방향으로 SliderUl이 이동한다.
// 3.1 prev버튼 클릭시, 우측으로 이동하고 itemIndex 변경한다(-1)
// 3.2 next버튼 클릭시, 좌측으로 이동하고 itemIndex 변경한다(+1)
// 4. li 요소 배열 중, itemIndex 기준으로 양쪽 3개 슬라이드 정보를 갖는 배열을 만든다.

let isFirst = true;
const sliderItemArr = getSlideArray();
InitSlide();

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

function InitSlide() {
  getThreeItems(itemIndex).forEach((element) => {
    addElement(element);
  });

  // 최초일 경우, 기존 슬라이드 수량만큼 제거
  // 이후 기존 3개 제거
  let removeArLength = isFirst ? sliderItemArr.length : 3;
  if (isFirst) isFirst = false;
  const itemLi = document.querySelectorAll(".slider");
  for (let i = 0; i < removeArLength; i++) {
    itemLi[i].remove();
  }

  $sliderUl.style.cssText = `transform: translateX(-33.3333%); `;
}

function getThreeItems(index) {
  console.log("getThree", index);

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

$prevBtn.addEventListener("click", () => {
  setTimeout(() => {
    itemIndex = getValidIndex(--itemIndex);
    InitSlide();
  }, 1000);

  $sliderUl.style.cssText = `
  transform: translateX(0%);
   transition: 1s `;
});

$nextBtn.addEventListener("click", () => {
  setTimeout(() => {
    itemIndex = getValidIndex(++itemIndex);
    InitSlide();
  }, 1000);

  $sliderUl.style.cssText = `
   transform: translateX(-66.6666%);
   transition: 1s `;
});

function getValidIndex(index) {
  return index >= sliderItemArr.length
    ? 0
    : index < 0
    ? sliderItemArr.length - 1
    : index;
}
