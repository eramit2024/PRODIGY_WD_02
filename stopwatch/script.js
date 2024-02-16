let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startPause() {
    if (isRunning) {
        // Pause the stopwatch
        clearInterval(timer);
        document.getElementById("startPause").textContent = "Resume";
    } else {
        // Start or resume the stopwatch
        startTime = new Date() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b) : 0);
        timer = setInterval(updateDisplay, 1000);
        document.getElementById("startPause").textContent = "Pause";
    }
    isRunning = !isRunning;
}

function reset() {
    // Reset the stopwatch
    clearInterval(timer);
    isRunning = false;
    lapTimes = [];
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    // Record lap time
    if (isRunning) {
        const lapTime = new Date() - startTime;
        lapTimes.push(lapTime);

        // Display lap time
        const lapList = document.getElementById("laps");
        const lapItem = document.createElement("li");
        lapItem.textContent = formatTime(lapTime);
        lapList.appendChild(lapItem);
    }
}

function updateDisplay() {
    // Update the displayed time
    const currentTime = new Date() - startTime;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(time) {
    // Format time in HH:MM:SS
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
