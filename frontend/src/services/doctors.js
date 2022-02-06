import http from "../http-common";

class DoctorDataService{
    getAll(p,l,token){
        return http.get('/doctor?page='+p+'&limit='+l+'',{
            headers:{
                'Authorization':'Bearer '+token
            }
            
        })
    }
    getDetails(id,token){
        return http.get('doctor/doctordetails/'+id,{
            headers:{
                'Authorization':'Bearer '+token
            }
            
        })
    }
    getAppointmentsByDate(date,id){
        return http.get('doctor/getappointmentByDate/'+date+'/'+id)
    }
    postDoc(data){
        return http.post('doctor/add/',data)
    }
    getAppointments(data){
        return http.post('doctor/doctordetails/slots/',data)
    }
    updateSlots(data){
        return http.put('doctor/updateslot/',data)
    }
    postAppointment(data){
        return http.post('doctor/appointment',data)
    }
}

export default new DoctorDataService();