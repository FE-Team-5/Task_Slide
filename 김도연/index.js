const $slideUl = document.querySelector('.sliderUl');
const $slideItems = document.querySelectorAll('.slider');
const $prevBtn = document.querySelector('.btn.prev');
const $nextBtn = document.querySelector('.btn.next');
const $dots = document.querySelectorAll('.slider-dot > span');

let slideArray = [...$slideItems];

const appendSlides = (arr) => {
  $slideUl.innerHTML = '';
  $slideUl.append(...arr);
};

const activeDots = () => {
  $dots.forEach((dot, i) => {
    const regex = new RegExp(i + 1, 'i');
    dot.style.cssText = regex.test(slideArray[0].outerText)
      ? 'background-color: black; color: white'
      : 'background-color: tomato; color: black';
  });
};

const handleButtonClick = (e) => {
  e.preventDefault();
  const direction = e.target;

  if (direction.className.includes('prev')) {
    slideArray.unshift(slideArray.pop());
  } else slideArray.push(slideArray.shift());

  appendSlides(slideArray);
  activeDots();
};

const handleDotClick = (e, index) => {
  const originSlideArray = [...$slideItems];
  const newSlideArray = [
    ...originSlideArray.slice(index),
    ...originSlideArray.slice(0, index),
  ];

  appendSlides(newSlideArray);
  slideArray = newSlideArray;
  activeDots();
};

$prevBtn.addEventListener('click', handleButtonClick);
$nextBtn.addEventListener('click', handleButtonClick);

$dots.forEach((dot, i) => {
  dot.addEventListener('click', (e) => handleDotClick(e, i));
});
