var modal = document.getElementById("myModal");
var modalPong = document.getElementById("myModalPong");
var modalTTT = document.getElementById("myModalTTT");

function openModal(modalElement) {
  modalElement.style.display = "block";
}

function closeModal(modalElement) {
  modalElement.style.display = "none";
}

var modalCloseSpan = modal.querySelector(".close");
var modalPongCloseSpan = modalPong.querySelector(".close");
var modalTTTCloseSpan = modalTTT.querySelector(".close");

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

modalCloseSpan.addEventListener("click", function () {
  closeModal(modal);
});

modalPongCloseSpan.addEventListener("click", function () {
  closeModal(modalPong);
});

modalTTTCloseSpan.addEventListener("click", function () {
  closeModal(modalTTT);
});

window.addEventListener("click", function (event) {
  if (
    event.target === modal ||
    event.target === modalPong ||
    event.target === modalTTT ||
    event.target === modal.querySelector(".modal-content") ||
    event.target === modalPong.querySelector(".modal-content") ||
    event.target === modalTTT.querySelector(".modal-content")
  ) {
    closeModal(modal);
    closeModal(modalPong);
    closeModal(modalTTT);
  }
});
