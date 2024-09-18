class PatientController {
  static async createPatient(req, res) {
    res.status(501).send('not implemented')
  }

  static async retrievePatientsList(req, res) {
    const patients = [
      {
        id: 1,
        uuid: "af6b1687-af4f-4513-a025-4c783a580cb0",
        name: "Jonh Doe",
        phone: "552100000000",
        email: "jonh.doe@test.com",
        birth_date: "2024-16-09",
        gender: "m",
        height: 1.75,
        weight: 65.5,
      }
    ];

    res.status(200).json(patients);
  }
}

module.exports = PatientController