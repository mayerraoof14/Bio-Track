<?php
require_once 'config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $model      = $_POST['device_model'];
    $serial     = $_POST['serial_number'];
    $date       = $_POST['purchase_date'];

    if (isset($_FILES['receipt']) && $_FILES['receipt']['error'] === 0) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = uniqid() . '_' . basename($_FILES['receipt']['name']);
        $uploadPath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['receipt']['tmp_name'], $uploadPath)) {
            // Insert into database
            $stmt = $pdo->prepare("INSERT INTO warranty_registrations (device_model, serial_number, purchase_date, receipt_filename) VALUES (?, ?, ?, ?)");
            $stmt->execute([$model, $serial, $date, $fileName]);

            echo json_encode(["success" => true, "message" => "Warranty registered successfully!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to upload receipt."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Receipt file missing or upload error."]);
    }
}
?>
