//Készítünk egy függvényt, ami azért felel, hogy lekérje az adatot a szerverről
function getServerData(url) { //vár egy URTL-t, ahonnan az adatokat lekéri
    //1.) küldünk egy felparaméterezett fetch kérést
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };
    //2.) Elindítjuk a fetch-kérést a szerver felé. A kapott url-re küldje el és a fetchOptions változóban van a beállítás
    return fetch(url, fetchOptions).then(
        response => response.json(),//megkapja a választ, ez lesz a függvény visszatérési értéke, ami egy json parsolt adathalmaz lesz
        err => console.error(err) //hiba esetén fog lefutni
    );
}
function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement; //kivesszük az adatsort
    let id = tr.querySelector("td:first-child").innerHTML; //ez a sor nem jó, mivel nincs id-je a szavainknak a mi esetünkben
    
    let fetchOptions = {
        method:"DELETE",
        mode:"cors",
        cache:"no-cache"
    };
    //majd elindítjuk a delete fetch-et a server felé
    fetch(`http://localhost:3000/randomwords/${id}`, fetchOptions)
    .then(
        resp=> resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startgetData();
        }
    )
    }

    function putServerData() {
        let data = document.querySelector("output");
        let data2 = data.value;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(data2)
    };
    
    return fetch("http://localhost:3000/randomwords", fetchOptions)
    .then(resp => resp.json())
    .then(json => console.log(json));
    
    }
    
    document.querySelector("#wordsInput").addEventListener("click", function() { 
        putServerData();
    })




//készítsünk egy gombot, ami le fogja kérni az adatokat (gombra kattintással kérjük le a getServerData adatokat)
//Létrehozzuk az eseménykezelőt a button-hoz
document.querySelector("#server-button").addEventListener("click", startgetData);
    //Indítsuk el a lekérést
//Valósítsuk meg azt, hogy a getServerData egy promise-szal térjen vissza,
//hogy arra is meg lehessen hívni a .then-t, hogy az oldalon is lássuk az adatokat ne csak a console-ban

function startgetData() {
getServerData("http://localhost:3000/words").then(
    data => fillDataTable(data, "wordTable") //Így már bármiylen más függvénybe is be tudjuk tenni a getServerData-t és meg tudjuk kapni az adatokat a Promise .then metódusával
);
}
 

function getRandomWords() {
    let words = getServerData('http://localhost:3000/words').then(data => {
        const wordsToMemorize = document.querySelector('#words-to-memorize');
        document.querySelector("#wordsInput").addEventListener("click", function() {
            let temp = wordsToMemorize.value;
            generatedArrayELements.innerHTML = "";
            for(let i = 0; i < temp; i++) {
            let rander = Math.floor(Math.random() * 3000);
            generatedArrayELements.innerHTML += data[rander] + "</br>";
            
            

           
        }})
});
}
getRandomWords();

//Függvény, ami kitölti a táblázatot
function fillDataTable(data, tableId) {
    let table = document.querySelector(`#${tableId}`);
    if (!table) {
        console.error("No table found");
        return;
    }

    let tBody = table.querySelector("tbody"); //tbody itt egy element selector lesz, ide fogom az elemeket betölteni
    //Rajzoljuk ki for ciklussal a táblázatnak a sorait
    for(let row of data) {
        let tr = createAnyElement("tr"); //tr-t készítünk, attributumot nem adunk most meg. Mivel attributum nélkül adom meg, a ciklus egyszer sem fog lefutni 
        //Belső cikus ami bejárja az egyes objektumokat kulcs-érték páronként
        for(let k in row) {
            let td = createAnyElement();
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        //A td-t hozzáadom a táblázatom table body-hoz
        tBody.appendChild(tr);
    } 
}

//Segédfüggvény készítése, mellyel automatikusan bármilyen html-elemet le tudok gyártani
function createAnyElement(name, attributes) {
    let element = document.createElement(name); //Létrehozunk a megfelelő néven egy elementet

    //Majd az attributumokon végigmegyek egy for-in ciklussal
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]); //neve az attributumnak legyen key, értéke pedig attributes[key]
    }
    return element; 

}
function createBtnGroup() {
    let group = createAnyElement("div", {class: "btn btn-group"}); //Egy div-et készítünk, aminek az attributuma class
    let infoBtn = createAnyElement("button", {class: "btn btn-info", onclick:"getInfo()"});
    infoBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    let delBtn = createAnyElement("button", {class: "btn btn-danger", onclick:"delRow(this)"}); //Ha a böngészőben beírom attributumként a függvényt, akkor a this-t át kell adni, jhogy megkaphassuk a gombot
    delBtn.innerHTML = '<i class="fas fa-user-minus"></i>';

    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;

}



// https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    
    return {
      total,
      minutes,
      seconds
    };
  }
  
  
  function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
  
      
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
  
  

  document.querySelector("#wordsInput").addEventListener("click", function() {
    const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    initializeClock('clockdiv', deadline);
  });

 
  document.querySelector("#check-button").addEventListener("click", function() {
    let numberOfRandomWords = document.getElementById("selectedtombelemek");
    
    
    console.log(Object.keys(numberOfRandomWords));

    
  });
  
