const firebaseConfig = {
  apiKey: "AIzaSyAa8Itup5Zg74OV4Id51xUKer8ZgQ08BcQ",
  authDomain: "chat2-cce5d.firebaseapp.com",
  databaseURL: "https://chat2-cce5d-default-rtdb.firebaseio.com",
  projectId: "chat2-cce5d",
  storageBucket: "chat2-cce5d.appspot.com",
  messagingSenderId: "415480180000",
  appId: "1:415480180000:web:d829c80d1088bbefa2bb45"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  inicializar();

function inicializar() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    // console.log(nomeUsuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";

    getData();
}

function addSala(){
  const nomeSala = document.getElementById("nomeSala").value;
  console.log(nomeSala);
  if (nomeSala) {
    firebase.database().ref('/').child(nomeSala).set(
      {
        purpose: "sala criada"
      }
    );
    carregaSala(nomeSala);
  }
}

function getData() {
  firebase.database().ref('/').on("value", snapshot =>{
    let salas = [];
    snapshot.forEach(childSnapshot =>{
      const childkey = childSnapshot.key;
      const html = '<div class="nomeSala" id="'
      + childkey
      +'" onclick="carregaSala(this.id)">#'
      +childkey
      +'</div>'
      salas.push(html);
    });
    document.getElementById("output").innerHTML= salas.join("");
   } );
  }
function carregaSala(sala){
  localStorage.setItem("nomeSala", sala);
  location ="chat.html";
}