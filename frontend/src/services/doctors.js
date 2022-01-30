import http from "../http-common";

class DoctorDataService{
    getAll(){
        return http.get('/doctor/')
    }
    getDetails(id){
        return http.get('doctor/doctordetails/'+id)
    }
    postDoc(data){
        return http.post('doctor/add/',data)
    }
    getAppointments(data){
        return http.post('doctor/doctordetails/slots/',data)
    }
}

export default new DoctorDataService();