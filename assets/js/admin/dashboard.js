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
                                <div>
                                    <div class="user">
                                        <div class="name">${x.responses[i].user.name}</div>
                                        <div class="regno">${x.responses[i].user.regno}</div>
                                        <button onclick="getQuizByID('${x.responses[i]._id}')">Open submission</button>    
                                    </div>                                
                                </div>
                            `;
                        }
                        if (x.responses.length == 0) {
                            document.getElementById('quiz-view').innerHTML+=`
                                <div>
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