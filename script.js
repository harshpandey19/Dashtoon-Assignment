async function generateComic() {
    const comicPanels = document.getElementById('comicPanels');
    const comicOutput = document.getElementById('comicOutput');

    const panels = [];

    // Extract panel values from the form
    for (let i = 1; i <= 10; i++) {
        const panelInput = document.getElementById(`panel${i}`);
        panels.push(panelInput.value);
        //console.log(panelInput.value);
    }

    try {
        const images = await generateImages(panels);

        // Display generated images
        comicOutput.innerHTML = '';
        images.forEach((imageUrl, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            //console.log(imgElement.src);
            imgElement.alt = `Panel ${index + 1}`;
            comicOutput.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error generating comic:', error);
    }
}

async function generateImages(panels) {
    // Simulate fetching images from a text-to-image API
    const apiUrl = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
    const apiKey = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

    const images = [];

    for (const panelText of panels) {
      //  console.log(panelText);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'image/png',
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "inputs": panelText }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            images.push(imageUrl);
        } else {
            console.error(`Failed to generate image for panel: ${panelText}`);
        }
    }

    return images;
}
