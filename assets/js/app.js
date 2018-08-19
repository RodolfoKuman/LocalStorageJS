const listaTweets = document.getElementById('lista-tweets');



//Event Listeners

eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit',
    agregarTweet);

    listaTweets.addEventListener('click', borrarTweet);

    document.addEventListener('DOMContentLoaded', localStorageListo);
}


// Funciones

function agregarTweet(e){
    const tweet = document.getElementById('tweet').value;
    
    //botonEliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    
    //creando elemento
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);

    // Añadir a local storage
    agregarTweetLocalStorage(tweet);
   
}

// Elimina tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }  
}

//Agrega tweet a local storage

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Cargar tweets al DOM desde local storage

function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(tweet => {

        //botonEliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //creando elemento
        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(botonBorrar);
        listaTweets.appendChild(li);
    });

}

function obtenerTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;

    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach( function(tweet, index) {
        if(tweet === tweetBorrar){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}


