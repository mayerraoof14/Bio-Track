-- BioTrack Database Structure and Seed Data
CREATE DATABASE biotrack;
USE biotrack;

-- Table: contact_us
CREATE TABLE contact_us (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contact_us (name, email, message, submitted_at) VALUES
('AMIRA AWADALLAH', 'amiraayman071@gmail.com', '22', '2025-04-23 18:14:33'),
('Sayed', 'amiraayman071@gmail.com', 'hello', '2025-04-23 18:17:33'),
('Rasha', 'amiraayman071@gmail.com', 'no', '2025-04-23 19:30:44'),
('Rasha', 'amiraayman071@gmail.com', 'no', '2025-04-23 19:31:07'),
('youseff', 'amiraayman071@gmail.com', 'ho', '2025-04-23 19:34:55'),
('mariem', 'amiraayman071@gmail.com', '3', '2025-04-23 19:37:01'),
('Amira Mahmoud', 'amiraayman071@gmail.com', 'q', '2025-04-23 19:38:23'),
('Amira Mahmoud', 'amiraayman071@gmail.com', '123', '2025-04-23 19:40:31');

-- Table: shipping_info
CREATE TABLE shipping_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (full_name, email, password, created_at) VALUES
('Amira Mahmoud', 'amiraayman071@gmail.com', '$2y$10$v6QjyTrvleBclNviCwEi.eNKZoXAsEaCoA93/G5UPhsK9C55MPZSW', '2025-04-23 20:26:50'),
('Amira Mahmoud', 'amy@gmail.com', '$2y$10$IrHY8TYeC90OMmg4ms2nSusq2mnfPdNWdbajzSwzWbUNE.WzXYFki', '2025-04-23 20:35:35');

-- Table: warranty_registrations
CREATE TABLE warranty_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_model ENUM('Bio Track Classic', 'Bio Track Elite') NOT NULL,
  serial_number VARCHAR(100) NOT NULL,
  purchase_date DATE NOT NULL,
  receipt_filename VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items Table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);


-- Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
	FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Optional: Sample Data for menu_items
INSERT INTO menu_items (name, description, price) VALUES
('Bio Track Classic', 'Essential health monitoring features', 99.99),
('Bio Track Elite', 'Premium health monitoring device', 199.99);