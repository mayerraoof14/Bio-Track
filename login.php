<?php
session_start();
require 'config/db.php';

header('Content-Type: application/json');
// Set the content type of the response to JSON, indicating that the response will be in JSON format


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT id, full_name, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(); // This will return the user data as an associative array, or false if no results are found


    if ($user && password_verify($password, $user['password'])) { // Check if a user was found and if the provided password matches the hashed password in the database
        $_SESSION['user_id'] = $user['id'];     // Store the user's ID in the session for later use )
        $_SESSION['full_name'] = $user['full_name']; // Store the user's full name in the session for later use (e.g., to personalize the user experience)


        echo json_encode([
            'success' => true,
            'user_id' => $user['id'],
            'full_name' => $user['full_name']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
}
?>
