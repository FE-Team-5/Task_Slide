const $sliderUl = document.querySelector(".sliderUl");
const $sliderList = document.querySelectorAll(".slider");
const $prevBtn = document.querySelector(".prev");
const $nextBtn = document.querySelector(".next");

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
  itemIndex = getValidIndex(--itemIndex);

  console.log(itemIndex, slideItemArr.length - 1);

  if (itemIndex == slideItemArr.length - 1) {
    const $inner = document.createElement("li");
    $inner.className = "slider";
    $inner.innerHTML = `<div>
  <p>${slideItemArr[itemIndex].slideText}</p>
  <img src=${slideItemArr[itemIndex].slideImg} alt=""/>
  </div>`;

    $sliderUl.prepend($inner);
  }
});

$nextBtn.addEventListener("click", () => {
  itemIndex = getValidIndex(++itemIndex);

  $sliderUl.style.cssText = `display:flex;
  width:300%;
  transform : translate(-33.3333%);
  transition: 1s;`;
});

function getValidIndex(index) {
  return index >= slideItemArr.length
    ? 0
    : index < 0
    ? slideItemArr.length - 1
    : index;
}
