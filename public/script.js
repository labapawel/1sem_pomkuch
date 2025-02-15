const $ = e => document.querySelector(e);
let bazaSkladnikow = [];

String.prototype.up = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
};

function szukajPrzepisow(){

    let prompt = `
        Jesteś specjalistą od gotowania, potrzebuję propozycje przepisów w formie json {nazwa, skladniki, czasgotowania} dla podanych składników:
        ${bazaSkladnikow.join(', ')}

        nie dodawaj dodatkowych opisów
        nie dodawaj dodatkowych komentarzy
        nie dodawaj dodatkowych informacji
    `;

    fetch('/gemini',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: prompt
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
      });

}

function wyswietlListeSkladnikow(){
    $('#listaSkladnikow').innerHTML = '';
    bazaSkladnikow.forEach(skladnik => {
        let li = document.createElement('li');
        li.innerHTML = skladnik;
        $('#listaSkladnikow').appendChild(li);
    });
}


function dodajSkladnik(){
    let skladniki = $('#poleSkladnikow').value;
    let skladnikiLista = skladniki.split(',');
    skladnikiLista.forEach(skladnik => {
        skladnik = skladnik.trim().up();
        if(!bazaSkladnikow.find(el=>el == skladnik) )
        {
            bazaSkladnikow.push(skladnik);
        }
    });
    $('#poleSkladnikow').value = '';
    wyswietlListeSkladnikow()
    console.log(bazaSkladnikow);
    

}