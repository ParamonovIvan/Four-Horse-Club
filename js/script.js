const btnLeft = document.querySelector(".btn_with-arrow_left")
const btnRight = document.querySelector(".btn_with-arrow_right")
const markers = document.querySelectorAll(".section-3__marker")
const container = document.querySelector(".section-3__cards-list")

let currentIndex = 0

btnLeft.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--
    updateSlide()
    updateButtonStyles()
  }
})

btnRight.addEventListener("click", () => {
  if (currentIndex < markers.length - 1) {
    currentIndex++
    updateSlide()
    updateBtnStyle()
  }
})

const updateSlide = () => {
  container.style.transform = `translateX(${-currentIndex * 100}%)`
  markers.forEach((marker, index) => {
    marker.classList.toggle("marker_active", index === currentIndex)
  })
}

const updateBtnStyle =() => {
  btnLeft.classList.toggle('disabled', currentIndex === 0)
  btnRight.classList.toggle('disabled', currentIndex === markers.length - 1)
}


const wrapper = document.querySelector('.section-4')
const slider = document.querySelector('.section-4__list')
const curentCounter = document.querySelector('.section-4__controls-counter_current')
const totalCounter = document.querySelector('.section-4__controls-counter_total')

let auto = true
let timerId = null

const maxElems = 6
totalCounter.innerText = maxElems

let countElemsOnPage = 0

if(Number(window.innerWidth) >= 1400) countElemsOnPage = 3
else countElemsOnPage = 1

curentCounter.innerText = countElemsOnPage

const changeSlade = (event) => {

  const target = event.target

  if (!target.closest('button')) return
  
  if (auto) {
    auto = !auto;
    clearInterval(timerId)
    setTimeout(() => autoChange(auto = true), 1000)
  };
    
  if (target.classList.contains('btn_with-arrow_left')) slidePrev()
  if (target.classList.contains('btn_with-arrow_right')) slideNext()
};

const slidePrev = () => {
  const slides = Array.from(slider.querySelectorAll('.section-4__item'))
  const last   = slides[slides.length - 1]
  slider.prepend(last)
  countElemsOnPage = (countElemsOnPage - 1 + maxElems) % maxElems
  if (countElemsOnPage == 0) return curentCounter.innerText = 6
  curentCounter.innerText = countElemsOnPage
};

const slideNext = () => {
  const slides = Array.from(slider.querySelectorAll('.section-4__item'))
  const first  = slides[0]
  slider.append(first)
  countElemsOnPage = (countElemsOnPage + 1) % maxElems
  if (countElemsOnPage == 0) return curentCounter.innerText = 6
  curentCounter.innerText = countElemsOnPage
};

const autoChange = (flag, time = 4000) => {
  if (!flag) return
  timerId = setInterval(() => slideNext(), time)
};

autoChange(auto)

wrapper.addEventListener('click', changeSlade)
