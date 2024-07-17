document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dock-item').forEach(item => {
      item.addEventListener('click', function(event) {
        event.preventDefault(); // Verhindert Standardverhalten von Links
        event.stopPropagation(); // Verhindert, dass das Klick-Event weiter propagiert
  
        hideAllDockFolders(); // Versteckt alle Dock-Folders
  
        // Zeigt den spezifischen Dock-Folder basierend auf dem data-folder Attribut
        const folderId = this.getAttribute('data-folder');
        const folder = document.getElementById(folderId);
        if (folder) {
          folder.classList.add('visible'); // Ändert die Sichtbarkeit
        }
      });
    });
  
    // Event Listener für das Ausblenden der Folders, wenn außerhalb geklickt wird
    document.addEventListener('click', hideAllDockFolders);
  
    // Event Listener für das Ausblenden der Folders, wenn auf andere Buttons geklickt wird
    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('click', hideAllDockFolders);
    });
  });
  
  function hideAllDockFolders() {
    document.querySelectorAll('.dock-folder.visible').forEach(folder => {
      folder.classList.remove('visible');
    });
  }





