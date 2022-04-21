"use strict";
//@ts-check 

// css tiedosto
var tyylit;

var tekstiContainer;

window.onload = function() {

    
    let varinum = 0;
    
    let canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    
    let canvas1 = document.getElementById("canvas1");
    var ctx1 = canvas1.getContext('2d');
    
    let canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext('2d');
    
    let canvas3 = document.getElementById("canvas3");
    var ctx3 = canvas3.getContext('2d');
    
    let colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00","#00ff00", "#00ffff", "#ffffff"];


    let div = document.createElement("div");
    tyylit = document.styleSheets[0];
    div.setAttribute("id", "alue");

    let svg = document.getElementById("svg1");
    
    document.body.appendChild(div);
    div.appendChild(svg);
    for (let i = 0; i < 10; i++) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
        rect.setAttribute("x", "-10%");
        rect.setAttribute("y", "0");
        rect.setAttribute("width", "10%");
        rect.setAttribute("height", "10%");
        let stop = document.getElementById("stop2");
        stop.setAttribute("stop-color", colors[0]);
        rect.setAttribute("fill", "url(#Gradient1)");
        rect.setAttribute("id", "palkki"+i);
        svg.appendChild(rect);
    }

    /**
     * Luodaan palkit
     */
    //let rectit = document.querySelectorAll("rect");
    for (let i = 0; i < 10; i++) {
        let recti = document.getElementById("palkki"+i);
        recti.style.animationDelay = "0"+i*0.2+"s";
        recti.style.animationDuration = "5s";
        recti.style.animationIterationCount= "infinite";
        recti.setAttribute("class", "palkit");
        recti.addEventListener("animationiteration", animlistener);
    }



    /**
     * Tapahtumakuuntelija palkkien värien vaihdolle
     * @param {*} e tapahtuma
     */
    function animlistener(e) {
        let stop = document.getElementById("stop2");
        let grad = document.getElementById("Gradient1");
        //console.log(grad);
          //  console.log(e.target + ": " + e.elapsedTime);
          let a = e.elapsedTime % 5;
          let b = e.elapsedTime % 10;
          var i = 0;
       // while (i < colors.length) {
           if (a == 0) {
                stop.setAttribute("stop-color", colors[1]);
           }
           if (b == 0) {
                stop.setAttribute("stop-color", colors[0]);
            }
           
            if (varinum >= colors.length-1) {
                varinum = 0;
            }
        //}
        varinum++;
    }


    // Tehään pari pingiviinikuvaa
    for (let i = 0; i < 2; i++) {
        let img = document.createElement("img");
        img.setAttribute("src", "https://appro.mit.jyu.fi/tiea2120/vt/vt4/penguin.png");
        img.setAttribute("alt", "pingu");
        img.setAttribute("id", "pingu"+i);
        document.body.appendChild(img);
    }


    // Luodaan pöllökuva
    let pollo = document.createElement("img");
    pollo.src = "https://appro.mit.jyu.fi/cgi-bin/tiea2120/kuva.cgi";
    pollo.alt = "owl";
    pollo.id = "owl";

    /**
     * Piirretään pöllö neljässä osassa canvakselle
     */
    pollo.addEventListener('load', e => {
        let liikuta = etsiKeyframesaanto("liikuta");
        let liikuta1 = etsiKeyframesaanto("liikuta1");
        let liikuta2 = etsiKeyframesaanto("liikuta2");
        let liikuta3 = etsiKeyframesaanto("liikuta3");


        canvas.setAttribute("height",pollo.height/2);
        canvas1.setAttribute("height",pollo.height/2);
        canvas2.setAttribute("height",pollo.height/2);
        canvas3.setAttribute("height",pollo.height/2);

        canvas.setAttribute("width",pollo.width/2);
        canvas1.setAttribute("width",pollo.width/2);
        canvas2.setAttribute("width",pollo.width/2);
        canvas3.setAttribute("width",pollo.width/2);

        // ylävas
        liikuta.deleteRule(liikuta.cssRules[0].keyText);
        liikuta.deleteRule(liikuta.cssRules[0].keyText);
        liikuta.appendRule("0% { transform: translate(0%); }");
        liikuta.appendRule("100% { transform: translate(calc(-" + (pollo.width/2) + "px + 50vw), calc(-" + (pollo.height/2) + "px + 50vh)); }");

        // alavas
        liikuta3.deleteRule(liikuta3.cssRules[0].keyText);
        liikuta3.deleteRule(liikuta3.cssRules[0].keyText);
        liikuta3.appendRule("0% { transform: translate(0%); }");
        liikuta3.appendRule("100% { transform: translate(calc(50vw - " + (pollo.width/2) + "px), calc(-50vh + " + (pollo.height/2) + "px)); }");

        // yläoik
        liikuta1.deleteRule(liikuta1.cssRules[0].keyText);
        liikuta1.deleteRule(liikuta1.cssRules[0].keyText);
        liikuta1.appendRule("0% { transform: translate(0%); }");
        liikuta1.appendRule("100% { transform: translate(calc(-50vw + " + (pollo.width/2) + "px), calc(50vh - " + (pollo.height/2) + "px)); }");

        // alaoik
        liikuta2.deleteRule(liikuta2.cssRules[0].keyText);
        liikuta2.deleteRule(liikuta2.cssRules[0].keyText);
        liikuta2.appendRule("0% { transform: translate(0%); }");
        liikuta2.appendRule("100% { transform: translate(calc(-50vw + " + (pollo.width/2) + "px), calc(-50vh + " + (pollo.height/2) + "px)); }");

        ctx2.drawImage(pollo, pollo.width/2, pollo.height/2, pollo.width, pollo.height, 0, 0, pollo.width, pollo.height); //alavas

        ctx3.drawImage(pollo, -pollo.width/2, pollo.height/2, pollo.width, pollo.height, -pollo.width/2, 0, pollo.width, pollo.height); //alaoik

        ctx.drawImage(pollo, 0, 0, pollo.width/2, pollo.height/2, 0, 0, pollo.width/2, pollo.height/2); //yläoik

        ctx1.drawImage(pollo, pollo.width/2, -pollo.height/2, pollo.width, pollo.height, 0, -pollo.height/2, pollo.width, pollo.height); //ylävas
        
    });


    //window.requestAnimationFrame(draw); 
    
    let start, previousTimeStamp;
    let teksti;

    function draw(timestamp) {
        let canvas_scoller = document.getElementById("canvas4");
        var ctx_scrl = canvas_scoller.getContext('2d');
        //let teksti = "";
        if (start === undefined) {
            start = timestamp;
        }
        //console.log(timestamp);
        const elapsed = timestamp - start;
        if (previousTimeStamp !== timestamp) {
            teksti = kalevala();
            ctx_scrl.font = '34px Arial bold';
            ctx_scrl.textAlign = "center";
            ctx_scrl.fillStyle = "white";
            ctx_scrl.fillText(teksti, 150, 50);
        }
        console.log(teksti[teksti.length-1]);
        //window.requestAnimationFrame(draw);
        //console.log(elapsed);
        if (elapsed < 0) { // Stop the animation after 2 seconds
            previousTimeStamp = timestamp;
            window.requestAnimationFrame(draw);
          } 
    }
    window.requestAnimationFrame(draw);
    
};



/**
 * Etsii ja palauttaa keyframe säännön
 * @param {*} saanto 
 */
 function etsiKeyframesaanto(saanto) {
    for (let i = 0; i < tyylit.cssRules.length; i++) {
    if (tyylit.cssRules[i].type == window.CSSRule.KEYFRAMES_RULE && 
        tyylit.cssRules[i].name == saanto) {
            return tyylit.cssRules[i];
        }
    }
    return null;
}

