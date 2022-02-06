import http from "../http-common";

class PatientDataService{
    registerPatient(data){
       return http.post('patient/patient',data)
    }
    registerUser(data){
        return http.post('patient/user',data)
    }
}

export default new PatientDataService();