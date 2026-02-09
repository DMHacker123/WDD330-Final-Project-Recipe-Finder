export function openModal(content) {
    const modalRoot = document.getElementById("modal-root");

    modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <button id="close-modal">Close</button>
        ${content}
      </div>
    </div>
  `;

    document
        .getElementById("close-modal")
        .addEventListener("click", () => {
            modalRoot.innerHTML = "";
        });
}
    