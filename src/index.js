document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");  // Fixed the extra space in the ID
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");

    fetch(baseUrl)  // Fixed fetch to use the baseUrl variable correctly
        .then(res => res.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => {
                    showCharacterDetails(character);
                });
                characterBar.appendChild(span);  // Fixed the appendChild method
            });

            if (characters.length > 0) {  // Corrected to check characters.length
                showCharacterDetails(characters[0]);
            }
        })
        .catch(err => console.error("Error fetching characters:", err));  // Added error handling for fetch

    function showCharacterDetails(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.alt = character.name;
        voteCount.textContent = character.vote;
        characterImage.style.display = 'block';
    }

    voteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const votesToAdd = parseInt(voteInput.value) || 0;
        const currentVotes = parseInt(voteCount.textContent);
        voteCount.textContent = currentVotes + votesToAdd;
        voteInput.value = "";
    });

    resetButton.addEventListener("click", () => {  // Fixed the typo in addEventListener
        voteCount.textContent = "0";
    });
});
