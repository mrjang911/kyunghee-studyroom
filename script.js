const studyroomSelect = document.getElementById('studyroom');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

let ticketPrice = +studyroomSelect?.value;

populateUI();

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    selectedSeats.forEach((seatIndex) => {
      seats[seatIndex].classList.add('selected');
    });
  }

  const selectedStudyroomIndex = localStorage.getItem('selectedStudyroomIndex');

  if (selectedStudyroomIndex !== null) {
    studyroomSelect.selectedIndex = selectedStudyroomIndex;
  }
}

function setStudyroomData(studyroomIndex, studyroomPrice) {
  localStorage.setItem('selectedStudyroomIndex', studyroomIndex);
  localStorage.setItem('selectedStudyroomPrice', studyroomPrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .selected');
  const selectedSeatCount = +selectedSeats.length;

  const selectedSeatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));

  count.textContent = selectedSeatCount;
  total.textContent = selectedSeatCount * ticketPrice;
}

studyroomSelect.addEventListener('change', (event) => {
  ticketPrice = +event.target.value;

  setStudyroomData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

updateSelectedCount();
