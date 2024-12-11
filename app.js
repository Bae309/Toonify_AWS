const fileInput = document.getElementById('fileInput');
const convertButton = document.getElementById('convertButton');
const previewContainer = document.getElementById('previewContainer');
const loadingContainer = document.getElementById('loadingContainer');
const resultContainer = document.getElementById('resultContainer');
const convertedImage = document.getElementById('convertedImage');

convertButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please upload an image first.');
    return;
  }

  // 미리보기 표시
  const reader = new FileReader();
  reader.onload = (e) => {
    previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview" class="max-w-xs mx-auto shadow-md rounded-md" />`;
  };
  reader.readAsDataURL(file);

  // 로딩 UI 표시
  loadingContainer.classList.remove('hidden');
  resultContainer.classList.add('hidden');

  try {
    // 이미지 데이터를 AI API로 전송
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://XuIBo21KkJagw7Kx7NJjC1mUJMDz7bHopIxymHd6/convert', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to convert the image');
    }

    const result = await response.json();

    // 변환된 이미지 URL 표시
    loadingContainer.classList.add('hidden');
    convertedImage.src = result.convertedImageUrl; // API에서 반환된 URL
    resultContainer.classList.remove('hidden');
  } catch (error) {
    loadingContainer.classList.add('hidden');
    alert(`Error: ${error.message}`);
  }
});
