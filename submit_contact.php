<?php
$host = "localhost";       // Change if using a remote DB
$user = "root";            // Your DB username
$pass = "1234";                // Your DB password
$db   = "Biotrack";   // Replace with your DB name

// Connect to DB
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get and sanitize form data
$name = $conn->real_escape_string($_POST['name']);
$email = $conn->real_escape_string($_POST['email']);
$message = $conn->real_escape_string($_POST['message']);

// Insert into DB
$sql = "INSERT INTO contact_us (name, email, message) VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "<script>
        alert('Message sent successfully!');
        window.location.href = 'index.html#contact';
    </script>";
} else {
    $error = addslashes($conn->error); // Escape quotes to avoid breaking JS
    echo "<script>
        alert('Error: $error');
        window.location.href = 'index.html#contact';
    </script>";
}


$conn->close();
?>
