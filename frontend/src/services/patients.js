import http from "../http-common";

class PatientDataService{
    registerPatient(data){
       return http.post('patient/patient',data)
    }
    registerUser(data){
        return http.post('patient/user',data)
    }
    getAll(p,l,token){
        return http.get('/patient?page='+p+'&limit='+l+'',{
            headers:{
                'Authorization':'Bearer '+token
            }
            
        })
    }
    getMyAppointments(id){
        return http.get('patient/myAppointments/'+id)
    }
    deleteProfile(id){
        return http.delete('patient/deletePatient/'+id)
    }
}

export default new PatientDataService();