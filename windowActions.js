window.addWindowButtonListeners = (element) => {
    element.querySelectorAll('.close-btn, .minimize-btn, .maximize-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const iframeWindow = btn.closest('.iframe-window');
            const folderItem = document.querySelector(`.folder-item[data-target="${iframeWindow.id}"]`);
            if (btn.classList.contains('close-btn')) {
                iframeWindow.style.display = 'none';
                if (folderItem) {
                    folderItem.classList.remove('disabled');
                }
            } else if (btn.classList.contains('minimize-btn')) {
                window.minimizeWindow(iframeWindow.id);
            } else if (btn.classList.contains('maximize-btn')) {
                window.maximizeWindow(iframeWindow);
            }
        });
    });
};

window.minimizeWindow = (iframeWindowId) => {
    const iframeWindow = document.getElementById(iframeWindowId);
    const dock = document.querySelector('.dock ul');
    const dockFolder = document.getElementById('dock-folder-children');

    let iconSrc = '';
    let iconAlt = '';
    
    const folderItem = document.querySelector(`.folder-item[data-target="${iframeWindowId}"]`);
    if (folderItem) {
        iconSrc = folderItem.querySelector('img').src;
        iconAlt = folderItem.querySelector('img').alt;
    }

    if (!dock.querySelector(`li[data-target="${iframeWindowId}"]`)) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');

        img.src = iconSrc;
        img.alt = iconAlt;
        a.appendChild(img);
        a.setAttribute('data-tooltip', iconAlt);
        li.appendChild(a);
        li.setAttribute('data-target', iframeWindowId);

        dock.appendChild(li);

        a.addEventListener('click', (e) => {
            e.preventDefault();
            iframeWindow.style.display = 'block';
            dock.removeChild(li);
            if (folderItem) {
                folderItem.classList.add('disabled');
            }
            window.bringToFront(iframeWindow);
        });
    }

    iframeWindow.style.display = 'none';
};


window.maximizeWindow = (iframeWindow) => {
    const closeBtn = iframeWindow.querySelector('.close-btn');
    const minimizeBtn = iframeWindow.querySelector('.minimize-btn');
    const duplicateBtn = iframeWindow.querySelector('.window-duplicate-btn');
    const dock = document.querySelector('.dock');

    if (!iframeWindow.classList.contains('maximized')) {
        iframeWindow.style.width = '100%';
        iframeWindow.style.height = '100vh';
        iframeWindow.style.left = '0';
        iframeWindow.style.top = '0';
        iframeWindow.style.transform = 'translate(0, 0)';
        iframeWindow.style.zIndex = '9999';
        iframeWindow.classList.add('maximized');

        dock.style.visibility = 'hidden';

        interact(iframeWindow).draggable({ enabled: false }).resizable({ enabled: false });

        [closeBtn, minimizeBtn, duplicateBtn].forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.backgroundColor = 'grey';
        });
    } else {
        iframeWindow.style.width = '800px';
        iframeWindow.style.height = '600px';
        iframeWindow.style.left = '';
        iframeWindow.style.top = '';
        iframeWindow.style.transform = '';
        iframeWindow.style.zIndex = ++window.zIndexOfTopWindow;
        iframeWindow.classList.remove('maximized');

        dock.style.visibility = 'visible';

        interact(iframeWindow).draggable({ enabled: true }).resizable({ enabled: true });

        [closeBtn, minimizeBtn, duplicateBtn].forEach(btn => {
            btn.style.pointerEvents = '';
            btn.style.backgroundColor = '';
        });

        window.centerWindow(iframeWindow);
        window.bringToFront(iframeWindow);
    }
};

window.cloneAndOffsetWindow = (iframeWindow) => {
    const clone = iframeWindow.cloneNode(true);
    const newId = 'clone-' + Math.random().toString(36).substr(2, 9);
    clone.id = newId;

    let x = parseFloat(iframeWindow.getAttribute('data-x')) || 0;
    let y = (parseFloat(iframeWindow.getAttribute('data-y')) || 0) + 20;

    x += 20;

    clone.setAttribute('data-x', x);
    clone.setAttribute('data-y', y);
    clone.style.transform = `translate(${x}px, ${y}px)`;

    document.body.appendChild(clone);
    window.bringToFront(clone);
    window.initializeDraggableAndResizable(clone);
    window.addWindowButtonListeners(clone);

    clone.addEventListener('click', () => {
        window.bringToFront(clone);
    });

    clone.querySelector('.iframe-area').addEventListener('click', (e) => {
        e.stopPropagation();
        window.bringToFront(clone);
    });

    const iframe = clone.querySelector('iframe');
    iframe.addEventListener('click', (e) => {
        e.stopPropagation();
        window.bringToFront(clone);
    });

    const minimizeBtn = clone.querySelector('.minimize-btn');
    minimizeBtn.addEventListener('click', () => {
        window.minimizeWindow(newId);
    });

    // Create but hide the cloned folder item
    const originalFolderItem = document.querySelector(`.folder-item[data-target="${iframeWindow.id}"]`);
    if (originalFolderItem) {
        const dockFolder = document.getElementById('dock-folder-children');
        const clonedFolderItem = originalFolderItem.cloneNode(true);
        clonedFolderItem.setAttribute('data-target', newId);
        clonedFolderItem.style.display = 'none';  // Hide the cloned folder item
        dockFolder.appendChild(clonedFolderItem);
    }
};

