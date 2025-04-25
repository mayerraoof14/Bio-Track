<?php
session_start();
require_once 'config/db.php';

if (!isset($_SESSION['user_id'])) {
    die("Not logged in");
}

$data = json_decode(file_get_contents('php://input'), true);
$cartItems = $data['cart'];
$total = $data['total'];

$pdo->beginTransaction();

$stmt = $pdo->prepare("INSERT INTO orders (user_id, total) VALUES (?, ?)");
$stmt->execute([$_SESSION['user_id'], $total]);
$orderId = $pdo->lastInsertId();

foreach ($cartItems as $item) {
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (?, ?, ?)");
    $stmt->execute([$orderId, $item['id'], $item['quantity']]);
}

$pdo->commit();
echo "Order placed successfully!";
?>
