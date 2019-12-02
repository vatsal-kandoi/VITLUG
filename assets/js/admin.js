document.getElementById('admin-signin').addEventListener('submit', (e)=> {
    e.preventDefault();
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/admin');
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    let x = JSON.parse(xhttp.responseText);
                    if (x.code == 200) {
                        window.location.href = '/admin/dashboard';
                    } else {
                        console.log(x);
                        document.getElementById('error').innerHTML = 'Incorrect combination entered';
                    }
                } catch (err) {

                }
            }
        } 
    }
    xhttp.send(JSON.stringify({username: document.getElementById('username').value, 
        password: document.getElementById('password').value
    }));
});

document.getElementById('quizzes').addEventListener('click', () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET','/api/admin/quiz');
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    let x = JSON.parse(xhttp.responseText);
                    if (x.code == 200) {
                        document.getElementById('quiz-view').innerHTML = '';
                        document.getElementById('user-view').innerHTML = '';
                        for (let i=0;i<x.responses;i++) {
                            document.getElementById('quiz-view').innerHTML+=`
                                <div onclick="getQuizByID(${x.responses[i]._id})">
                                    <div class="user">
                                        <div class="name">${x.responses[i].user.name}</div>
                                        <div class="regno">${x.responses[i].user.regno}</div>
                                    </div>                                
                                </div>
                            `;
                        }
                    } else {
                        alert('Error');
                    }
                } catch (err) {

                }
            }
        } 
    }
    xhttp.send();
});

function getQuizByID(quizId) {
    window.location.href = `/admin/dashboard/quiz?quizId=${quizId}`;
};