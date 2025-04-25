<?php
require 'dp.php';              // your mysqli connection
header('Content-Type: application/json');
session_start();

// validate input
if (empty($_POST['email']) || empty($_POST['password'])) {
    echo json_encode([
      "success" => false,
      "message" => "Email and password are required."
    ]);
    exit;
}

$email    = trim($_POST['email']);
$password = $_POST['password'];

// fetch user by email
if ($stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?")) {
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // verify hashed password
        if (password_verify($password, $user['password'])) {
            // success: set session
            $_SESSION['user_id']   = $user['id'];
            $_SESSION['user_email']= $email;

            echo json_encode([
              "success" => true,
              "user_id" => $user['id']
            ]);
        } else {
            echo json_encode([
              "success" => false,
              "message" => "Invalid email or password."
            ]);
        }
    } else {
        echo json_encode([
          "success" => false,
          "message" => "Invalid email or password."
        ]);
    }

    $stmt->close();
} else {
    // prepare failed
    echo json_encode([
      "success" => false,
      "message" => "Database error: could not prepare statement."
    ]);
}

$conn->close();
