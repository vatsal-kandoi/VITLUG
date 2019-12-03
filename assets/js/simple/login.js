var disp1=document.getElementById("disp1");
var disp2=document.getElementById("disp2");
var disp3=document.getElementById("disp3");
var disp4=document.getElementById("disp4");
var input1=document.getElementById("inp1");
var input2=document.getElementById("inp2");
var input3=document.getElementById("inp3");
var input4=document.getElementById("inp4");
var input5=document.getElementById("inp5");
var block1=document.getElementById("inpblock1");
var block2=document.getElementById("inpblock2");
var block3=document.getElementById("inpblock3");
var block4=document.getElementById("inpblock4");
var block5=document.getElementById("inpblock5");
var loginnew=document.getElementById("loginnew");
var loginexist=document.getElementById("loginexist");
var choose=document.getElementById("choose");
var dispexist1=document.getElementById("dispexist1");
var blockexist1=document.getElementById("inpblockexist1");
var blockexist2=document.getElementById("inpblockexist2");
var inputexist1=document.getElementById("inpexist1");
var inputexist2=document.getElementById("inpexist2");
var time=document.getElementById("time");

setInterval(() => {
    var d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    
    
    if(min<10){
        min="0"+min;
    }
    var fulltime=hr+":"+min;
    time.innerHTML=fulltime;
},1000);


function newshow() {
    choose.classList.add("hide");
    loginnew.classList.remove("hide");
    loginnew.classList.add("show");


}

function existshow() {
    choose.classList.add("hide");
    loginexist.classList.remove("hide");
    loginexist.classList.add("show");
}

function hideexist1(){
  let reg = new RegExp('^1[0-9][A-Z]{3}[0-9]{4}$');
  if(inputexist1.value.match(reg) != null) {
    dispexist1.innerHTML=inputexist1.value;
    blockexist1.classList.remove("show");
    blockexist1.classList.add("hide");
    blockexist2.classList.remove("hide");
    blockexist2.classList.add("show");
  } else {
    document.getElementsByTagName('form')[1].reportValidity()
  }
}

function hide1(){
  let reg = new RegExp('^1[0-9][A-Z]{3}[0-9]{4}$');
  if(input1.value.match(reg) != null) {
    disp1.innerHTML=input1.value;
    block1.classList.remove("show");
    block1.classList.add("hide");
    block2.classList.remove("hide");
    block2.classList.add("show");
  } else {
    document.getElementsByTagName('form')[0].reportValidity()
  } 
}

function hide2(){
  if(input2.value != '') {
    disp2.innerHTML=input2.value;
    block2.classList.remove("show");
    block2.classList.add("hide");
    block3.classList.remove("hide");
     block3.classList.add("show");
  } else {
    document.getElementsByTagName('form')[0].reportValidity()
  } 
}

function hide3(){
  let reg = new RegExp('^[a-zA-Z]{1,}.[a-zA-Z]{1,}20[0-9]{2}@vitstudent.ac.in$');
  if(input3.value.match(reg) != null) {
    disp3.innerHTML=input3.value;
      block3.classList.remove("show");
      block3.classList.add("hide");
      block4.classList.remove("hide");
       block4.classList.add("show");
  } else {
    document.getElementsByTagName('form')[0].reportValidity()
  }

}

function hide4(){
  let reg = new RegExp('^[1-9]{1}[0-9]{9}$');
  if(input4.value.match(reg) != null) {
    disp4.innerHTML=input4.value;
    block4.classList.remove("show");
    block4.classList.add("hide");
    block5.classList.remove("hide");
     block5.classList.add("show");
  } else {
    document.getElementsByTagName('form')[0].reportValidity()
  }
    
}
function submit() {
  let reg = new RegExp('^.{8,}');
  if(input4.value.match(reg) != null) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/auth/signup');
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    let x = JSON.parse(xhttp.responseText);
                    if (x.code == 200) {
                        window.location.href = '/home/';
                    } else {
                      console.log(x);
                      alert('User exists')
                    }
                } catch (err) {
                    alert('Error');
                }
            }
        } 
    }
    xhttp.send(JSON.stringify({
      name:document.getElementById('inp2').value, 
      email:document.getElementById('inp3').value, 
      regno:document.getElementById('inp1').value, 
      phone:document.getElementById('inp4').value, 
      password: document.getElementById('inp5').value  
    }));
  } else {
    document.getElementsByTagName('form')[0].reportValidity()
  }
}
inputexist1.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    hideexist1(); 
  }
});

input1.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      hide1();
  }
});

input2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      hide2();
   
  }
});

input3.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      hide3();	
   
  }
});

input4.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      hide4();
   
  }
});
input5.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    submit();
  }
});

function login() {
  let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/auth/login');
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    let x = JSON.parse(xhttp.responseText);
                    if (x.code == 200) {
                        window.location.href = '/home/';
                    } else {
                      console.log(x);
                      alert('User exists')
                    }
                } catch (err) {
                    alert('Error');
                }
            }
        } 
    }
    xhttp.send(JSON.stringify({
      name:document.getElementById('inp2').value, 
      email:document.getElementById('inp3').value, 
      regno:document.getElementById('inp1').value, 
      phone:document.getElementById('inp4').value, 
      password: document.getElementById('inp5').value  
    }));
}

document.getElementById('inpexist2').addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    login();
  }
})