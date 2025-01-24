const $ = e => document.querySelector(e);
let bazaSkladnikow = [];

String.prototype.up = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
};


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

    console.log(bazaSkladnikow);
    

}