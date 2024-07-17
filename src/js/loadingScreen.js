window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingLink = document.getElementById('loadingLink');
    const loadingText = document.querySelector('.loading-text');

    // Funktion zum Ausblenden des Loading Screens
    function hideLoadingScreen() {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'translateY(-100%)'; // Slide-Out-Effekt
        setTimeout(() => {
            loadingScreen.remove(); // Entfernt den Ladebildschirm nach dem Fade-Out
        }, 500);
    }

    // Eventlistener für Klick auf den Loading Text
    loadingLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.documentElement.requestFullscreen(); // Vollbildmodus aktivieren

        // Animation nach dem Klick
        loadingScreen.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'translateY(-100%)'; // Slide-Out-Effekt
            setTimeout(() => {
                loadingScreen.remove(); // Entfernt den Ladebildschirm nach dem Fade-Out
            }, 500);
        }, 100); // Verzögerung für die Animation, damit der Vollbildmodus zuerst angewendet wird
    });

    // Fade-In Animation für den Loading Text
    setTimeout(() => {
        loadingText.style.opacity = '1';
    }, 500); // Verzögerung für das Fade-In, nachdem die Seite geladen wurde
});
