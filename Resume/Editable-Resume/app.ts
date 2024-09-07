// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeSection = document.getElementById('resume') as HTMLDivElement;

    // Function to create editable content
    function makeEditable(element: HTMLElement) {
        element.addEventListener('click', () => {
            if (element.isContentEditable) {
                element.contentEditable = 'false';
                element.classList.remove('editable');
            } else {
                element.contentEditable = 'true';
                element.classList.add('editable');
                element.focus();
            }
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting traditionally

        // Get form field values
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const contact = (document.getElementById('contact') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim());

        // Validate input fields
        if (!name || !email || !contact || !education || !workExperience || !skills.length) {
            alert('Please fill out all fields correctly.');
            return;
        }

        // Generate the resume content
        resumeSection.innerHTML = `
            <div>
                <h3>${name}</h3>
                <p class="editable"><strong>Email:</strong> ${email}</p>
                <p class="editable"><strong>Contact Number:</strong> ${contact}</p>
                <h4 class="editable">Education</h4>
                <p class="editable">${education}</p>
                <h4 class="editable">Work Experience</h4>
                <p class="editable">${workExperience}</p>
                <h4 class="editable">Skills</h4>
                <ul class="editable">
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        `;

        // Make all generated resume sections editable
        const editableElements = resumeSection.querySelectorAll('.editable');
        editableElements.forEach(makeEditable);
    });
});
