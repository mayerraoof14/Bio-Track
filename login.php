<?php
session_start();


$host = "localhost";
$dbname = "Biotrack";
$username = "root";
$password = "1234";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error;
    exit;
}

// Check if email and password are provided in POST data
if (!isset($_POST['email']) || !isset($_POST['password'])) {
    echo "Email and password are required.";
    exit;
}

$email = trim($_POST['email']);
$password = $_POST['password'];

// Check if email and password are non-empty
if (empty($email) || empty($password)) {
    echo "Email and password cannot be empty.";
    exit;
}

// Prepare and execute the query
$stmt = $conn->prepare("SELECT id, full_name, password FROM users WHERE email = ?");
if (!$stmt) {
    echo "Error preparing statement: " . $conn->error;
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check if the user exists
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Check if the password matches the stored hash
    if (password_verify($password, $user['password'])) {
        // Password matches, set session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['full_name'] = $user['full_name'];

        // Redirect to index.html
        echo "<script>
            window.location.href = 'index.html';
        </script>";
    } else {
        // Password does not match
        echo "<script>
            alert('Invalid password.');
            window.location.href = 'login.html';
        </script>";
    }
} else {
    // No user found
    echo "<script>
        alert('No account found with that email.');
        window.location.href = 'login.html';
    </script>";
}


$stmt->close();
$conn->close();
?>
