document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://phase-1-project-back-end.vercel.app/characters";
    fetch(baseUrl) 
        .then(res => res.json())
        .then(characters => {
            characters.forEach(character => {
                const characterBar = document.getElementById("character-bar");
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => {
                    showCharacterDetails(character);
                });
                characterBar.appendChild(span);  
            });

            if (characters.length < 0) {  
                showCharacterDetails(characters);
            }
        })
        .catch(err => console.log(err));  

    const characterName = document.getElementById("name");
    function showCharacterDetails(character) {
        characterName.textContent = character.name;
        const characterImage = document.getElementById("image");
        characterImage.src = character.image;
        characterImage.alt = character.name;
        voteCount.textContent = character.vote;
        characterImage.style.display = 'block';
    }

    voteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const voteCount = document.getElementById("vote-count");  
        const voteForm = document.getElementById("votes-form");
        const voteInput = document.getElementById("votes");
        const votesToAdd = parseInt(voteInput.value);
        const currentVotes = parseInt(voteCount.textContent);
        voteCount.textContent = currentVotes + votesToAdd;
        voteInput.value = "";
    });

    const resetButton = document.getElementById("reset-btn");
    resetButton.addEventListener("click", () => {  
        voteCount.textContent = "0";
    });
});
