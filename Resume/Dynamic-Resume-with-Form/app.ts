// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeSection = document.getElementById('resume') as HTMLDivElement;

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
            <h3>${name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contact}</p>
            <h4>Education</h4>
            <p>${education}</p>
            <h4>Work Experience</h4>
            <p>${workExperience}</p>
            <h4>Skills</h4>
            <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        `;
    });
});
