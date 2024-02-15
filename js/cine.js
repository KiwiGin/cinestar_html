//fetch javascript
// Función para obtener el precio según el día de la semana
function getPrecioByDia(dia) {
    const tarifa = tarifas.find(t => t.DiasSemana === dia);
    return tarifa ? tarifa.Precio : "No disponible";
}

const getCines = async() => {
    const id = new URLSearchParams(window.location.search).get('id')
	const data = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`)
    const data_tarifas = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/tarifas`)
    const data_peliculas = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/peliculas`)
    if(data_tarifas.status == 200 && data_peliculas.status==200){
		const pelicula = await data.json()
        const tarifas = await data_tarifas.json()
		const peliculas = await data_peliculas.json()
        let html = `<br/><h1>Nuestros Cines</h1><br/>`

		html += `
		<h2>${pelicula.RazonSocial}</h2>
				<div class="cine-info">
					<div class="cine-info datos">
						<p>${pelicula.Direccion} - ${pelicula.Detalle}</p>
						<p>Teléfono: ${pelicula.Telefonos} anexo 865</p>
						<br/>
						<div class="tabla">
		`

        tarifas.forEach((tarifa, index) => {
			// Determinamos si la fila es par o impar
			const esPar = index % 2 === 0;
			// Agregamos la clase correspondiente a la fila
			const claseFila = esPar ? "" : "impar";
			
			// Agregamos una fila para cada tarifa
			html += `
				<div class="fila ${claseFila}">
					<div class="celda-titulo">${tarifa.DiasSemana}</div>
					<div class="celda">${tarifa.Precio}</div>
				</div>
			`;
		});

		html += `
		</div>
			<div class="aviso">
				<p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
			</div>
		</div>
		<img src="img/cine/${pelicula.id}.2.jpg"/>
		<br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
		<div class="cine-info peliculas">
		<div class="tabla">
		<div class="fila">
								<div class="celda-cabecera">Películas</div>
								<div class="celda-cabecera">Horarios</div>
							</div>
		`

		peliculas.forEach((pelicula, index) => {
			const esPar = index % 2 === 0;
			const claseFila = !esPar ? "" : "impar";

			html += 
			`
			
							
							<div class="fila ${claseFila}">
								<div class="celda-titulo">${pelicula.Titulo}</div>
								<div class="celda">${pelicula.Horarios}</div>
							</div>
						
			`
		});

		html += `
		</div>
					</div>
				</div>
				<div>
					<img style="float:left;" src="img/cine/${pelicula.id}.3.jpg" alt="Imagen del cine"/>
					<span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
						Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
						<br/><br/>
						Visitános y diviértete con nosotros. 
						<br/><br/>
						<b>CINESTAR</b>, siempre pensando en tí. 
					</span>		
				</div>
		`
		
        document.getElementById('contenido-interno').innerHTML=html;
    }
    
}


/*

*/