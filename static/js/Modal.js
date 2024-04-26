var modal = document.getElementById("myModal");
var modalPong = document.getElementById("myModalPong");
var modalTTT = document.getElementById("myModalTTT");
var modalPongTournament = document.getElementById("myModalPongTournament");

function openModal(modalElement) {
  modalElement.style.display = "block";
}

function closeModal(modalElement) {
  modalElement.style.display = "none";
}

var modalCloseSpan = modal.querySelector(".close");
var modalPongCloseSpan = modalPong.querySelector(".close");
var modalTTTCloseSpan = modalTTT.querySelector(".close");
var modalPongTournamentCloseSpan = modalPongTournament.querySelector(".close");

document
  .getElementById("modalButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openModal(modal);
  });

document
  .getElementById("modalPongButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openModal(modalPong);
  });

document
  .getElementById("modalTTTButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openModal(modalTTT);
  });
  
document
  .getElementById("modalPongTournamentButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openModal(modalPongTournament);
  });

modalCloseSpan.addEventListener("click", function () {
  closeModal(modal);
});

modalPongCloseSpan.addEventListener("click", function () {
  closeModal(modalPong);
});

modalTTTCloseSpan.addEventListener("click", function () {
  closeModal(modalTTT);
});

modalPongTournamentCloseSpan.addEventListener("click", function () {
  closeModal(modalPongTournament);
});

window.addEventListener("click", function (event) {
  if (
    event.target === modal ||
    event.target === modalPong ||
    event.target === modalTTT ||
	event.target === modalPongTournament ||
    event.target === modal.querySelector(".modal-content") ||
    event.target === modalPong.querySelector(".modal-content") ||
    event.target === modalTTT.querySelector(".modal-content") ||
	event.target === modalPongTournament.querySelector(".modal-content")
  ) {
    closeModal(modal);
    closeModal(modalPong);
    closeModal(modalTTT);
	closeModal(modalPongTournament);
  }
});
