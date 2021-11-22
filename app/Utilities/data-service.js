class DataServiceClass {
    constructor(){}
        
    init =() =>{}
    
    getAll =()=>{
        return patientsData;
    }
    getById=(id)=>{
        let data = patientsData.find(x => x.ID === id);
        return data;
    }
    getIndexById = (id)=>{
        let index = patientsData.findIndex(x => x.ID === id);
        return index;
    }
    add = (currentPatientData)=>{
        let newID = this.getNewID();
        currentPatientData.ID = newID;
        patientsData.push(currentPatientData);
    }
    edit = (currentPatientData,patientID) =>{
        let patient_Data       = this.getById(patientID);
        patient_Data.fname     = currentPatientData.fname;
        patient_Data.mname     = currentPatientData.mname;
        patient_Data.lname     = currentPatientData.lname;
        patient_Data.email     = currentPatientData.email;
        patient_Data.status    = currentPatientData.status;
        patient_Data.DOB       = currentPatientData.DOB;
        patient_Data.lastCheck = currentPatientData.lastCheck;
        patient_Data.Active    = currentPatientData.Active;
        patient_Data.gender    = currentPatientData.gender; 
        return patient_Data;
    }
    Delete = (id)=>{
        let targetIndex = this.getIndexById(id);    
        patientsData.splice(targetIndex ,1)
        return patientsData;
    }
    getNewID = ()=>{
        let max = patientsData[0].ID;
        for(let i=0;i<patientsData.length; i++){
            if(patientsData[i].ID > max){
                max = patientsData[i].ID
            }
        }
        return max + 1 ;
    }
}
let DataService = new DataServiceClass();
DataService.init();