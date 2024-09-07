// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeSection = document.getElementById('resume');
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
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting traditionally
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
        // Generate the resume content
        resumeSection.innerHTML = "\n            <div>\n                <h3>".concat(name, "</h3>\n                <p class=\"editable\"><strong>Email:</strong> ").concat(email, "</p>\n                <p class=\"editable\"><strong>Contact Number:</strong> ").concat(contact, "</p>\n                <h4 class=\"editable\">Education</h4>\n                <p class=\"editable\">").concat(education, "</p>\n                <h4 class=\"editable\">Work Experience</h4>\n                <p class=\"editable\">").concat(workExperience, "</p>\n                <h4 class=\"editable\">Skills</h4>\n                <ul class=\"editable\">\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </div>\n        ");
        // Make all generated resume sections editable
        var editableElements = resumeSection.querySelectorAll('.editable');
        editableElements.forEach(makeEditable);
    });
});
