window.zIndexOfTopWindow = 1;

window.bringToFront = (element) => {
    element.style.zIndex = ++window.zIndexOfTopWindow;
};

window.updateIframePointerEvents = (enable) => {
    document.querySelectorAll('.iframe-window iframe').forEach(iframe => {
        iframe.style.pointerEvents = enable ? 'auto' : 'none';
    });
};

window.initializeDraggableAndResizable = (element) => {
    interact(element).draggable({
        listeners: {
            start(event) {
                const iframeWindow = event.target;
                if (iframeWindow.classList.contains('maximized')) {
                    event.interactable.stop();
                    return;
                }
                window.bringToFront(iframeWindow);
                window.updateIframePointerEvents(false);
                document.body.classList.add('dragging');
            },
            move(event) {
                const target = event.target;
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const elementWidth = target.offsetWidth;
                const elementHeight = target.offsetHeight;

                x = Math.max(0, Math.min(x, windowWidth - elementWidth));
                y = Math.max(0, Math.min(y, windowHeight - elementHeight));

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {
                window.updateIframePointerEvents(true);
                document.body.classList.remove('dragging');
            }
        }
    }).resizable({
        edges: { left: true, right: true, bottom: true, top: false },
        listeners: {
            start(event) {
                const iframeWindow = event.target.closest('.iframe-window');
                if (iframeWindow.classList.contains('maximized')) {
                    event.interactable.stop();
                    return;
                }
                window.updateIframePointerEvents(false);
                window.bringToFront(iframeWindow);
                document.body.classList.add('dragging');
            },
            move(event) {
                let { x, y } = event.target.dataset;

                x = (parseFloat(x) || 0) + event.deltaRect.left;
                y = (parseFloat(y) || 0) + event.deltaRect.top;

                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                const newWidth = Math.min(event.rect.width, windowWidth - x);
                const newHeight = Math.min(event.rect.height, windowHeight - y);

                Object.assign(event.target.style, {
                    width: `${newWidth}px`,
                    height: `${newHeight}px`,
                    transform: `translate(${x}px, ${y}px)`
                });

                event.target.setAttribute('data-x', x);
                event.target.setAttribute('data-y', y);
            },
            end(event) {
                window.updateIframePointerEvents(true);
                document.body.classList.remove('dragging');
            }
        }
    });
};

window.centerWindow = (iframeWindow) => {
    const { innerWidth, innerHeight } = window;
    const width = 800;
    const height = 600;

    const x = (innerWidth - width) / 2;
    const y = (innerHeight - height) / 4;

    iframeWindow.style.width = `${width}px`;
    iframeWindow.style.height = `${height}px`;
    iframeWindow.style.transform = `translate(${x}px, ${y}px)`;
    iframeWindow.setAttribute('data-x', x);
    iframeWindow.setAttribute('data-y', y);
};
