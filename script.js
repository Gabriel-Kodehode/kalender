const kallender = document.querySelector(".kallender");
const openedDays = new Set();

async function fetchJoke() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/jokes/random"
    );
    if (!response.ok) {
      throw new Error("fikk ikke hentet vits");
    }
    const jokeData = await response.json();
    return `${jokeData.setup} ${jokeData.punchline}`;
  } catch (error) {
    console.error("Failed to fetch joke:", error);
    return "Kunne ikke hente en vits";
  }
}

for (let i = 1; i <= 24; i++) {
  const day = document.createElement("div");
  day.classList.add("day");
  day.textContent = i;
  day.dataset.day = i;

  const jokeElement = document.createElement("div");
  jokeElement.classList.add("joke");
  jokeElement.textContent = "Trykk for å åpne!";

  day.appendChild(jokeElement);
  kallender.appendChild(day);
}

kallender.addEventListener("click", async (event) => {
  const target = event.target.closest(".day");

  if (target && !target.classList.contains("opened")) {
    const day = target.dataset.day;

    const joke = await fetchJoke();
    const jokeElement = target.querySelector(".joke");
    jokeElement.textContent = joke;

    target.classList.add("opened");
  }
});
