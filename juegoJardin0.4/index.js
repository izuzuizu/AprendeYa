let cont =0 
let conta =0
let imgSelec = ""
let textoSelec = ""
let intentos = 3 // de esta variable depende cuantas imagenes y palabras se van a crear
let errados = 0
let numerosUsados = []
let puntos = document.getElementById('puntos')
puntos = puntos.innerHTML
puntos = parseInt(puntos)
console.log("puntos: "+puntos)
let palabras = [
    'letra a', 'letra b', 'letra c', 'letra d', 'letra e', 'letra f', 'letra g', 'letra h', 'letra i', 'letra j',
    'letra k', 'letra l', 'letra m', 'letra n', 'letra ñ', 'letra o', 'letra p', 'letra q', 'letra r', 'letra s',
    'letra t', 'letra u', 'letra v', 'letra w', 'letra x', 'letra y', 'letra z', 'numero 0', 'numero 1', 'numero 2',
    'numero 3', 'numero 4', 'numero 5', 'numero 6', 'numero 7', 'numero 8', 'numero 9', 'jirafa', 'perro', 'gato',
    'elefante', 'león', 'tigre', 'oso', 'cebra', 'canguro', 'hipopótamo', 'rinoceronte', 'mono', 'serpiente',
    'cocodrilo', 'ballena', 'delfín', 'tiburón', 'pingüino', 'águila', 'búho', 'gallina', 'caballo', 'vaca',
    'cerdo', 'oveja', 'cabra', 'conejo', 'ratón', 'murciélago', 'zanahoria', 'brócoli', 'espinaca', 'calabacín',
    'tomate', 'pepino', 'pimiento', 'maíz', 'guisantes', 'calabaza', 'manzana', 'plátano', 'fresa', 'naranja',
    'uva', 'sandía', 'piña', 'melón', 'pera', 'mango', 'mamá', 'papá', 'abuela', 'abuelo', 'casa', 'coche',
    'sol', 'luna', 'árbol', 'flor', 'pelota', 'juguete', 'libro', 'agua', 'leche', 'pan', 'mano', 'pie'
];
let opciones = []
function generadorNumerosAleatorios() {
        if (numerosUsados.length === 105) {
            throw new Error('No hay más números disponibles');
        }
        let numeroAleatorio;
        do {
            numeroAleatorio = Math.floor(Math.random() * 105);
        } while (numerosUsados.includes(numeroAleatorio));
        numerosUsados.push(numeroAleatorio);
        console.log(numeroAleatorio)
        return numeroAleatorio;
    // esta funcion es para que no se repitan los numeros
}


async function opcioness() {
		const codigo = document.getElementById(`palabras`)
    for (let index = 1; index <= intentos; index++) {
        let num = generadorNumerosAleatorios()
        opciones[index] = palabras[num]
        codigo.innerHTML += `
        <div class="palabra" id="op${index}">                            
            <input type="radio" name="palabra" id="palabra${index}">
            <label for="palabra${index}">${opciones[index]}</label>
        </div>
        `
    }
    // acá creo las palabras en base a los numeros aleatorios 


        var parent = document.getElementById("palabras");
        var divs = parent.children;
        var frag = document.createDocumentFragment();
        while (divs.length) {
        frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
        }
        parent.appendChild(frag);
    // aca desordeno las palabras en el php para que no esten en el mismo lugar que las imagenes
    
        const codigo2 = document.getElementById(`imagenes`)
	for (let index = 1; index <= intentos; index++) {
        imagen = await buscar(opciones[index])
        codigo2.innerHTML += `
        <div class="imagen" id="img${index}">
            <input type="radio" name="imagen" id="imagen${index}"> 
            <img src="${imagen}" for="imagen${index}">   
        </div>
        `; 
	}
    // aca creo las imagenes llamando a la funcion buscar(que usa la api de bing)


}
opcioness()
function imgChecker(input) {
    var radius = document.getElementsByName(input);
        for (var i = 0; i < radius.length; i++) {
            if (radius[i].checked) {
                // El radius está marcado
                imgSelec=radius[i].id
                imgSelec = imgSelec.replace("imagen", "palabra");
                console.log(imgSelec+" seleccionada");
            } else {
                // El radius no está marcado
            }
        }
}
// esta funcion se fija cual input:radio esta siendo "checked" para guardarlo en un variable con "palabra" + concatenado con el id del input
function textChecker(input) {
    var radius = document.getElementsByName(input);
        for (var i = 0; i < radius.length; i++) {
            if (radius[i].checked) {
                textoSelec=radius[i].id
                console.log(textoSelec+" seleccionada");
            } else {
            }
        }
}
// esta funcion se fija cual input:radio esta siendo "checked" para guardarlo en un variable con "palabra" + concatenado con el id del input xd

document.addEventListener('click', function(event) { // esta funcion hace que lo que viene funcione cada vez que se hace click en cualquier input de la pagina
    if (event.target.tagName === 'INPUT') {
        imgChecker('imagen')
        textChecker('palabra')
        const codigo3 = document.getElementById("cod") // "cod" es una caja en el index que tiene un display none para que se puedan insertar fragmentos de codigo como el audio pero sin que se vea en la pagina
        let conta = 1
        for (let index = 1; index <= intentos; index++) { //este ciclo lo que hace es fijarse cuando los 3 input estan disabled
            const palabra = document.getElementById(`palabra${index}`);
            if (palabra.disabled == true) {
                conta +=1
            }
        }

        if (imgSelec != "" && textoSelec != "") {
            console.log("definido")
            //este codigo se acciona cuando el usuario ya eligio una imagen y un texto
            if (imgSelec == textoSelec) {
                //este codigo se acciona cuando la imagen y el texto coinciden
                console.log("iguales!");
                let cont = 0;
                let intervalo = setInterval(() => { // este intervalo suma 5 puntos dividido en 5 segundos para que haga la ""animacion"" 
                    puntos += 1;
                    let puntaje = document.getElementById('puntaje');
                    puntaje.innerHTML = `<label>Tus puntos: <p id="puntos">${puntos}<p></label>`;
                    cont += 1;
                    if (cont >= 5) {
                        clearInterval(intervalo);
                    }
                }, 50);
                codigo3.innerHTML += ` 
                    <audio autoplay id="audioo">
                        <source src="audios/Ganaste.mp3" type="audio/mpeg">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                `;// aca creo reproduzco el audio corto para cuando la imagen y la palabra coinciden
                setTimeout( // en todo este timeout, al pasar los 900 milisegundos del audio (no son esos con exactitud) borra el fragmento de texto del audio para que no se vuelva a reproducir en el futuro, le saco el checked a los inputs clickeados y los deshabilito
                    function name(params) {
                    const codigo4 =document.getElementById('audioo')
                    codigo4.remove()
                // quitar cheked de input:radio
                for (var i = 1; i <= intentos; i++) {
                let miOpcion = document.getElementById(`palabra${i}`);
                    if (miOpcion.checked == true) {
                        miOpcion.checked= false
                        miOpcion.disabled = true;
                    }
                console.log(miOpcion)
                }
                for (var i = 1; i <= intentos; i++) {
                let miOpcion = document.getElementById(`imagen${i}`);
                    console.log(miOpcion)
                    if (miOpcion.checked == true) {
                        miOpcion.checked= false
                        miOpcion.disabled = true; 
                }
            }
                    console.log(conta)
                    if (conta == intentos) {// este if se acciona cuando los 3 input de abajo estan deshabilitados
                        if (errados > intentos/2) {// este if se fija cuantas veces se equivoco el usuario para saber si poner el audio "Ganastee.mp3" o "Perdistee.mp3" (todavia no se bien que poner en la condicion ya que no se tampoco si vamos a seguir usando 3 palabras o mas)
                            
                            codigo3.innerHTML += `
                            <audio autoplay id="audioo">
                                <source src="audios/Perdistee.mp3" type="audio/mpeg">
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                            `;
                            
                            let form = document.getElementById("miFormulario");
                            setTimeout(() => {
                                
                                const codigo4 =document.getElementById('audioo')
                                codigo4.remove()
                            form.innerHTML += `
                                <input type="number" name="puntos" value="${puntos}">
                                <input type="submit">
                            `
                            event.preventDefault()
                            form.submit()
                            }, 1500);
                        } else {
                            
                        codigo3.innerHTML += `
                        <audio autoplay id="audioo">
                            <source src="audios/Ganastee.mp3" type="audio/mpeg">
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                        `;
                        
                        let form = document.getElementById("miFormulario");
                        setTimeout(() => {
                            
                            const codigo4 =document.getElementById('audioo')
                            codigo4.remove()
                        form.innerHTML += `
                            <input type="number" name="puntos" value="${puntos}">
                            <input type="submit">
                        `
                        event.preventDefault()
                        form.submit()
                        }, 2500);
                        }
                    }
                    },900);


            }else{
                console.log("no iguales")
                codigo3.innerHTML += `
                    <audio autoplay id="audioo">
                        <source src="audios/Perdiste.mp3" type="audio/mpeg">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                `
                
                setTimeout(
                    function a(params) {
                    const codigo4 =document.getElementById('audioo')
                    codigo4.remove()
                // quitar cheked de input:radio
                for (var i = 1; i <= intentos; i++) {
                    let miOpcion = document.getElementById(`palabra${i}`);
                    console.log(miOpcion)
                    if (miOpcion.checked == true) {
                            miOpcion.checked =false
                    }
                }
                for (var i = 1; i <= intentos; i++) {
                    var miOpcion = document.getElementById(`imagen${i}`);
                    if (miOpcion.checked == true) {
                        miOpcion.checked = false
                        // const miOpcion2 = document.getElementById(`${miOpcion.id}`);
                        // miOpcion.remove();
                        
                        // setTimeout(function a() {
                        //     padre.innerHTML +=`
                        //         <input type="radio" name="imagen" id="${miOpcion.id}"> 
                        //     `
                        //     // Establecer las propiedades y atributos del nuevo elemento
                        // }, 500);
                    }
                }
                }, 600);
                errados += 1
            }
        }else{
            console.log("indefinido")

        }
        imgSelec = ""
        textoSelec = ""
        
    }
});



// cosas que faltan hacer:
//    -que al iniciar la pagina se pida registrar el usuario y guarde el nombre de usuario(nickname) en la variable a la que le puse "agustincito"
//    -
//    -
//    -
//    -

//Pedirle al usuario que se registre


