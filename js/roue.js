var padding = { top: 0, right: 0, bottom: 0, left: 0 };
var w = window.innerWidth * 0.95;
var h = w;
var r = Math.min(w, h) / 2;
var rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();

// Déclaration des données pour la roue
var data = [
    { "label": "Coupon -5%", "value": 1, "question": "Bravo ! Vous avez gagné un coupon d'une valeur de 5% sur votre prochain achat" },
    { "label": "Un voyage à Cuba", "value": 2, "question": "Ouai bravo. C'est top !" },
    { "label": "Nuit de reve", "value": 3, "question": "Bravo ! Vous avez gagné une nuit dans la suite" },
    { "label": "Coupon -15%", "value": 4, "question": "Vous avez gagné un coupon d'une valeur de 15% sur votre prochain achat" },
    { "label": "Cocktail offert !", "value": 5, "question": "Bravo ! Vous avez gagné un cocktail de votre choix !" },
    { "label": "Perdu", "value": 6, "question": "Vous avez perdu 😫" }
];

// Initialiser le SVG
var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width", w)
    .attr("height", h);

var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

var vis = container.append("g");

var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
var arc = d3.svg.arc().outerRadius(r);

// Ajouter les segments de la roue
var arcs = vis.selectAll("g.slice")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "slice");

arcs.append("path")
    .attr("fill", function (d, i) { return color(i); })
    .attr("d", arc);

// Ajouter du texte ou une image SVG pour chaque segment
arcs.each(function (d, i) {
    if (data[i].label === "Cocktail offert !") {
        // Afficher le SVG pour "Cocktail offert !"
        d3.select(this)
            .append("svg:image")
            .attr("xlink:href", "src/img/cocktail.svg")
            .attr("width", 100)
            .attr("height", 100)
            .attr("x", -180)
            .attr("y", -45);
    } else {
        // Ajouter le texte pour les autres segments
        d3.select(this)
            .append("text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 80) + ")";
            })
            .attr("text-anchor", "middle")
            .text(data[i].label);
    }
});

function spin() {
    container.on("click", null);
    const ps = 360 / data.length;
    const rng = Math.floor((Math.random() * 1440) + 360);
    rotation = Math.round(rng / ps) * ps;
    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? (picked % data.length) : picked;

    if (oldpick.indexOf(picked) !== -1) {
        spin();
        return;
    } else {
        oldpick.push(picked);
    }

    rotation += 90 - Math.round(ps / 2);
    vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function () {
            const resultLabel = data[picked].label;
            const resultMessage = data[picked].question;
            const event = new CustomEvent('wheelEnd', {
                detail: { label: resultLabel, message: resultMessage }
            });
            window.dispatchEvent(event);
        });
}

function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}

// Ajouter la flèche à droite de la roue
svg.append("g")
    .attr("class", "pointer")
    .attr("transform", "translate(" + (w / 2 + r + 10) + "," + (h / 2) + ")")
    .append("polygon")
    .attr("points", "0,-10 -28,0 0,10")
    .style({ "fill": "red" });

// Ajouter le bouton pour lancer la roue
container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 45)
    .style({ "fill": "white", "cursor": "pointer" });

container.append("text")
    .attr("x", 0)
    .attr("y", 8)
    .attr("text-anchor", "middle")
    .text("Lancer")
    .style({ "font-weight": "bold", "font-size": "20px" });

container.on("click", spin);
