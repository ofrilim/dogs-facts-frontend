import { toast } from 'react-toastify';

// helpers functions:

export const getRandomAngle = () => {
  return Math.random() * 20 - 10;
}

export const notify = (condition) => {
  toast(`Fact ${condition}!`, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
  });
}

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}