const $sliderList = document.querySelectorAll(".slider");
const $prevBtn = document.querySelector(".prev");
const $nextBtn = document.querySelector(".next");

// 1.sliderUl하위 slider클래스 목록을 받는다.
// 1.1 slider 클래스 하위 글자,이미지 소스 값을 배열로 받는다
// 2.최초에는 index 0~3
// 3.버튼을 조작해서 앞/뒤 이동하면서 rotate될 수 있도록 조작

let itemIndex = 0;
let slideItemArr = getInitialSlideItems();

function getInitialSlideItems() {
  let slideArr = new Array();

  $sliderList.forEach((slider) => {
    let slideItem = new Object();
    slideItem.slideText = slider.querySelector("p").innerText;
    slideItem.slideImg = slider.querySelector("img").getAttribute("src");
    slideArr.push(slideItem);
  });
  return slideArr;
}

$prevBtn.addEventListener("click", () => {
  itemIndex = --itemIndex < 0 ? slideItemArr.length - 1 : itemIndex;
});

$nextBtn.addEventListener("click", () => {
  itemIndex = ++itemIndex > slideItemArr.length - 1 ? 0 : itemIndex;
});
