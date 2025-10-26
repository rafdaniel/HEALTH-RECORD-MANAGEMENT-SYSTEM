import express, { Router, Request, Response } from 'express';
// db/connection.ts should export the promise pool as default
import db from '../database/connection';
// Import types from mysql2
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// --- Define Interfaces for Type Safety ---

// Describes the Patient object from your database
interface Patient {
  patient_id: number;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string; // Or Date, but string is common from DB
  gender: string;
  blood_type: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

// Describes the request body for creating a patient
interface CreatePatientBody {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// Describes the request body for updating a patient
interface UpdatePatientBody {
  fullName: string;
  email: string;
  phone: string;
  bloodType: string;
  address: string;
}

// Describes the URL parameters (e.g., /:id)
interface PatientParams {
  id: string;
}

// --- Create Router ---
const router: Router = express.Router();

// Get all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    const [patients] = await db.query<RowDataPacket[]>('SELECT * FROM patient_summary');
    res.json({ success: true, data: patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patients'
    });
  }
});

// Get single patient
router.get('/:id', async (req: Request<PatientParams>, res: Response) => {
  try {
    // Combine Patient and RowDataPacket for full typing
    const [patients] = await db.query<(Patient & RowDataPacket)[]>(
      'SELECT * FROM patients WHERE patient_id = ?',
      [req.params.id]
    );

    if (patients.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({ success: true, data: patients[0] });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patient'
    });
  }
});

// Create patient
router.post('/', async (req: Request<{}, {}, CreatePatientBody>, res: Response) => {
  try {
    const { fullName, email, phone, dateOfBirth, gender,
      bloodType, address, city, state, zipCode } = req.body;

    // INSERT/UPDATE/DELETE queries return a ResultSetHeader
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO patients (full_name, email, phone, date_of_birth, 
        gender, blood_type, address, city, state, zip_code) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, email, phone, dateOfBirth, gender,
        bloodType, address, city, state, zipCode]
    );

    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      patientId: result.insertId
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating patient'
    });
  }
});

// Update patient
router.put('/:id', async (req: Request<PatientParams, {}, UpdatePatientBody>, res: Response) => {
  try {
    const { fullName, email, phone, bloodType, address } = req.body;

    await db.query<ResultSetHeader>(
      `UPDATE patients 
       SET full_name = ?, email = ?, phone = ?, 
           blood_type = ?, address = ?
       WHERE patient_id = ?`,
      [fullName, email, phone, bloodType, address, req.params.id]
    );

    res.json({
      success: true,
      message: 'Patient updated successfully'
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating patient'
    });
  }
});

// Delete patient
router.delete('/:id', async (req: Request<PatientParams>, res: Response) => {
  try {
    await db.query<ResultSetHeader>(
      'DELETE FROM patients WHERE patient_id = ?',
      [req.params.id]
    );

    res.json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting patient'
    });
  }
});

// --- Export the router ---
export default router;