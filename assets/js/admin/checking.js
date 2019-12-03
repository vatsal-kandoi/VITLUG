let params = (new URL(document.location)).searchParams;
let quizId = params.get("quizId");

let xhttp = new XMLHttpRequest();
xhttp.open('GET', `/api/admin/quiz?quizId=${quizId}`)
xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            try {
                let x = JSON.parse(xhttp.responseText);
                if (x.code == 200) {
                    console.log(x);
                    console.log(x.response)
                    document.getElementById('username').innerHTML = x.response.user.name;
                    document.getElementById('regno').innerHTML = x.response.user.regno;
                    document.getElementById('submitted').innerHTML = x.response.submitted;
                    for(let i=0; i<x.response.resp.length;i++) {
                        if(x.response.resp[i].question.type == 'subjective') {
                            if (x.response.resp[i].answer == '') {
                                x.response.resp[i].answer = 'No answer provided'
                            }
                            document.getElementById('quiz').innerHTML+=`
                                <div>${x.response.resp[i].question.question}</div>
                                <div>${x.response.resp[i].answer}</div>
                            `;
                        } else {
                            let options = ``;
                            let selected = x.response.resp[i].answer.split(" ");
                            let isSelected = [];
                            for (let j=0;j<x.response.resp[i].question.mcqOptions.length;j++) {
                                if (selected.includes(x.response.resp[i].question.mcqOptions[j].option)) {
                                    isSelected[j] = "selected"; // Class name
                                } else {
                                    isSelected[j] = "";
                                }
                            }
                            for (let j=0;j<x.response.resp[i].question.mcqOptions.length;j++) {
                                options += `<div class="${isSelected[j]}">${x.response.resp[i].question.mcqOptions[j].option}</div>`;
                            }
                            document.getElementById('quiz').innerHTML+=`
                                <div>${x.response.resp[i].question.question}</div>
                                <div>
                                    <div>${options}</div>
                                </div>
                            `;
                        }
                    }
                    console.log(x);
                } else {
                    alert('Error');
                }
            } catch (err) {
                alert('Error');
            }
        }
    }
}

document.getElementById('grade').addEventListener('click', () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', `/api/admin/quiz?quizId=${quizId}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    let x = JSON.parse(xhttp.responseText);
                    console.log(x);
                    if (x.code == 200) {
                        window.location.href = '/admin/dashboard';
                    } else {
                        alert('Error');
                    }
                } catch (err) {
                    alert('Error');
                }
            }
        }
    }
    xhttp.send(JSON.stringify({grade: document.getElementById('enter-grade').value}));
});

xhttp.send();

