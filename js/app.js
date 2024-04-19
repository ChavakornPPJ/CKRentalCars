import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore , collection , getDocs , addDoc , orderBy , query , where , deleteDoc , doc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAUrugnNqDtcRLnM3SRM73CFrJu67Azdl0",
authDomain: "ck-rentalcars.firebaseapp.com",
databaseURL: "https://ck-rentalcars-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "ck-rentalcars",
storageBucket: "ck-rentalcars.appspot.com",
messagingSenderId: "117122587085",
appId: "1:117122587085:web:61ee19ff7622220bbf0c84",
measurementId: "G-8EKKMCV33J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const cktable = document.getElementById("cktable");
const ckform = document.getElementById("addForm");


async function getCkcar(db) {

    const ckCol = collection(db,'ckcar');

    const keepCkDoc = await getDocs(ckCol);
    
    return keepCkDoc;

}



function showCkData(ckcardata){

    

    const row = cktable.insertRow(-1);
   
    const carnameCol = row.insertCell(0)
    const typecarCol = row.insertCell(1)
    const statusCol = row.insertCell(2)
    const deleteCol = row.insertCell(3)
    
    carnameCol.innerHTML = ckcardata.data().carname;
    typecarCol.innerHTML = ckcardata.data().typecar;
    statusCol.innerHTML = ckcardata.data().status;

    
    //let cknSort = ckN.orderBy("carname","asc")

           
    //สร้างปุ่ม
    let btn = document.createElement('button')
    btn.textContent = 'Delete'
    btn.setAttribute('class','btn btn-danger')
    btn.setAttribute('data-id',ckcardata.id)
    deleteCol.appendChild(btn)
    btn.addEventListener('click',(e) => {

        let id = e.target.getAttribute('data-id');
        deleteDoc(doc(db,'ckcar',id));
    })
    
    

}

const fetchCkcar  = await getCkcar(db);


fetchCkcar.forEach(ckcardata => {

     
    showCkData(ckcardata);
    
        
});

ckform.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    addDoc(collection(db,'ckcar'),{
            carname:ckform.carname.value,
            typecar:ckform.typecar.value
    })
    ckform.carname.value = "";
    ckform.typecar.value = "";
    alert("Successfully Add Data");

});

