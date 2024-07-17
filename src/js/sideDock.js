document.addEventListener('DOMContentLoaded', () => {
    const settingsIcon = document.getElementById('settings-icon');
    const sideDock = document.querySelector('.side-dock');

    // Side-Dock ein-/ausblenden
    settingsIcon.addEventListener('click', () => {
        const isVisible = sideDock.style.opacity === "1";
        sideDock.style.opacity = isVisible ? "0" : "1";
        sideDock.style.visibility = isVisible ? "hidden" : "visible";
    });

    // Klicken außerhalb des Side-Docks, um es zu schließen
    document.addEventListener('click', (event) => {
        if (!sideDock.contains(event.target) && !settingsIcon.contains(event.target)) {
            sideDock.style.opacity = "0";
            sideDock.style.visibility = "hidden";
        }
    });
});
