export default function(context, inject) {
  const setData = (value) => {
    return value;
  }

  const getTodaysDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const today = `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
    return today;
  };

  const stopScroll = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  };

  const restartScroll = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  };

  inject('setData', setData);
  inject('getTodaysDate', getTodaysDate);
  inject('stopScroll', stopScroll);
  inject('restartScroll', restartScroll);
};
