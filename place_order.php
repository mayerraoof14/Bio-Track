<?php
session_start();
require_once 'config/db.php'; // This file should define $pdo (a PDO connection)

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$cartItems = $data['cart'] ?? [];
$shipping = $data['shipping'] ?? [];
$total = $data['total'] ?? 0;

try {
    $pdo->beginTransaction();

    // Insert order
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, total) VALUES (?, ?)");
    $stmt->execute([$_SESSION['user_id'], $total]);
    $orderId = $pdo->lastInsertId();

    // Insert order items
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (?, ?, ?)");
    foreach ($cartItems as $item) {
        $stmt->execute([$orderId, $item['id'], $item['quantity']]);
    }

    $pdo->commit();
    echo json_encode(["success" => true, "message" => "Order placed successfully", "order_id" => $orderId]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Failed to place order", "details" => $e->getMessage()]);
}
?>
