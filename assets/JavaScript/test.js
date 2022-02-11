$(".js-modal-trigger").click(function() {
 
  $(".modal").addClass("is-active"); 
 
});
 
 
 
 
$(".modal-close").click(function() {
 
   $(".modal").removeClass("is-active");
 
});
 
 
 
 
document.addEventListener(
  "click",
  function(event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
      event.target.matches(".button-close-modal") ||
      !event.target.closest(".modal")
    ) {
      closeModal()
    }
  },
  false
)

function closeModal() {
  document.querySelector(".modal").style.display = "none"
}

 