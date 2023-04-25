const inputElement = document.getElementById("input");
const infoTextElement = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const wordElement = document.getElementById("word");
const meaningElement = document.getElementById("meaning");
const audioElement = document.getElementById("audio");


inputElement.addEventListener("keyup", (e) => {
    if(e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
});

async function fetchAPI(word) {
    try {
        infoTextElement.style.display = "block";
        meaningContainer.style.display = "none";
        infoTextElement.innerHTML = `Searching the meaning of ${word}...`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const data = await fetch(url)
        .then(response => response.json())    
        infoTextElement.style.display = "none";
        meaningContainer.style.display = "block";
        // Check if title key exists then display it
        if(data["title"]) {
            wordElement.innerHTML = inputElement.value;
            meaningElement.innerHTML = data["title"];
            audioElement.style.display = "none";
        }
        else {
            wordElement.innerHTML = data[0]["word"];
            meaningElement.innerHTML = data[0]["meanings"][0]["definitions"][0]["definition"];
            audioElement.style.display = "inline-flex";
            data[0]["phonetics"].forEach(phonetic => {
                if(phonetic["audio"]) {
                    audioElement.src = phonetic["audio"];
                    return;
                }
            });
        }
    } catch (error) {
        console.log(error);
        infoTextElement.innerHTML = "Something went wrong. Please try again later.";
    }
}