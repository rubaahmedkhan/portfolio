document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle the visibility of a section
    function toggleSection(buttonId, sectionClass, buttonTextShow, buttonTextHide) {
        var button = document.getElementById(buttonId);
        var section = document.querySelector(sectionClass);
        if (button && section) {
            button.addEventListener('click', function () {
                section.classList.toggle('hidden');
                button.textContent = section.classList.contains('hidden') ? buttonTextShow : buttonTextHide;
            });
        }
    }
    // Add interactivity to the "Skills" section
    toggleSection('toggle-skills', '.skills-content', 'Show Skills', 'Hide Skills');
});
