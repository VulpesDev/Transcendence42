var modal = document.getElementById("myModal");
var modalPong = document.getElementById("myModalPong");
var modalRPS = document.getElementById("myModalRPS");

function openModal(modalElement) {
  modalElement.style.display = "block";
}

function closeModal(modalElement) {
  modalElement.style.display = "none";
}

var modalCloseSpan = modal.querySelector(".close");
var modalPongCloseSpan = modalPong.querySelector(".close");
var modalRPSCloseSpan = modalRPS.querySelector(".close");

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
  .getElementById("modalRPSButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openModal(modalRPS);
  });

modalCloseSpan.addEventListener("click", function () {
  closeModal(modal);
});

modalPongCloseSpan.addEventListener("click", function () {
  closeModal(modalPong);
});

modalRPSCloseSpan.addEventListener("click", function () {
  closeModal(modalRPS);
});

window.addEventListener("click", function (event) {
  if (
    event.target === modal ||
    event.target === modalPong ||
    event.target === modalRPS ||
    event.target === modal.querySelector(".modal-content") ||
    event.target === modalPong.querySelector(".modal-content") ||
    event.target === modalRPS.querySelector(".modal-content")
  ) {
    closeModal(modal);
    closeModal(modalPong);
    closeModal(modalRPS);
  }
});
