var padding = {top:0, right:0, bottom:0, left:0},
            w = 400 - padding.left - padding.right,
            h = 400 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();

        var data = [
                           
            {"label":"Coupon -5%", "value":1, "question":"Bravo ! Vous avez gagné un coupon d'une valeur de 5% sur votre prochain achat"},//semi-colon
          
            {"label":"Un voyage à Cuba", "value":2, "question":"Ouai bravo. C'est top ! "},//semi-colon
          
            {"label":"Nuit de reve", "value":3, "question":"Bravo ! Vous avez gagné une nuit dans la suite"},//semi-colon
          
            {"label":"Coupon -15%", "value":4, "question":"Vous avez gagné un coupon d'une valeur de 15% sur votre prochain achat"},//semi-colon
          
            {"label":"Cocktail offert !", "value":5, "question":"Bravo ! Vous avez gagné un cocktail de votre choix !"},//semi-colon
           
            {"label":"Perdu", "value":6, "question":"Vous avez perdu 😫"},//semi-colon   
        
        ];


        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);

        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            

        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });

        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });

        container.on("click", spin);


        function spin(d) {
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
                    showResultPopup(resultLabel, resultMessage);
                });
        }

        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.11) + ",0L0," + (r*.04) + "L0,-" + (r*.03) + "Z")
            .style({"fill":"red"});

        //Cercle centre "Lancer"
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 45) // Rayon du cercle
            .style({"fill":"white","cursor":"pointer","background": "#CCEAF1"});

        //Texte bouton "Lancer"
        container.append("text")
            .attr("x", 0)
            .attr("y", 8)
            .attr("text-anchor", "middle")
            .text("Lancer")
            .style({"font-weight":"bold", "font-size":"20px"});
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }

            return array;

            // Gestion du formulaire
            document.getElementById('feedback-form').addEventListener('submit', function(event) {
                event.preventDefault();
                document.getElementById('form-container').style.display = 'none'; // Cache le formulaire
                spin(); // Démarre la roue
            });
        }