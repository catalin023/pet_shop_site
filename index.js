window.onload = function() { 
    const fact = document.getElementById('catfact');
    catFact();

    setInterval(catFact, 5000);

    function catFact(){
        fetch('https://meowfacts.herokuapp.com/')
        .then(response => response.json())
        .then(data => {
            fact.innerHTML = data.data;
        })
        .catch(error => {
            fact.innerHTML = "Pisica ne-a incurcat sa accesam datele";
        });
    }

    window.addEventListener('click', function(e) {
        const popup = this.document.getElementsByClassName("popup");
        if(popup.length != 0)
            popup[0].remove();
    })

    const delayInMilliseconds = 600;

    function showPopUp() {
        const popup = document.createElement('div');
        popup.className = 'popup';
        const salePercentage = 10;
        const popUpContent = `Felicitari ai primit ${salePercentage}% reducere la prima cumparatura!`;
        popup.textContent = popUpContent;
        document.body.appendChild(popup);
    }

    setTimeout(showPopUp, delayInMilliseconds);


}