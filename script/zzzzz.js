var congress = data.results[0].members;
​
​
var stringTabla = "";
​
congress.forEach(congressman => {
if (congressman.middle_name == null) {
    congressman.middle_name = " "
};
​
var name = congressman.last_name + ", " + congressman.first_name + " " + congressman.middle_name;
​
stringTabla = stringTabla + '<tr>' + '<td> <a href="' + congressman.url + '" target="_blank">' + name + '</a> </td>'
+ '<td>' + congressman.party + '</td>'
+ '<td>' + congressman.state + '</td>'
+ '<td>' + congressman.seniority + '</td>'
+ '<td>' + congressman.votes_with_party_pct + ' %' + '</td>'
'</tr>'
});
​
​
​
​
​
var congress = data.results[0].members;
​
var democrat = 0;
var republican = 0;
var independent = 0;
var percDemocrat = 0;
var percRepublican = 0;
var percIndependent = 0;
​
congress.forEach(congressman => {
    if (congressman.party == "D") {
        democrat = ++democrat;
        percDemocrat += congressman.votes_with_party_pct;
    }
    else if (congressman.party == "R") {
        republican = ++republican;
        percRepublican += congressman.votes_with_party_pct;
    }
    else {
        independent = ++independent;
        percIndependent += congressman.votes_with_party_pct;
    }
});
​
var promDemocrat = (percDemocrat / democrat).toFixed(2);
var promRepublican = (percRepublican / republican).toFixed(2);
var promIndependent = (percIndependent / independent).toFixed(2);
var totalCongress = democrat + republican + independent;
if (isNaN(percIndependent))
percIndependent = 0;
var promtotal = ((percDemocrat + percRepublican + percIndependent) / totalCongress).toFixed(2);
​
var Statistics = {
    'ataglance': [
        {
            'Party': 'Democrat',
            'Number': democrat,
            'Average': promDemocrat,
        },
        {
            'Party': 'Republican',
            'Number': republican,
            'Average': promRepublican,
        },
        {
            'Party': 'Independent',
            'Number': independent,
            'Average': promIndependent,
        },
        {
            'Party': 'TOTAL',
            'Number': totalCongress,
            'Average': promtotal,
        }
    ],
    'LeastAttendance': [],
    'MostAttendance': [],
    'LeastLoyal': [],
    'MostLoyal': [],
};
​
var stringTablaGlance = "";
Statistics.ataglance.forEach(element => {
    stringTablaGlance = stringTablaGlance + '<tr>' 
    + '<td>' + element.Party + '</td>' 
    + '<td>' + element.Number + '</td>'  
    + '<td>' + element.Average + ' %'  + '</td>' + '</tr>'
});
​
​
//creo un array temporal
var temporal = congress.slice();
​
​
console.log(temporal);
​
//ordeno least (de mayor a menor)
temporal.sort((a, b )=> b.missed_votes_pct - a.missed_votes_pct);
var tenperc = (temporal.length * 10)/100;
Statistics.LeastAttendance = temporal.slice(0, Math.trunc(tenperc));
​
var stringleastatt = "";
Statistics.LeastAttendance.forEach(valor => {
    if (valor.middle_name == null) {
        valor.middle_name = " "
    }
    var name = valor.last_name + ", " + valor.first_name + " " + valor.middle_name;
    stringleastatt = stringleastatt + '<tr>' + '<td> <a href="' + valor.url + '" target="_blank">' + name + '</a> </td>'
    + '<td>' + valor.missed_votes + '</td>'
    + '<td>' + valor.missed_votes_pct + ' %' + '</td>'
    '</tr>'  
    return stringleastatt;
});
​
//ordeno most (de menor a mayor)
temporal.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
Statistics.MostAttendance = temporal.slice(0, Math.trunc(tenperc));
​
var stringmostatt = "";
Statistics.MostAttendance.forEach(valor => {
    if (valor.middle_name == null) {
        valor.middle_name = " "
    }
    var name = valor.last_name + ", " + valor.first_name + " " + valor.middle_name;
    stringmostatt = stringmostatt + '<tr>' + '<td> <a href="' + valor.url + '" target="_blank">' + name + '</a> </td>'
    + '<td>' + valor.missed_votes + '</td>'
    + '<td>' + valor.missed_votes_pct + ' %' + '</td>'
    '</tr>'  
    return stringmostatt;
});
​
//ordeno most (de mayor a menor)
temporal.sort((a, b )=> b.votes_with_party_pct - a.votes_with_party_pct);
Statistics.MostLoyal = temporal.slice(0, Math.trunc(tenperc));
​
var stringmostloyal = "";
Statistics.MostLoyal.forEach(valor => {
    if (valor.middle_name == null) {
        valor.middle_name = " "
    }
    var name = valor.last_name + ", " + valor.first_name + " " + valor.middle_name;
    stringmostloyal = stringmostloyal + '<tr>' + '<td> <a href="' + valor.url + '" target="_blank">' + name + '</a> </td>'
    + '<td>' + valor.total_votes + '</td>'
    + '<td>' + valor.votes_with_party_pct + ' %' + '</td>'
    '</tr>'
return stringmostloyal;
});
​
​
​
//ordeno most (de menor a mayor)
temporal.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
Statistics.LeastLoyal = temporal.slice(0, Math.trunc(tenperc));
​
var stringleastloyal = "";
​
Statistics.LeastLoyal.forEach(valor => {
    if (valor.middle_name == null) {
        valor.middle_name = " "
    }
    var name = valor.last_name + ", " + valor.first_name + " " + valor.middle_name;
    stringleastloyal = stringleastloyal + '<tr>' + '<td> <a href="' + valor.url + '" target="_blank">' + name + '</a> </td>'
    + '<td>' + valor.total_votes + '</td>'
    + '<td>' + valor.votes_with_party_pct + ' %' + '</td>'
    '</tr>'
return stringleastloyal;
});
​
​
​
var Head = document.querySelector('[data-page]').getAttribute("data-page");
console.log(Head);
if (Head == "senate") {
    document.getElementById("data").innerHTML = stringTabla;
}
else if (Head == "house") {
    document.getElementById("data").innerHTML = stringTabla;
}
else if (Head == "attsenate") {
    document.getElementById("leastatt").innerHTML = stringleastatt;
    document.getElementById("mostatt").innerHTML = stringmostatt;
    document.getElementById("atglance").innerHTML = stringTablaGlance;
}
else if (Head == "atthouse") {
    document.getElementById("leastatt").innerHTML = stringleastatt;
    document.getElementById("mostatt").innerHTML = stringmostatt;
    document.getElementById("atglance").innerHTML = stringTablaGlance;
}
else if (Head == "loyalsenate") {
    document.getElementById("mostloyal").innerHTML = stringmostloyal;
    document.getElementById("leastloyal").innerHTML = stringleastloyal;
    document.getElementById("atglance").innerHTML = stringTablaGlance;
}
else if (Head == "loyalhouse") {
    document.getElementById("mostloyal").innerHTML = stringmostloyal;
    document.getElementById("leastloyal").innerHTML = stringleastloyal;
    document.getElementById("atglance").innerHTML = stringTablaGlance;
}