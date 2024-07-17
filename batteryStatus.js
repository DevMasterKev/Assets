navigator.getBattery().then(function(battery) {
    function updateBatteryStatus() {
        let batteryIconUrl;
        const batteryLevel = Math.round(battery.level * 100);

        if (battery.charging) {
            batteryIconUrl = 'https://cdn-icons-png.flaticon.com/128/3103/3103319.png';
        } else if (batteryLevel > 65) {
            batteryIconUrl = 'https://cdn-icons-png.flaticon.com/128/3103/3103446.png';
        } else if (batteryLevel > 30) {
            batteryIconUrl = 'https://cdn-icons-png.flaticon.com/128/3103/3103529.png';
        } else if (batteryLevel > 10) {
            batteryIconUrl = 'https://cdn-icons-png.flaticon.com/128/3103/3103496.png';
        } else {
            batteryIconUrl = 'https://cdn-icons-png.flaticon.com/128/3103/3103441.png';
        }

        document.querySelector('.battery .battery-icon').src = batteryIconUrl;
        document.querySelector('.battery-percentage').textContent = `${batteryLevel}%`;
    }

    battery.addEventListener('chargingchange', updateBatteryStatus);
    battery.addEventListener('levelchange', updateBatteryStatus);
    updateBatteryStatus();
});

