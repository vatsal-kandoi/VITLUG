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
                        for (let i=0;i<x.responses.length;i++) {
                            document.getElementById('quiz-view').innerHTML+=`
                            <div class="row">
                                <div style="display: flex; align-items: center;" class="col l6">
                                    <div style="font-weight:bold;font-size:20px;" class="name">${x.responses[i].user.name} |   </div>
                                    <div class="regno">${x.responses[i].user.regno}</div>
                                </div>
                                <div style="display: flex; align-items: center;" class="col l6">
                                    <button class="btn-small waves-effect waves-light" onclick="getQuizByID('${x.responses[i]._id}')">Open submission</button>    
                                </div>
                            </div>`
                        }
                        if (x.responses.length == 0) {
                            document.getElementById('quiz-view').innerHTML+=`
                                <div style="font-weight:bold; font-size: 20px; text-align:center;">
                                    No quiz left to be corrected                                
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