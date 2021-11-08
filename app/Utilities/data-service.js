class DataServiceClass {
    constructor(){

    }
    init =() =>{
        
    }
    getAll =()=>{
        return patientsData;
    }
    getById=(id)=>{
        let result;
        for(let i=0; i<patientsData.length; i++){     
            if(id == patientsData[i].ID){
                result = patientsData[i];
            }
        }
        return result;
    }
    getIndexById = (id)=>{
        let index;
        for(let i=0; i<patientsData.length; i++){     
            if(id == patientsData[i].ID){
                index = i;
            }
        }
        return index; 
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
    add = (currentPatientData)=>{
        let newID = this.getNewID();
        currentPatientData.ID = newID;
        patientsData.push(currentPatientData);
    }
    edit = (currentPatientData) =>{
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
}
let DataService = new DataServiceClass();