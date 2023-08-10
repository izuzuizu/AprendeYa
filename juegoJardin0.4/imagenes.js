async function buscar(params) {
	let imagen
	let found = false
	if (params == 'letra ñ') {
		imagen = "imgs/enie.png"
		return imagen
	} else {
		
    const url = `https://ing-image-search1.p.rapidapi.com/images/search?q=${params} png horizontal&count=100000&mkt=es-AR`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0da5fe62c2msh1ee3f8c081ec628p1b74d6jsnd14d82b9f8e0',
		'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
		// estos son los parametros que hay que cambiar con otra cuenta de rapidapi si se terminan las consultas por mes
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
	var index = 0
	do {
		if (result.value[index].encodingFormat) {	
			let link = result.value[index].encodingFormat
		if (result.value[index].encodingFormat=="png") {
			if (link.startsWith('https://www.goyavirtual.com') || link.startsWith('https://assets') || link.startsWith('https://www.kindpng.com') || link.startsWith('https://carmelourso.files.wordpress.com') || link.startsWith('https://static.wikia.nocookie.net') || link.startsWith('https://lookaside.fbsbx.com') || link.startsWith('https://assets.stickpng') || link.startsWith('https://assets.stickpng.com') || link.startsWith('https://publicdomainvectors.org') || link == "https://assets.stickpng.com/images/58e341d725b2455e1b159d8b.png" || link == "https://www.kindpng.com/picc/m/63-633578_letter-j-png-letras-cor-de-ouro-transparent.png" || link == "https://w7.pngwing.com/pngs/649/496/png-transparent-brown-bear-polar-bear-grizzly-bear-bear-mammal-brown-animals.png" || link.endsWith('.png') || link.indexOf("images") !== -1 || link.indexOf(".png") !== -1)  {
				
				}else{
				imagen=result.value[index].contentUrl
				found = true
				console.log(index)
				return imagen
			}
		}
		}
		index +=1
	} while (found==false);
} catch (error) {
	console.error(error);
}
	}
}



