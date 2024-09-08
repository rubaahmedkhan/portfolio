document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeSection = document.getElementById('resume');
    var generatedUrlLink = document.getElementById('generated-url');
    var downloadPdfButton = document.getElementById('download-pdf');
    // Function to create editable content
    function makeEditable(element) {
        element.addEventListener('click', function () {
            if (element.isContentEditable) {
                element.contentEditable = 'false';
                element.classList.remove('editable');
            }
            else {
                element.contentEditable = 'true';
                element.classList.add('editable');
                element.focus();
            }
        });
    }
    // Function to generate a unique URL with form data as query parameters
    function generateUniqueUrl(name, email, contact, education, workExperience, skills) {
        var baseUrl = window.location.origin + window.location.pathname; // Current page's base URL
        var params = new URLSearchParams({
            name: name,
            email: email,
            contact: contact,
            education: education,
            workExperience: workExperience,
            skills: skills.join(','), // Convert skills array to comma-separated string
        });
        return "".concat(baseUrl, "?").concat(params.toString()); // Return the generated URL
    }
    // Function to download the resume section as a PDF using jsPDF
    function downloadPdf() {
        var _a, _b, _c, _d, _e;
        var jsPDF = window.jspdf.jsPDF; // Access jsPDF from the imported library
        var doc = new jsPDF(); // Create a new jsPDF instance
        // Get the values from the generated resume section
        var name = (_a = resumeSection.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent;
        var email = (_b = resumeSection.querySelector('p:nth-of-type(1)')) === null || _b === void 0 ? void 0 : _b.textContent;
        var contact = (_c = resumeSection.querySelector('p:nth-of-type(2)')) === null || _c === void 0 ? void 0 : _c.textContent;
        var education = (_d = resumeSection.querySelector('p:nth-of-type(3)')) === null || _d === void 0 ? void 0 : _d.textContent;
        var workExperience = (_e = resumeSection.querySelector('p:nth-of-type(4)')) === null || _e === void 0 ? void 0 : _e.textContent;
        var skillsList = Array.from(resumeSection.querySelectorAll('ul li')).map(function (li) { return li.textContent; }).join(', ');
        // Add content to the PDF
        var yOffset = 10;
        if (name) {
            doc.text("Name: ".concat(name), 10, yOffset);
            yOffset += 10;
        }
        if (email) {
            doc.text("Email: ".concat(email), 10, yOffset);
            yOffset += 10;
        }
        if (contact) {
            doc.text("Contact: ".concat(contact), 10, yOffset);
            yOffset += 10;
        }
        if (education) {
            doc.text("Education: ".concat(education), 10, yOffset);
            yOffset += 10;
        }
        if (workExperience) {
            doc.text("Work Experience: ".concat(workExperience), 10, yOffset);
            yOffset += 10;
        }
        if (skillsList) {
            doc.text("Skills: ".concat(skillsList), 10, yOffset);
            yOffset += 10;
        }
        // Save the PDF
        doc.save('resume.pdf');
    }
    // Listen for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent traditional form submission
        // Get form field values
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var contact = document.getElementById('contact').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('work-experience').value;
        var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
        // Validate input fields
        if (!name || !email || !contact || !education || !workExperience || !skills.length) {
            alert('Please fill out all fields correctly.');
            return;
        }
        // Generate the resume content dynamically
        resumeSection.innerHTML = "\n            <div>\n                <h3>".concat(name, "</h3>\n                <p class=\"editable\"><strong>Email:</strong> ").concat(email, "</p>\n                <p class=\"editable\"><strong>Contact Number:</strong> ").concat(contact, "</p>\n                <h4 class=\"editable\">Education</h4>\n                <p class=\"editable\">").concat(education, "</p>\n                <h4 class=\"editable\">Work Experience</h4>\n                <p class=\"editable\">").concat(workExperience, "</p>\n                <h4 class=\"editable\">Skills</h4>\n                <ul class=\"editable\">\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </div>\n        ");
        // Make all generated resume sections editable
        var editableElements = resumeSection.querySelectorAll('.editable');
        editableElements.forEach(makeEditable);
        // Generate a unique URL with the form data
        var uniqueUrl = generateUniqueUrl(name, email, contact, education, workExperience, skills);
        generatedUrlLink.href = uniqueUrl;
        generatedUrlLink.textContent = "Copy your unique URL";
        // Enable the PDF download button after resume generation
        downloadPdfButton.style.display = 'inline-block';
    });
    // Add event listener to the download PDF button
    downloadPdfButton.addEventListener('click', downloadPdf);
});
