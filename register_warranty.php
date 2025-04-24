<?php
// Database connection
$host = "localhost";  // usually localhost
$username = "root";
$password = "1234";
$database = "Biotrack";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $deviceModel = $_POST["deviceModel"];
    $serialNumber = $_POST["serialNumber"];
    $purchaseDate = $_POST["purchaseDate"];
    
    // File upload handling
    $file = $_FILES["purchaseProof"];
    $fileName = basename($file["name"]);
    $targetDir = "uploads/";
    $targetFilePath = $targetDir . uniqid() . "_" . $fileName;
    
    $allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!in_array($file["type"], $allowedTypes)) {
        die("Invalid file type. Only PDF, JPG, and PNG are allowed.");
    }
    
    if ($file["size"] > 5 * 1024 * 1024) {
        die("File is too large. Maximum size is 5MB.");
    }

    if (!move_uploaded_file($file["tmp_name"], $targetFilePath)) {
        die("There was an error uploading the file.");
    }

    // Map device model to full enum values
    $model = $deviceModel === "basic" ? "HealthGuard Basix" : "HealthGuard Pro";

    // Insert into warranty_registrations table
    $stmt = $conn->prepare("INSERT INTO warranty_registrations (device_model, serial_number, purchase_date, receipt_filename) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $model, $serialNumber, $purchaseDate, $targetFilePath);

if ($stmt->execute()) {
    echo "<script>alert('Warranty registered successfully!'); window.location.href = 'warranty.html';</script>";
} else {
    $error = addslashes($stmt->error); // Escape any quotes
    echo "<script>alert('Error: $error'); window.location.href = 'warranty.html';</script>";
}


    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>


