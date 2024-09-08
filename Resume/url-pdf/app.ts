document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeSection = document.getElementById('resume') as HTMLDivElement;
    const generatedUrlLink = document.getElementById('generated-url') as HTMLAnchorElement;
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

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

    // Function to generate a unique URL with form data as query parameters
    function generateUniqueUrl(name: string, email: string, contact: string, education: string, workExperience: string, skills: string[]): string {
        const baseUrl = window.location.origin + window.location.pathname; // Current page's base URL
        const params = new URLSearchParams({
            name,
            email,
            contact,
            education,
            workExperience,
            skills: skills.join(','), // Convert skills array to comma-separated string
        });
        return `${baseUrl}?${params.toString()}`; // Return the generated URL
    }

    // Function to download the resume section as a PDF using jsPDF
    function downloadPdf() {
        const { jsPDF } = window.jspdf; // Access jsPDF from the imported library
        const doc = new jsPDF(); // Create a new jsPDF instance

        // Get the values from the generated resume section
        const name = resumeSection.querySelector('h3')?.textContent;
        const email = resumeSection.querySelector('p:nth-of-type(1)')?.textContent;
        const contact = resumeSection.querySelector('p:nth-of-type(2)')?.textContent;
        const education = resumeSection.querySelector('p:nth-of-type(3)')?.textContent;
        const workExperience = resumeSection.querySelector('p:nth-of-type(4)')?.textContent;
        const skillsList = Array.from(resumeSection.querySelectorAll('ul li')).map(li => li.textContent).join(', ');

        // Add content to the PDF
        let yOffset = 10;
        if (name) {
            doc.text(`Name: ${name}`, 10, yOffset);
            yOffset += 10;
        }
        if (email) {
            doc.text(`Email: ${email}`, 10, yOffset);
            yOffset += 10;
        }
        if (contact) {
            doc.text(`Contact: ${contact}`, 10, yOffset);
            yOffset += 10;
        }
        if (education) {
            doc.text(`Education: ${education}`, 10, yOffset);
            yOffset += 10;
        }
        if (workExperience) {
            doc.text(`Work Experience: ${workExperience}`, 10, yOffset);
            yOffset += 10;
        }
        if (skillsList) {
            doc.text(`Skills: ${skillsList}`, 10, yOffset);
            yOffset += 10;
        }

        // Save the PDF
        doc.save('resume.pdf');
    }

    // Listen for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent traditional form submission

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

        // Generate the resume content dynamically
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

        // Generate a unique URL with the form data
        const uniqueUrl = generateUniqueUrl(name, email, contact, education, workExperience, skills);
        generatedUrlLink.href = uniqueUrl;
        generatedUrlLink.textContent = "Copy your unique URL";

        // Enable the PDF download button after resume generation
        downloadPdfButton.style.display = 'inline-block';
    });

    // Add event listener to the download PDF button
    downloadPdfButton.addEventListener('click', downloadPdf);
});
