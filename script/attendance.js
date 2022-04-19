var tengo = JSON.parse(JSON.stringify(datos, null, 2));
var member = tengo.results[0].members;
var democrat = 0;
var republican = 0;
var independent = 0;
var PROdemocrat = 0;
var PROrepublican = 0;
var PROindependent = 0;


member.forEach(element => {
    if (element.party == "D") {
        ++democrat;
        PROdemocrat += element.votes_with_party_pct;
    } else if (element.party == "R") {
        ++republican;
        PROrepublican = PROrepublican + element.votes_with_party_pct;
        PROrepublican.toFixed(2);
        console.log(element.votes_with_party_pct);
        console.log(PROrepublican);
    } else {
        ++independent;
        PROindependent += element.votes_with_party_pct;
        
    }
});
console.log(PROrepublican);

var PROMd=(PROdemocrat.toFixed(3) / democrat).toFixed(3);
var PROMr=(PROrepublican.toFixed(3) / republican).toFixed(3);
var PROMi=(PROindependent / independent).toFixed(3);
var totC=(democrat + republican + independent) ;
var totP=((PROdemocrat+PROindependent+PROrepublican)/totC).toFixed(3);

var estadistica = {
    'senado': [
        {
            'Party': 'Democrat',
            'catidad': democrat,
            'promedio': PROMd,
        },
        {
            'Party': 'Republican',
            'catidad': republican,
            'promedio': PROMr,
        },
        {
            'Party': 'Independent',
            'catidad': independent,
            'promedio':PROMi,
        },
        {
            'Party': 'TOTAL',
            'catidad': totC,
            'promedio':totP,
        }

    ],
};

var Ssenado = JSON.parse(JSON.stringify(estadistica, null, 2));
var sena = Ssenado.senado;

sena.forEach(element => {

    document.getElementById("galance").innerHTML +=
`
<tr>
  <td>${element.Party}</td>
  <td>${element.catidad}</td>
  <td>${element.promedio}</td>
</tr>

`
});

var ordenadoM = member.sort(function (prev, next) {
    return next.missed_votes_pct - prev.missed_votes_pct;//cambia prev nex mayor o menor
  });


  //saco el 10 porciento
var diesP = ordenadoM.length*0.10; 

// IMPRIMO 
for (let i = 0; i < diesP; i++) {

    document.getElementById("topAttendance").innerHTML +=
`
<tr>
  <td><a href="${ordenadoM[i].link}">${ordenadoM[i].first_name + "  " + ordenadoM[i].last_name + "  "+ (ordenadoM[i].middle_name||" ")}</a></td>
  <td>${ordenadoM[i].missed_votes}</td>
  <td>${ordenadoM[i].missed_votes_pct}</td>
</tr>

`;
    
}
