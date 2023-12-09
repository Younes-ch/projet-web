const inputElement = document.querySelector("[word-input]");
const infoTextElement = document.querySelector("[info-text]");
const meaningContainer = document.querySelector("[meaning-container]");
const wordElement = document.querySelector("[word-result]");
const meaningElement = document.querySelector("[meaning-result]");
const audioElement = document.querySelector("[audio-result]");


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
            data[0]["phonetics"].every(phonetic => {
                if(phonetic["audio"]) {
                    audioElement.src = phonetic["audio"];
                    console.log(phonetic["audio"]);
                    return;
                }
                audioElement.style.display = "none";
            });
        }
    } catch (error) {
        console.log(error);
        infoTextElement.innerHTML = "Something went wrong. Please try again later.";
    }
}