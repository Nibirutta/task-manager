const sidebarBtn = document.getElementById('sidebar-btn');
const sidebar = document.getElementById('sidebar');

sidebarBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('expanded')) {
        sidebar.classList.remove('expanded');
    } else {
        sidebar.classList.add('expanded');
    }
});