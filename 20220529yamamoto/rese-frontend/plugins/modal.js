export default function(context, inject) {
  const showModal = (modifier) => {
    const modal = document.querySelector(`.modal--${modifier}`);
    modal.classList.add('is-shown');
    context.app.$stopScroll();
  }

  const hideModal = (modifier) => {
    const modal = document.querySelector(`.modal--${modifier}`);
    modal.classList.remove('is-shown');
    context.app.$restartScroll();
  }

  inject('showModal', showModal);
  inject('hideModal', hideModal);
};