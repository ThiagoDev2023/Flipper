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
const nomeUsuario = localStorage.getItem("nomeUsuario")
const nomeSala = localStorage.getItem("nomeSala")
inicializar();
function inicializar() {
  document.getElementById("nomeSala").textContent = '#' + nomeSala;

  getData();
}

function getData() {
  const output = document.getElementById("output");
  firebase.database().ref('/' + nomeSala).on("value", snapshot => {
      output.innerHTML = "";
      snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          if(childKey != "purpose") {
              const childMsg = childSnapshot.val();
              const nome = childMsg.nome;
              const msg = childMsg.mensagem;
              const likes = childMsg.likes;
             /*Se depois de iterar (caçar) pelo BD a resposta NÂO for "purpose"
             ele criará um elemento DIV para exibir as mensagens, os nomes e likes*/
              
              const chatCard = document.createElement("div");//cria um elemento DIV para a mensagem
              chatCard.className = "chatCard";
              
              
              const chatNome = document.createElement("h4");//cria um cabeçalho para a mensagem com o nome do remetente
              chatNome.className = "chatNome";
              chatNome.textContent = nome;
              chatCard.appendChild(chatNome);
              
              
              const row = document.createElement("div");//criar um elemento em linha para exibir a mensagem
              row.className = "row";
              chatCard.appendChild(row);
              
              
              const col = document.createElement("div");// criar uma coluna para o corpo da mensagem
              col.className = "col";
              row.appendChild(col);
             
              
              const chatMsg = document.createElement("h5");//criar elemento h5 para o corpo da mensagem
              chatMsg.className = "chatMsg";
              chatMsg.textContent = msg;
              col.appendChild(chatMsg);
             
             
              const colAuto = document.createElement("div");//cria uma coluna para o botão de like
              colAuto.className = "col-auto";
              row.appendChild(colAuto);
              
              
              const botaoLike = document.createElement("button");//cria o botão de curtida ou like
              botaoLike.className = "btn btn-info";
              botaoLike.id = childKey;
              botaoLike.value = likes;
              botaoLike.setAttribute("onclick", "likeMsg(this.id)");
              botaoLike.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> ' + likes;
              colAuto.appendChild(botaoLike);
              output.appendChild(chatCard);
          }
      });
  });
}

function send() {
  const txtMsg = document.getElementById("msg");
  const msg = txtMsg.value;

  if (msg.trim()) {
      firebase.database().ref('/' + nomeSala).push({
          nome: nomeUsuario,
          mensagem: msg,
          likes: 0
      });
      txtMsg.value = "";
  }
}

function likeMsg(btnId) {
  let likes = Number(document.getElementById(btnId).value);
  likes++;
  firebase.database().ref('/' + nomeSala).child(btnId).update({
      likes: likes
  })
}