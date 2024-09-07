// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeSection = document.getElementById('resume');
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
        resumeSection.innerHTML = "\n            <h3>".concat(name, "</h3>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Contact Number:</strong> ").concat(contact, "</p>\n            <h4>Education</h4>\n            <p>").concat(education, "</p>\n            <h4>Work Experience</h4>\n            <p>").concat(workExperience, "</p>\n            <h4>Skills</h4>\n            <ul>\n                ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n            </ul>\n        ");
    });
});
