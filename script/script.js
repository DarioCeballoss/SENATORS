//var tengo = JSON.parse(JSON.stringify(datos, null, 2));
//var member = tengo.results[0].members;

$ (function () {var tengo = JSON.parse(JSON.stringify(datos, null, 2));})

var member = tengo.results[0].members;

member.forEach(element => {
 
  document.getElementById("data-data").innerHTML +=
  `
  <tr>
  
    <td><a href="${element.url}">${element.first_name + "  " + element.last_name + "  "+ (element.middle_name||" ")}</a></td>
    <td>${element.party}</td>
    <td>${element.state}</td>
    <td>${element.seniority}</td>
    <td>${element.votes_with_party_pct + "%"}</td>
  
  </tr>
  
  `;
});

