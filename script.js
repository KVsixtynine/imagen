const apiBaseUrl = 'https://imagen-psi.vercel.app'; // Replace with your actual API URL
const generateBtn = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const styleSelect = document.getElementById("style");
var jobCount = 1;

generateBtn.addEventListener("click", generateImages);

async function generateImages() {
  const prompt = promptInput.value.trim();
  const style = styleSelect.value;

  // Basic validation
  if (!prompt || !style) {
    alert("Please enter a prompt and select a style.");
    return;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/generate/${encodeURIComponent(prompt)}/${encodeURIComponent(style)}`,
      
    );

    if (response.ok) {
      const data = await response.json();
      const imageUrls = data.imageUrls;
      displayImages(imageUrls, prompt);
    } else {
      //console.error("Error generating images:", error);
    }
  } catch (error) {
    console.error("Error generating images:", error);
  }
}

function displayImages(imageUrls, prompt) {
    const job = document.createElement("div");
    jobCount++;
    job.classList.add("job");
    const h3Child = document.createElement("h3");
    h3Child.textContent = prompt;
    job.appendChild(h3Child);
  imageUrls.forEach((url) => {
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = url;
    job.appendChild(img);
  });
  const resultImg = document.querySelector(".resultImg");
  resultImg.appendChild(job);
}


