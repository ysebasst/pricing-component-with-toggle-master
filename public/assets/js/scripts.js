const ourPricingToggleButton = document.querySelector(
  ".our-pricing-toggle__button"
);
const ourPricingArticles = document.querySelector(".our-pricing-articles");

ourPricingToggleButton.addEventListener("click", function () {
  this.classList.toggle("our-pricing-toggle__button--left");
  ourPricingArticles.classList.toggle("our-pricing-articles--annualy");
});
