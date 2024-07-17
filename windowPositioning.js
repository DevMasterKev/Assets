// windowPositioning.js

export function positionWindow(iframeWindow, x, y) {
    iframeWindow.style.left = `${x}px`;
    iframeWindow.style.top = `${y}px`;
}
