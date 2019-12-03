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
                    alert('Error');
                }
            }
        } 
    }
    xhttp.send(JSON.stringify({username: document.getElementById('username').value, 
        password: document.getElementById('password').value
    }));
});
