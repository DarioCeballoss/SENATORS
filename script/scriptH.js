const appH = new Vue({ 
    el: "#data-H",  
    data:{
        memberH: []
    }
  
  });
  
  fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
  
  appH.memberH = data.results[0].members;
  
  }