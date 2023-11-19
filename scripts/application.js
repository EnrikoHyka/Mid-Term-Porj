$(document).ready(function () {
  // Get the current year and update the footer
  const currentYear = new Date().getFullYear();
  $("#currentYear").text(currentYear);

  // Retrieve data array from localStorage
  let data = JSON.parse(localStorage.getItem('inputData')) || [];

  // Display data in the table
  displayData(data);

  function displayData(data) {
    const tbody = $("#data-table tbody");
    tbody.empty(); // Clear existing data

    data.forEach(item => {
      const row = $("<tr>").html(`
        <td>${item.fullName}</td>
        <td>${item.email}</td>
        <td>${item.phoneNumber}</td>
        <td>
          <button type="button" class="btn btn-warning edit" data-toggle="modal" data-target="#editDataModal">Edit</button>
          <button type="button" class="btn btn-danger delete">Delete</button>
        </td>
      `);
      tbody.append(row);
    });

    // Function to show the edit modal
    function showEditModal(fullName, email, phoneNumber) {
      // Populate the modal with data
      $("#fullName-modal").val(fullName);
      $("#email-modal").val(email);
      $("#phoneNumber-modal").val(phoneNumber);

      // Show the modal
      $("#modul").show();
    }

    // Add event listener for the Edit button
    $("#data-table tbody").on("click", ".edit", function () {
      const row = $(this).closest("tr");
      const fullName = row.children().eq(0).text();
      const email = row.children().eq(1).text();
      const phoneNumber = row.children().eq(2).text();

      // Call the function to show the edit modal
      showEditModal(fullName, email, phoneNumber);
    });

    // Add event listener for the form inside the modal
    // Add event listener for the Close button in the modal
    $("#closeModal").click(function () {
      $("#modul").hide();
    });

    $("#data-form-modal").submit(function (e) {
      e.preventDefault();

      // Get the edited data
      const editedFullName = $("#fullName-modal").val();
      let editedEmail = $("#email-modal").val();
      let editedPhoneNumber = $("#phoneNumber-modal").val();

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editedEmail)) {
        showAlert("Invalid Email Format", "warning");
        return; // Stop further processing if email is invalid
      }

      // Validate phone number format
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(editedPhoneNumber)) {
        showAlert("Phone Number must contain only numbers", "warning");
        return; // Stop further processing if phone number is invalid
      }

      // Additional validation for email
      const validEmailDomain = "@epoka.edu.al";
      if (!editedEmail.endsWith(validEmailDomain)) {
        showAlert("Email must end with @epoka.edu.al", "warning");
        return; // Stop further processing if email is invalid
      }

      // Find the index of the row in the table
      const rowIndex = $("#data-table tbody tr").index($("#data-table tbody tr:contains('" + editedFullName + "')"));

      // Update the row data
      $("#data-table tbody tr").eq(rowIndex).children().eq(0).text(editedFullName);
      $("#data-table tbody tr").eq(rowIndex).children().eq(1).text(editedEmail);
      $("#data-table tbody tr").eq(rowIndex).children().eq(2).text(editedPhoneNumber);

      // Update data array and localStorage
      data[rowIndex] = { fullName: editedFullName, email: editedEmail, phoneNumber: editedPhoneNumber };
      localStorage.setItem('inputData', JSON.stringify(data));

      // Close the modal
      $("#modul").hide();

      // Show an alert or perform other actions as needed
      showAlert("Data Edited Successfully", "success");
    });

    tbody.on("click", ".delete", function () {
      const deletedFullName = $(this).closest("tr").children().eq(0).text();

      // Update data array and localStorage after deletion
      data = data.filter(item => item.fullName !== deletedFullName);
      localStorage.setItem('inputData', JSON.stringify(data));

      // Remove the row from the table
      $(this).closest("tr").remove();

      showAlert("Data Deleted Successfully", "danger");
    });
  }
  
 // Function to show alerts
  function showAlert(message, className) {
    const alertDiv = $("<div>").addClass(`alert alert-${className}`).text(message);
    $("#alerts-container").prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  }
});
