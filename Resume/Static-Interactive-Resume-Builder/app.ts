document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the visibility of a section
    function toggleSection(buttonId: string, sectionClass: string, buttonTextShow: string, buttonTextHide: string) {
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        const section = document.querySelector(sectionClass) as HTMLDivElement;

        if (button && section) {
            button.addEventListener('click', () => {
                section.classList.toggle('hidden');
                button.textContent = section.classList.contains('hidden') ? buttonTextShow : buttonTextHide;
            });
        }
    }

    // Add interactivity to the "Skills" section
    toggleSection('toggle-skills', '.skills-content', 'Show Skills', 'Hide Skills');
});
