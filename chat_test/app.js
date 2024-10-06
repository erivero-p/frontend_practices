document.addEventListener('DOMContentLoaded', function() {
    const friendDrawers = document.querySelectorAll('.friend-drawer');

    friendDrawers.forEach(function(drawer) {
        drawer.addEventListener('click', function() {
            // Remove 'active' class from all drawers
            friendDrawers.forEach(function(d) {
                d.classList.remove('active');
            });
            // Add 'active' class to the clicked drawer
            this.classList.add('active');
        });
    });
});