const app = new Vue({
    el: "#galance",
    data: {
        membe: []
    }
});

const ap = new Vue({
    el: "#topLoyal",
    data: {
        ordenadoM: []
    }
});

const aps = new Vue({
    el: "#bottomLoyal",
    data: {
        ordenadoB: []
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
    odena(json);
});

async function odena(mi) {

    var member = mi.results[0].members;

    ap.ordenadoM = await member.sort(function (pre, nex) {
        return pre.missed_votes_pct - nex.missed_votes_pct; //cambia prev nex mayor o menor
    });

    aps.ordenadoB = await member.sort(function (prev, next) {
        return next.missed_votes_pct - prev.missed_votes_pct;//cambia prev nex mayor o menor
    });

}

function mifuncion(data) {

    var member = data.results[0].members;

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


        } else {
            ++independent;
            PROindependent += element.votes_with_party_pct;
            console.log(PROindependent.toFixed(2));
            console.log(element.votes_with_party_pct);

        }
    });
    console.log(PROrepublican);

    var PROMd = (PROdemocrat.toFixed(3) / democrat).toFixed(3);
    var PROMr = (PROrepublican.toFixed(3) / republican).toFixed(3);
    var PROMi = 0;
    var totC = (democrat + republican + independent);
    var totP = ((PROdemocrat + PROindependent + PROrepublican) / totC).toFixed(3);

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
                'promedio': PROMi,
            },
            {
                'Party': 'TOTAL',
                'catidad': totC,
                'promedio': totP,
            }

        ],
    };



    var Ssenado = JSON.parse(JSON.stringify(estadistica, null, 2));
    app.membe = Ssenado.senado;





}

