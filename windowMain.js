document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#iframe-container');

    iframeData.forEach(data => {
        const iframeWindow = createIframeWindow(data);
        container.appendChild(iframeWindow);

        window.initializeDraggableAndResizable(iframeWindow);
        window.addWindowButtonListeners(iframeWindow);

        if (!iframeWindow.classList.contains('initialized')) {
            window.centerWindow(iframeWindow);
            iframeWindow.classList.add('initialized');
        }

        iframeWindow.addEventListener('click', () => {
            window.bringToFront(iframeWindow);
        });

        iframeWindow.querySelector('.iframe-area').addEventListener('click', (e) => {
            e.stopPropagation();
            window.bringToFront(iframeWindow);
        });

        const iframe = iframeWindow.querySelector('iframe');
        iframe.addEventListener('click', (e) => {
            e.stopPropagation();
            window.bringToFront(iframeWindow);
        });
    });

    document.querySelectorAll('.folder-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const iframeWindow = document.getElementById(targetId);
            const iframe = iframeWindow.querySelector('iframe');

            if (iframeWindow && iframe) {
                iframeWindow.style.display = 'block';
                this.classList.add('disabled');

                if (!iframe.src) {
                    iframe.src = iframe.getAttribute('data-src');
                }

                window.bringToFront(iframeWindow);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('window-duplicate-btn')) {
            const iframeWindow = event.target.closest('.iframe-window');
            window.cloneAndOffsetWindow(iframeWindow);
        }
    });
});

function createIframeWindow(data) {
    const iframeWindow = document.createElement('div');
    iframeWindow.className = 'iframe-window';
    iframeWindow.id = data.id;

    iframeWindow.innerHTML = `
        <div class="iframe-title-bar">
            <div class="window-controls">
                <button class="window-duplicate-btn">Duplicate</button>
            </div>
            <div class="window-controls">
                <span class="iframe-title">${data.title}</span>
            </div>
            <div class="window-controls">
                <button class="control-btn close-btn"></button>
                <button class="control-btn minimize-btn"></button>
                <button class="control-btn maximize-btn"></button>
            </div>
        </div>
        <div class="iframe-area">
            <iframe frameborder="0" data-src="${data.src}"></iframe>
        </div>
    `;
    return iframeWindow;
}
