$(document).ready(function () {
  // Get the current year and update the footer
  const currentYear = new Date().getFullYear();
  $("#currentYear").text(currentYear);

  // Initialize or retrieve data array from localStorage
  let data = JSON.parse(localStorage.getItem('inputData')) || [];

  // Form submission handling
  $("#data-form").submit(function (e) {
    e.preventDefault();

    // Get form input values
    const fullName = $("#fullName").val();
    const email = $("#email").val();
    const phoneNumber = $("#phoneNumber").val();

    // Check for empty fields
    if (fullName && email && phoneNumber) {
      // Validate email
      const validEmailSuffix = "@epoka.edu.al";
      if (email.endsWith(validEmailSuffix)) {
        // Check if the phone number contains only numeric characters
        if (/^\d+$/.test(phoneNumber)) {
          // Add data to the array
          data.push({ fullName, email, phoneNumber });
          // Update localStorage with the new data
          localStorage.setItem('inputData', JSON.stringify(data));

          // Show success alert
          showAlert("Data Added Successfully", "success");

          // Clear form fields
          $("#fullName, #email, #phoneNumber").val("");
        } else {
          // Show warning alert for non-numeric characters in the phone number
          showAlert("Phone Number should contain only numeric characters", "warning");
        }
      } else {
        // Show warning alert for invalid email suffix
        showAlert("Email must end with @epoka.edu.al", "warning");
      }
    } else {
      // Show danger alert for empty fields
      showAlert("Please Fill All Fields", "danger");
    }
  });

  // Function to show alerts
  function showAlert(message, className) {
    const alertDiv = $("<div>").addClass(`alert alert-${className}`).text(message);
    $("#alerts-container").prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  }
});
