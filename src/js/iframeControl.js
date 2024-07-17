/* document.addEventListener('DOMContentLoaded', () => {
    let zIndexOfTopWindow = 1;

    const bringToFront = (element) => {
        element.style.zIndex = ++zIndexOfTopWindow;
    };

    const updateIframePointerEvents = (enable) => {
        document.querySelectorAll('.iframe-window iframe').forEach(iframe => {
            iframe.style.pointerEvents = enable ? 'auto' : 'none';
        });
    };

    const initializeDraggableAndResizable = (element) => {
        interact(element).draggable({
            listeners: {
                start(event) {
                    const iframeWindow = event.target;
                    bringToFront(iframeWindow);
                    updateIframePointerEvents(false);
                },
                move(event) {
                    const target = event.target;
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    x = Math.max(0, x);
                    y = Math.max(0, y);

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end(event) {
                    updateIframePointerEvents(true);
                }
            }
        }).resizable({
            edges: { left: true, right: true, bottom: true, top: false },
            listeners: {
                start(event) {
                    updateIframePointerEvents(false);
                },
                move(event) {
                    let { x, y } = event.target.dataset;

                    x = (parseFloat(x) || 0) + event.deltaRect.left;
                    y = (parseFloat(y) || 0) + event.deltaRect.top;

                    Object.assign(event.target.style, {
                        width: `${event.rect.width}px`,
                        height: `${event.rect.height}px`,
                        transform: `translate(${x}px, ${y}px)`
                    });

                    event.target.setAttribute('data-x', x);
                    event.target.setAttribute('data-y', y);
                },
                end(event) {
                    updateIframePointerEvents(true);
                }
            }
        });
    };

    const setupSidebarLinks = (context = document) => {
        const sidebarLinks = context.querySelectorAll('.window-sidebar a');
        const iframes = context.querySelectorAll('.iframe-area iframe');

        sidebarLinks.forEach(link => {
            link.removeEventListener('click', handleSidebarLinkClick); // Vermeidet doppelte Event-Listener
            link.addEventListener('click', handleSidebarLinkClick);
        });

        function handleSidebarLinkClick(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');

            iframes.forEach(iframe => {
                iframe.style.display = 'none';
            });

            const targetIframe = context.querySelector(`#${targetId}`);
            if (targetIframe) {
                targetIframe.style.display = 'block';
            }
        }
    }

    const addWindowButtonListeners = (element) => {
        element.querySelectorAll('.close-btn, .minimize-btn, .maximize-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const iframeWindow = btn.closest('.iframe-window');
                if (btn.classList.contains('close-btn')) {
                    iframeWindow.style.display = 'none';
                } else if (btn.classList.contains('minimize-btn')) {
                    minimizeWindow(iframeWindow);
                } else if (btn.classList.contains('maximize-btn')) {
                    maximizeWindow(iframeWindow);
                }
            });
        });
    };

    const minimizeWindow = (iframeWindow) => {
        const MINIMIZED_WIDTH = 200;
        const MINIMIZED_HEIGHT = 50;
        iframeWindow.style.width = `${MINIMIZED_WIDTH}px`;
        iframeWindow.style.height = `${MINIMIZED_HEIGHT}px`;
        iframeWindow.style.left = `${window.innerWidth - MINIMIZED_WIDTH}px`;
        iframeWindow.style.top = `${window.innerHeight - MINIMIZED_HEIGHT}px`;
    };


const maximizeWindow = (iframeWindow) => {
    const closeBtn = iframeWindow.querySelector('.close-btn');
    const minimizeBtn = iframeWindow.querySelector('.minimize-btn');
    const duplicateBtn = iframeWindow.querySelector('.window-duplicate-btn'); // Stellen Sie sicher, dass dieser Selektor mit Ihrer HTML-Struktur übereinstimmt

    if (!iframeWindow.classList.contains('maximized')) {
        // Fenster maximieren
        iframeWindow.style.width = '100%';
        iframeWindow.style.height = '100vh';
        iframeWindow.style.left = '0';
        iframeWindow.style.top = '0';
        iframeWindow.style.zIndex = '1000';
        iframeWindow.classList.add('maximized');

        // Buttons deaktivieren und in Grau ändern
        [closeBtn, minimizeBtn, duplicateBtn].forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.backgroundColor = 'grey';
        });
    } else {
        // Fenster auf ursprüngliche Größe zurücksetzen
        iframeWindow.style.width = '';
        iframeWindow.style.height = '';
        iframeWindow.style.left = '';
        iframeWindow.style.top = '';
        iframeWindow.style.zIndex = '';
        iframeWindow.classList.remove('maximized');

        // Buttons aktivieren und Farbe zurücksetzen
        [closeBtn, minimizeBtn, duplicateBtn].forEach(btn => {
            btn.style.pointerEvents = '';
            // Stellen Sie sicher, dass Sie die ursprünglichen Farben Ihrer Buttons hier wiederherstellen
            btn.style.backgroundColor = ''; // Entfernt den Inline-Style und verwendet wieder CSS-Styles
        });
    }
};

    let isMaximized = false;

    document.querySelectorAll('.folder-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const iframeWindow = document.getElementById(targetId);
            if (iframeWindow) {
                iframeWindow.style.display = 'block';
                bringToFront(iframeWindow);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('window-duplicate-btn')) {
            const iframeWindow = event.target.closest('.iframe-window');
            cloneAndOffsetWindow(iframeWindow);
        }
    });

    const cloneAndOffsetWindow = (iframeWindow) => {
        const clone = iframeWindow.cloneNode(true);
        let x = parseFloat(iframeWindow.getAttribute('data-x')) || 0;
        let y = parseFloat(iframeWindow.getAttribute('data-y')) || 0;

        x += 20;
        y += 20;

        clone.setAttribute('data-x', x);
        clone.setAttribute('data-y', y);
        clone.style.transform = `translate(${x}px, ${y}px)`;
        document.body.appendChild(clone);
        bringToFront(clone);
        initializeDraggableAndResizable(clone);
        addWindowButtonListeners(clone);
    };

    initializeDraggableAndResizable('.iframe-window');
    addWindowButtonListeners(document);
    setupSidebarLinks(document);
});
 */


document.addEventListener('DOMContentLoaded', () => {
    let zIndexOfTopWindow = 1;

    const bringToFront = (element) => {
        element.style.zIndex = ++zIndexOfTopWindow;
    };

    const updateIframePointerEvents = (enable) => {
        document.querySelectorAll('.iframe-window iframe').forEach(iframe => {
            iframe.style.pointerEvents = enable ? 'auto' : 'none';
        });
    };

    const initializeDraggableAndResizable = (element) => {
        interact(element).draggable({
            listeners: {
                start(event) {
                    const iframeWindow = event.target;
                    // Überprüfen, ob das Fenster maximiert ist
                    if (iframeWindow.classList.contains('maximized')) {
                        // Verhindert das Dragging, wenn maximiert
                        event.interactable.stop();
                        return;
                    }
                    bringToFront(iframeWindow);
                    updateIframePointerEvents(false);
                },
                move(event) {
                    const target = event.target;
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
                    x = Math.max(0, x);
                    y = Math.max(0, y);
    
                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end(event) {
                    updateIframePointerEvents(true);
                }
            }
        }).resizable({
            edges: { left: true, right: true, bottom: true, top: false },
            listeners: {
                start(event) {
                    const iframeWindow = event.target.closest('.iframe-window');
                    // Überprüfen, ob das Fenster maximiert ist
                    if (iframeWindow.classList.contains('maximized')) {
                        // Verhindert das Resizing, wenn maximiert
                        event.interactable.stop();
                        return;
                    }
                    updateIframePointerEvents(false);
                },
                move(event) {
                    let { x, y } = event.target.dataset;
    
                    x = (parseFloat(x) || 0) + event.deltaRect.left;
                    y = (parseFloat(y) || 0) + event.deltaRect.top;
    
                    Object.assign(event.target.style, {
                        width: `${event.rect.width}px`,
                        height: `${event.rect.height}px`,
                        transform: `translate(${x}px, ${y}px)`
                    });
    
                    event.target.setAttribute('data-x', x);
                    event.target.setAttribute('data-y', y);
                },
                end(event) {
                    updateIframePointerEvents(true);
                }
            }
        });
    };
    

    const setupSidebarLinks = (context = document) => {
        const sidebarLinks = context.querySelectorAll('.window-sidebar a');
        const iframes = context.querySelectorAll('.iframe-area iframe');

        sidebarLinks.forEach(link => {
            link.removeEventListener('click', handleSidebarLinkClick); // Vermeidet doppelte Event-Listener
            link.addEventListener('click', handleSidebarLinkClick);
        });

        function handleSidebarLinkClick(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');

            iframes.forEach(iframe => {
                iframe.style.display = 'none';
            });

            const targetIframe = context.querySelector(`#${targetId}`);
            if (targetIframe) {
                targetIframe.style.display = 'block';
            }
        }
    }

    const addWindowButtonListeners = (element) => {
        element.querySelectorAll('.close-btn, .minimize-btn, .maximize-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const iframeWindow = btn.closest('.iframe-window');
                if (btn.classList.contains('close-btn')) {
                    iframeWindow.style.display = 'none';
                } else if (btn.classList.contains('minimize-btn')) {
                    minimizeWindow(iframeWindow);
                } else if (btn.classList.contains('maximize-btn')) {
                    maximizeWindow(iframeWindow);
                }
            });
        });
    };

    const minimizeWindow = (iframeWindowId) => {
        const iframeWindow = document.getElementById(iframeWindowId);
        const dock = document.querySelector('.dock ul');
        const dockFolder = document.getElementById('dock-folder-children'); // ID des Dock-Folders, von dem die Icons stammen
        const folderItem = dockFolder.querySelector(`.folder-item[data-target="${iframeWindowId}"]`); // Findet das entsprechende Element im Dock-Folder

        if (!folderItem) {
            console.error('Kein passendes Dock-Icon gefunden für:', iframeWindowId);
            return;
        }

        const iconSrc = folderItem.querySelector('img').src;
        const iconAlt = folderItem.querySelector('img').alt;

        // Erstelle ein neues Icon im Dock für das minimierte Fenster
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');

        // Konfiguriere das Icon
        img.src = iconSrc; // Verwendet das Icon aus dem Dock-Folder
        img.alt = iconAlt; // Verwendet den Alt-Text des Icons aus dem Dock-Folder
        a.appendChild(img);
        li.appendChild(a);

        // Füge das Icon zum Dock hinzu
        dock.appendChild(li);

        // Event-Listener zum Wiederherstellen des Fensters beim Klicken auf das Dock-Icon
        a.addEventListener('click', (e) => {
            e.preventDefault();
            // Zeige das Fenster wieder an und entferne das Icon aus dem Dock
            iframeWindow.style.display = 'block';
            dock.removeChild(li);
        });

        // Verstecke das Fenster
        iframeWindow.style.display = 'none';
    };

    document.querySelectorAll('.minimize-btn').forEach(button => {
        button.addEventListener('click', () => {
            const iframeWindow = button.closest('.iframe-window');
            const iframeWindowId = iframeWindow.id;
            minimizeWindow(iframeWindowId);
        });
    });

    const maximizeWindow = (iframeWindow) => {
        const closeBtn = iframeWindow.querySelector('.close-btn');
        const minimizeBtn = iframeWindow.querySelector('.minimize-btn');
        const duplicateBtn = iframeWindow.querySelector('.window-duplicate-btn');
    
        if (!iframeWindow.classList.contains('maximized')) {
            // Fenster maximieren
            iframeWindow.style.width = '100%';
            iframeWindow.style.height = '100vh';
            iframeWindow.style.left = '0';
            iframeWindow.style.top = '0';
            iframeWindow.style.transform = 'translate(0, 0)'; // Setzt die Transform-Eigenschaft zurück
            iframeWindow.style.zIndex = '1000';
            iframeWindow.classList.add('maximized');
    
            // Deaktiviere Draggable und Resizable
            interact(iframeWindow).draggable({ enabled: false }).resizable({ enabled: false });
    
            // Buttons deaktivieren und in Grau ändern
            [closeBtn, minimizeBtn, duplicateBtn].forEach(btn => {
                btn.style.pointerEvents = 'none';
                btn.style.backgroundColor = 'grey';
            });
        } else {
            // Fenster auf ursprüngliche Größe zurücksetzen
            iframeWindow.style.width = '';
            iframeWindow.style.height = '';
            iframeWindow.style.left = '';
            iframeWindow.style.top = '';
            iframeWindow.style.transform = ''; // Entfernt die Transform-Eigenschaft
            iframeWindow.style.zIndex = '';
            iframeWindow.classList.remove('maximized');
    
            // Aktiviere Draggable und Resizable
            interact(iframeWindow).draggable({ enabled: true }).resizable({ enabled: true });
    
            // Buttons aktivieren und Farbe zurücksetzen
            [closeBtn, minimizeBtn, duplicateBtn].forEach(btn => {
                btn.style.pointerEvents = '';
                btn.style.backgroundColor = ''; // Entfernt den Inline-Style und verwendet wieder CSS-Styles
            });
        }
    };
    

    let isMaximized = false;

    document.querySelectorAll('.folder-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const iframeWindow = document.getElementById(targetId);
            if (iframeWindow) {
                iframeWindow.style.display = 'block';
                bringToFront(iframeWindow);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('window-duplicate-btn')) {
            const iframeWindow = event.target.closest('.iframe-window');
            cloneAndOffsetWindow(iframeWindow);
        }
    });

    const cloneAndOffsetWindow = (iframeWindow) => {
        const clone = iframeWindow.cloneNode(true);
        let x = parseFloat(iframeWindow.getAttribute('data-x')) || 0;
        let y = parseFloat(iframeWindow.getAttribute('data-y')) || 0;

        x += 20;
        y += 20;

        clone.setAttribute('data-x', x);
        clone.setAttribute('data-y', y);
        clone.style.transform = `translate(${x}px, ${y}px)`;
        document.body.appendChild(clone);
        bringToFront(clone);
        initializeDraggableAndResizable(clone);
        addWindowButtonListeners(clone);
        setupSidebarLinks(clone);
    };

    initializeDraggableAndResizable('.iframe-window');
    addWindowButtonListeners(document);
    setupSidebarLinks(document);
});


