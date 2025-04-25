<?php
require_once 'config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $model      = $_POST['device_model'];
    $serial     = $_POST['serial_number'];
    $date       = $_POST['purchase_date'];
    $receipt    = $_FILES['receipt']['name'];
    $uploadPath = "uploads/" . basename($receipt);
    move_uploaded_file($_FILES['receipt']['tmp_name'], $uploadPath);

    $stmt = $pdo->prepare("INSERT INTO warranty_registrations (device_model, serial_number, purchase_date, receipt_filename) VALUES (?, ?, ?, ?)");
    $stmt->execute([$model, $serial, $date, $receipt]);

    echo "Warranty registered successfully!";
}
?>
