// 📷 File Upload
function openFile() {
    document.getElementById("fileInput").click();
}

// Preview Image
document.getElementById("fileInput").addEventListener("change", function() {
    let file = this.files[0];
    let preview = document.getElementById("preview");

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

// 🎤 Voice Search
function startVoice() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onresult = function(event) {
        document.getElementById("searchInput").value = event.results[0][0].transcript;
    };

    recognition.start();
}

// 🔍 Live Suggestions (Google style)
let input = document.getElementById("searchInput");
let suggestions = document.getElementById("suggestions");

input.addEventListener("input", function() {
    let query = input.value;

    if (query.length === 0) {
        suggestions.style.display = "none";
        return;
    }

    fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`)
        .then(res => res.json())
        .then(data => {
            suggestions.innerHTML = "";

            data[1].forEach(item => {
                let li = document.createElement("li");
                li.textContent = item;

                li.onclick = () => {
                    input.value = item;
                    suggestions.style.display = "none";
                };

                suggestions.appendChild(li);
            });

            suggestions.style.display = "block";
        });
});

// 🌙 Dark Mode
document.getElementById("toggleMode").onclick = function() {
    document.body.classList.toggle("dark");
};

function updateTime() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // format (2 digit)
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = hours + ":" + minutes + ":" + seconds;

    document.getElementById("clock").innerText = time;
}

// update every second
setInterval(updateTime, 1000);