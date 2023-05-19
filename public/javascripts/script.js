const input = document.getElementById('book-image');
const preview = document.getElementById('book-image-preview');

input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    preview.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

document.getElementById('clear-image').addEventListener('click', () => {
  input.value = '';
  preview.src = '';
});
