const $slideUl = document.querySelector('.sliderUl');
const $slideItems = document.querySelectorAll('.slider');
const $prevBtn = document.querySelector('.btn.prev');
const $nextBtn = document.querySelector('.btn.next');

let slideArray = [...$slideItems];

const handleRotation = (e) => {
  e.preventDefault();
  const direction = e.target;
  $slideUl.innerHTML = ``;

  if (direction.className.includes('prev')) {
    slideArray.unshift(slideArray.pop());
  } else slideArray.push(slideArray.shift());

  slideArray.map((slide) => $slideUl.appendChild(slide));
};

$prevBtn.addEventListener('click', handleRotation);
$nextBtn.addEventListener('click', handleRotation);
