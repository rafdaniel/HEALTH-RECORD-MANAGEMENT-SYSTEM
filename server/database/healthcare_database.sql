-- HealthCare Management System Database Schema
-- Created for XAMPP/MySQL

-- Create Database
CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- 1. Users/Doctors Table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    specialty VARCHAR(50),
    license_number VARCHAR(50) UNIQUE,
    years_of_experience INT,
    role ENUM('admin', 'doctor', 'staff') DEFAULT 'doctor',
    status ENUM('active', 'inactive') DEFAULT 'active',
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_license (license_number)
);

-- 2. Patients Table
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    blood_type VARCHAR(5),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    avatar_url VARCHAR(255),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_patient_name (full_name),
    INDEX idx_patient_phone (phone),
    INDEX idx_patient_email (email)
);

-- 3. Appointments Table
CREATE TABLE appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    visit_type ENUM('Clinic', 'Home') DEFAULT 'Clinic',
    status ENUM('Scheduled', 'Completed', 'Cancelled', 'No-Show') DEFAULT 'Scheduled',
    reason_for_visit TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_appointment_status (status),
    INDEX idx_patient_appointments (patient_id),
    INDEX idx_doctor_appointments (doctor_id)
);

-- 4. Medical Records Table
CREATE TABLE medical_records (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_id INT,
    record_date DATE NOT NULL,
    diagnosis TEXT NOT NULL,
    symptoms TEXT,
    prescription TEXT,
    lab_results TEXT,
    notes TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    INDEX idx_patient_records (patient_id),
    INDEX idx_doctor_records (doctor_id),
    INDEX idx_record_date (record_date)
);

-- 5. Prescriptions Table
CREATE TABLE prescriptions (
    prescription_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    medical_record_id INT,
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    duration VARCHAR(50),
    instructions TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    status ENUM('Active', 'Completed', 'Discontinued') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(record_id) ON DELETE SET NULL,
    INDEX idx_patient_prescriptions (patient_id),
    INDEX idx_prescription_status (status)
);

-- 6. Vital Signs Table
CREATE TABLE vital_signs (
    vital_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    appointment_id INT,
    recorded_date DATETIME NOT NULL,
    blood_pressure_systolic INT,
    blood_pressure_diastolic INT,
    heart_rate INT,
    temperature DECIMAL(4,1),
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    bmi DECIMAL(4,2),
    oxygen_saturation INT,
    respiratory_rate INT,
    notes TEXT,
    recorded_by INT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    FOREIGN KEY (recorded_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_patient_vitals (patient_id),
    INDEX idx_vital_date (recorded_date)
);

-- 7. Billing/Invoices Table
CREATE TABLE invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    appointment_id INT,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0.00,
    balance DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Unpaid', 'Partial', 'Paid', 'Overdue') DEFAULT 'Unpaid',
    payment_method VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    INDEX idx_patient_invoices (patient_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_invoice_date (invoice_date)
);

-- 8. Invoice Items Table
CREATE TABLE invoice_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE CASCADE,
    INDEX idx_invoice_items (invoice_id)
);

-- 9. Messages/Communications Table
CREATE TABLE messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    patient_id INT,
    subject VARCHAR(200),
    message_body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE SET NULL,
    INDEX idx_sender (sender_id),
    INDEX idx_recipient (recipient_id),
    INDEX idx_read_status (is_read)
);

-- 10. Audit Log Table
CREATE TABLE audit_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id INT,
    old_values TEXT,
    new_values TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_user_logs (user_id),
    INDEX idx_action (action),
    INDEX idx_log_date (created_at)
);

-- Insert Sample Data

-- Sample Doctor/Admin User (password: 'admin123' - should be properly hashed in production)
INSERT INTO users (full_name, email, phone, password_hash, specialty, license_number, years_of_experience, role) 
VALUES 
('Dr. Ramon Abas', 'ramon.abas@healthcare.com', '+1 (555) 123-4567', '$2a$10$YourHashedPasswordHere', 'Cardiology', 'MD-12345678', 15, 'admin'),
('Dr. Sarah Williams', 'sarah.williams@healthcare.com', '+1 (555) 234-5678', '$2a$10$YourHashedPasswordHere', 'Pediatrics', 'MD-87654321', 10, 'doctor'),
('Dr. James Martinez', 'james.martinez@healthcare.com', '+1 (555) 345-6789', '$2a$10$YourHashedPasswordHere', 'Neurology', 'MD-11223344', 8, 'doctor');

-- Sample Patients
INSERT INTO patients (full_name, email, phone, date_of_birth, gender, blood_type, address, city, state, zip_code, status) 
VALUES 
('Sarah Johnson', 'sarah.j@email.com', '+1 (555) 123-4567', '1992-03-15', 'Female', 'A+', '123 Main St', 'New York', 'NY', '10001', 'Active'),
('Michael Chen', 'm.chen@email.com', '+1 (555) 234-5678', '1988-07-22', 'Male', 'O-', '456 Oak Avenue', 'Los Angeles', 'CA', '90001', 'Active'),
('Emily Rodriguez', 'e.rodriguez@email.com', '+1 (555) 345-6789', '1995-11-08', 'Female', 'B+', '789 Pine Road', 'Chicago', 'IL', '60601', 'Active'),
('James Wilson', 'j.wilson@email.com', '+1 (555) 456-7890', '1982-12-03', 'Male', 'AB+', '321 Elm Street', 'Houston', 'TX', '77001', 'Active');

-- Sample Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, visit_type, status, reason_for_visit) 
VALUES 
(1, 1, '2024-11-15', '09:00:00', 'Clinic', 'Scheduled', 'Regular checkup'),
(2, 1, '2024-11-15', '10:30:00', 'Home', 'Scheduled', 'Follow-up consultation'),
(3, 2, '2024-11-15', '14:00:00', 'Clinic', 'Scheduled', 'Vaccination'),
(4, 3, '2024-11-10', '11:00:00', 'Clinic', 'Completed', 'Back pain consultation');

-- Sample Medical Records
INSERT INTO medical_records (patient_id, doctor_id, appointment_id, record_date, diagnosis, symptoms, prescription, notes) 
VALUES 
(1, 1, 1, '2024-10-20', 'Common Cold', 'Runny nose, mild fever, cough', 'Antihistamines, Rest', 'Patient advised to rest and stay hydrated'),
(2, 1, 2, '2024-10-15', 'Hypertension', 'High blood pressure readings', 'Lisinopril 10mg daily', 'Follow-up in 2 weeks. Monitor BP daily'),
(4, 3, 4, '2024-11-10', 'Lower Back Pain', 'Chronic lower back pain, limited mobility', 'Naproxen 500mg, Physical therapy', 'Referred to physical therapy. MRI scheduled');

-- Sample Prescriptions
INSERT INTO prescriptions (patient_id, doctor_id, medical_record_id, medication_name, dosage, frequency, duration, start_date, status) 
VALUES 
(2, 1, 2, 'Lisinopril', '10mg', 'Once daily', '30 days', '2024-10-15', 'Active'),
(4, 3, 3, 'Naproxen', '500mg', 'Twice daily', '14 days', '2024-11-10', 'Active');

-- Sample Vital Signs
INSERT INTO vital_signs (patient_id, appointment_id, recorded_date, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, temperature, weight, height, recorded_by) 
VALUES 
(1, 1, '2024-10-20 09:00:00', 120, 80, 72, 98.6, 65.5, 165.0, 1),
(2, 2, '2024-10-15 10:30:00', 140, 90, 78, 98.4, 75.0, 175.0, 1),
(4, 4, '2024-11-10 11:00:00', 125, 82, 70, 98.2, 82.5, 180.0, 3);

-- Sample Invoices
INSERT INTO invoices (patient_id, appointment_id, invoice_date, due_date, total_amount, paid_amount, balance, payment_status) 
VALUES 
(1, 1, '2024-10-20', '2024-11-20', 150.00, 150.00, 0.00, 'Paid'),
(2, 2, '2024-10-15', '2024-11-15', 200.00, 100.00, 100.00, 'Partial'),
(4, 4, '2024-11-10', '2024-12-10', 250.00, 0.00, 250.00, 'Unpaid');

-- Sample Invoice Items
INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total_price) 
VALUES 
(1, 'General Consultation', 1, 100.00, 100.00),
(1, 'Lab Tests', 1, 50.00, 50.00),
(2, 'Home Visit Consultation', 1, 150.00, 150.00),
(2, 'Medication', 1, 50.00, 50.00),
(3, 'Specialist Consultation', 1, 200.00, 200.00),
(3, 'Physical Therapy Session', 1, 50.00, 50.00);

-- Create Views for Common Queries

-- View: Today's Appointments
CREATE VIEW todays_appointments AS
SELECT 
    a.appointment_id,
    p.full_name AS patient_name,
    u.full_name AS doctor_name,
    a.appointment_time,
    a.visit_type,
    a.status,
    a.reason_for_visit
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN users u ON a.doctor_id = u.user_id
WHERE a.appointment_date = CURDATE()
ORDER BY a.appointment_time;

-- View: Patient Summary
CREATE VIEW patient_summary AS
SELECT 
    p.patient_id,
    p.full_name,
    p.email,
    p.phone,
    p.date_of_birth,
    TIMESTAMPDIFF(YEAR, p.date_of_birth, CURDATE()) AS age,
    p.gender,
    p.blood_type,
    p.status,
    COUNT(DISTINCT a.appointment_id) AS total_appointments,
    COUNT(DISTINCT mr.record_id) AS total_records,
    MAX(a.appointment_date) AS last_visit_date
FROM patients p
LEFT JOIN appointments a ON p.patient_id = a.patient_id
LEFT JOIN medical_records mr ON p.patient_id = mr.patient_id
GROUP BY p.patient_id;

-- View: Revenue Summary
CREATE VIEW revenue_summary AS
SELECT 
    DATE_FORMAT(invoice_date, '%Y-%m') AS month,
    COUNT(*) AS total_invoices,
    SUM(total_amount) AS total_revenue,
    SUM(paid_amount) AS total_paid,
    SUM(balance) AS total_outstanding
FROM invoices
GROUP BY DATE_FORMAT(invoice_date, '%Y-%m')
ORDER BY month DESC;

-- Create Stored Procedures

DELIMITER //

-- Procedure: Create New Appointment
CREATE PROCEDURE create_appointment(
    IN p_patient_id INT,
    IN p_doctor_id INT,
    IN p_date DATE,
    IN p_time TIME,
    IN p_visit_type VARCHAR(10),
    IN p_reason TEXT
)
BEGIN
    INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, visit_type, reason_for_visit)
    VALUES (p_patient_id, p_doctor_id, p_date, p_time, p_visit_type, p_reason);
    
    SELECT LAST_INSERT_ID() AS appointment_id;
END //

-- Procedure: Get Patient Medical History
CREATE PROCEDURE get_patient_history(IN p_patient_id INT)
BEGIN
    SELECT 
        mr.record_date,
        mr.diagnosis,
        mr.prescription,
        mr.notes,
        u.full_name AS doctor_name
    FROM medical_records mr
    JOIN users u ON mr.doctor_id = u.user_id
    WHERE mr.patient_id = p_patient_id
    ORDER BY mr.record_date DESC;
END //

-- Procedure: Calculate Patient Age
CREATE PROCEDURE calculate_age(IN p_patient_id INT)
BEGIN
    SELECT 
        full_name,
        date_of_birth,
        TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age
    FROM patients
    WHERE patient_id = p_patient_id;
END //

DELIMITER ;

-- Grant Privileges (for development only)
-- GRANT ALL PRIVILEGES ON healthcare_db.* TO 'healthcare_user'@'localhost' IDENTIFIED BY 'your_secure_password';
-- FLUSH PRIVILEGES;