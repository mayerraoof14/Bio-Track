<?php
$host = 'localhost';
$db   = 'biotrack';
$user = 'root';
$pass = '1234';
$charset = 'utf8mb4';

// Define the Data Source Name (DSN) for the PDO connection, 
// specifying the host, database name, and character set
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Define an array of options for the PDO connection
$options = [
    // Set the error mode to throw exceptions if an error occurs
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,

    // Set the default fetch mode to associative arrays (keys as column names)
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];


try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
?>