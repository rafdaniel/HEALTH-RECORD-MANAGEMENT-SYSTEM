import { Fragment, useState } from 'react';
import { Search, MessageCircle, Phone, User, Calendar, MapPin, X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  gender: string;
  phone: string;
  birthdate: string;
  address: string;
  email: string;
  records: MedicalRecord[];
  avatarUrl: string;
}

interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  doctorName: string;
}

// ...existing code...

const initialPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    gender: "Female",
    phone: "+1 (555) 123-4567",
    birthdate: "1992-03-15",
    address: "123 Main St, New York, NY",
    email: "sarah.j@email.com",
    avatarUrl: "https://api.builder.io/api/v1/image/assets/TEMP/4797045a415e4685f6ece1f02c4fddc8a442d5d0?width=96",
    records: [
      {
        id: "r1",
        date: "2024-10-20",
        diagnosis: "Common Cold",
        prescription: "Antihistamines, Rest",
        notes: "Patient reported symptoms of common cold. Advised rest and plenty of fluids.",
        doctorName: "Dr. Smith"
      }
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    gender: "Male",
    phone: "+1 (555) 234-5678",
    birthdate: "1988-07-22",
    address: "456 Oak Avenue, Los Angeles, CA",
    email: "m.chen@email.com",
    avatarUrl: "https://api.builder.io/api/v1/image/assets/TEMP/3f5171ffb70573f3f90d88d0f6a0f956a41610e7?width=96",
    records: [
      {
        id: "r2",
        date: "2024-10-15",
        diagnosis: "Hypertension",
        prescription: "Lisinopril 10mg",
        notes: "Blood pressure: 140/90. Follow-up in 2 weeks.",
        doctorName: "Dr. Williams"
      },
      {
        id: "r3",
        date: "2024-09-30",
        diagnosis: "Annual Check-up",
        prescription: "None",
        notes: "All vitals normal. Recommended regular exercise.",
        doctorName: "Dr. Williams"
      }
    ]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    gender: "Female",
    phone: "+1 (555) 345-6789",
    birthdate: "1995-11-08",
    address: "789 Pine Road, Chicago, IL",
    email: "e.rodriguez@email.com",
    avatarUrl: "https://api.builder.io/api/v1/image/assets/TEMP/d93d236cdc77a5f1f61b8438a7c582628122434f?width=96",
    records: [
      {
        id: "r4",
        date: "2024-10-18",
        diagnosis: "Migraine",
        prescription: "Sumatriptan 50mg",
        notes: "Recurring migraines. Advised to keep headache diary.",
        doctorName: "Dr. Johnson"
      }
    ]
  },
  {
    id: "4",
    name: "David Thompson",
    gender: "Male",
    phone: "+1 (555) 456-7890",
    birthdate: "1976-04-12",
    address: "321 Maple Drive, Houston, TX",
    email: "d.thompson@email.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    records: [
      {
        id: "r5",
        date: "2024-10-12",
        diagnosis: "Type 2 Diabetes",
        prescription: "Metformin 500mg",
        notes: "Blood sugar levels improved. Continue with diet plan.",
        doctorName: "Dr. Martinez"
      },
      {
        id: "r6",
        date: "2024-09-28",
        diagnosis: "Routine Check-up",
        prescription: "None",
        notes: "HbA1c: 6.8%. Maintaining good control.",
        doctorName: "Dr. Martinez"
      }
    ]
  },
  {
    id: "5",
    name: "Lisa Anderson",
    gender: "Female",
    phone: "+1 (555) 567-8901",
    birthdate: "1990-09-25",
    address: "567 Elm Street, Boston, MA",
    email: "l.anderson@email.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/78.jpg",
    records: [
      {
        id: "r7",
        date: "2024-10-19",
        diagnosis: "Allergic Rhinitis",
        prescription: "Cetirizine 10mg",
        notes: "Seasonal allergies. Recommended air purifier.",
        doctorName: "Dr. Brown"
      }
    ]
  },
  {
    id: "6",
    name: "James Wilson",
    gender: "Male",
    phone: "+1 (555) 678-9012",
    birthdate: "1982-12-03",
    address: "890 Cedar Lane, Seattle, WA",
    email: "j.wilson@email.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg",
    records: [
      {
        id: "r8",
        date: "2024-10-17",
        diagnosis: "Lower Back Pain",
        prescription: "Naproxen 500mg",
        notes: "Referred to physical therapy. Exercise plan provided.",
        doctorName: "Dr. Garcia"
      },
      {
        id: "r9",
        date: "2024-09-15",
        diagnosis: "Physical Assessment",
        prescription: "None",
        notes: "MRI shows mild disc herniation at L4-L5.",
        doctorName: "Dr. Garcia"
      }
    ]
  }
];

// ...existing code...

export default function MedicalRecordsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedPatient) return;
    
    // Here you would typically integrate with a messaging API
    console.log(`Sending message to ${selectedPatient.name}: ${messageText}`);
    setMessageText("");
    setIsMessageModalOpen(false);
  };

  return (
    <Fragment>
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Patient List and Records View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-lg">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Patients</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={cn(
                    "p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50",
                    selectedPatient?.id === patient.id && "bg-blue-50"
                  )}
                >
                  <img
                    src={patient.avatarUrl}
                    alt={patient.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Records View */}
          <div className="md:col-span-2">
            {selectedPatient ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-lg">
                {/* Patient Details Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedPatient.avatarUrl}
                        alt={selectedPatient.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {selectedPatient.name}
                        </h2>
                        <p className="text-gray-600">{selectedPatient.gender}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMessageModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </div>

                  {/* Patient Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {selectedPatient.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {selectedPatient.birthdate}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <MapPin className="w-4 h-4" />
                      {selectedPatient.address}
                    </div>
                  </div>
                </div>

                {/* Medical Records */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Medical History</h3>
                  <div className="space-y-4">
                    {selectedPatient.records.map((record) => (
                      <div
                        key={record.id}
                        className="p-4 border border-gray-100 rounded-lg"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-800">
                            {record.date}
                          </span>
                          <span className="text-sm text-gray-600">
                            {record.doctorName}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mb-1">
                          Diagnosis: {record.diagnosis}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Prescription: {record.prescription}
                        </p>
                        <p className="text-sm text-gray-600">{record.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 flex items-center justify-center h-full">
                <p className="text-gray-500">Select a patient to view their records</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                Message {selectedPatient.name}
              </h3>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}