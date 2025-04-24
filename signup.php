<?php
$host = "localhost";
$dbname = "Biotrack";
$username = "root";
$password = "1234";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize and retrieve inputs
$fullName = htmlspecialchars(trim($_POST['full_name']));
$email = htmlspecialchars(trim($_POST['email']));
$password = $_POST['password'];
$confirmPassword = $_POST['confirm_password'];

// Check if passwords match
if ($password !== $confirmPassword) {
    die("Passwords do not match");
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert into database
$stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $fullName, $email, $hashedPassword);

if ($stmt->execute()) {
    echo "<script>
        alert('Account created successfully!');
        window.location.href = 'login.html';
    </script>";
} else {
    echo "<script>
        alert('Error: " . $stmt->error . "');
        window.history.back(); // Or redirect somewhere else
    </script>";
}


$stmt->close();
$conn->close();
?>
