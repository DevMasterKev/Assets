document.addEventListener('DOMContentLoaded', function() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var backgroundImageUrl;

    if (hour < 4 || (hour === 4 && minute < 30)) {
        backgroundImageUrl = 'lake-1.jpg';
    } else if (hour < 6 || (hour === 6 && minute < 30)) {
        backgroundImageUrl = 'lake-2.jpg';
    } else if (hour < 8) {
        backgroundImageUrl = 'lake-3.jpg';
    } else if (hour < 11) {
        backgroundImageUrl = 'lake-4.jpg';
    } else if (hour < 14 || (hour === 14 && minute < 30)) {
        backgroundImageUrl = 'lake-5.jpg';
    } else if (hour < 17 || (hour === 17 && minute < 30)) {
        backgroundImageUrl = 'lake-6.jpg';
    } else if (hour < 20) {
        backgroundImageUrl = 'lake-7.jpg';
    } else {
        backgroundImageUrl = 'lake-8.jpg';
    }

    // Ersetzen Sie 'path/to/your/images/' mit dem tatsächlichen Pfad zu Ihren Bildern
    document.body.style.backgroundImage = "url('https://github.com/DevMasterKev/Assets/blob/1a2b16bb9adab43a65b16c00d53a9a83700ffaaa/Wallpapers/" + backgroundImageUrl + "?raw=true')";
});