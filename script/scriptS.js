const app = new Vue({ 
    el: "#data-data",  
    data:{
        member: []
    }

});

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
  method: "GET", 
  headers: new Headers({
    "X-API-Key": 'rDYUl6e93qumCwukl6dAaoa8TUr4c6Nt52clfUF'
  }),
}).then(function (response) {
  if (response.ok)
    return response.json();
  throw new Error(response.statusText);
}).then(function (json) {

  mifuncion(json);

});



function mifuncion(data) {

  app.member = data.results[0].members;

}




