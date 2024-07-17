function updateTime() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[now.getDay()];
    const date = now.getDate();
    const ordinal = getOrdinal(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12;
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
    const screenWidth = window.innerWidth;

    let timeString;
    if (screenWidth <= 480) {
        timeString = `${ordinal} ${month} ${year.toString().slice(2)} ${hour12}:${minutesFormatted}${ampm}`;
    } else if (screenWidth <= 768) {
        timeString = `${dayOfWeek.substring(0, 3)} ${ordinal} ${month} ${year} ${hour12}:${minutesFormatted}${ampm}`;
    } else {
        timeString = `${dayOfWeek} ${ordinal} ${month} ${year} ${hour12}:${minutesFormatted}${ampm}`;
    }

    document.querySelector('.time-display').textContent = timeString;
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
}

window.addEventListener('resize', updateTime);
setInterval(updateTime, 60000);
updateTime();
