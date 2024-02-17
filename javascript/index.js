async function getCines(){
    try {
        const data = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines`)
        if(data.status == 200){
            const cines = await data.json()
            let html = `<br/><h1>Nuestros Cines</h1><br/>`
    //hashmap
            cines.forEach(cine => {
                html += `
                
                <div class="contenido-cine">
                    <img src="img/cine/${cine.id}.1.jpg" width="227" height="170"/>
                    <div class="datos-cine">
                            <h4>${cine.RazonSocial}</h4><br/>
                        <span>${cine.Direccion} - ${cine.Detalle}<br/><br/>Teléfono: ${cine.Telefonos} anexo 865</span>
                    </div>
                    <br/>
                    <a onclick="getCine(${cine.id})">
                        <img src="img/varios/ico-info2.png" width="150" height="40"/>
                    </a>
                </div>
                
                `
            });
            document.getElementById('contenido-interno').innerHTML=html;
        }
    } catch (error) {
        console.log(error)
    }
}

async function getCine(id){
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

async function getPeliculas(id) {
    try {
        const data = await fetch(`https://oaemdl.es/cinestar_sweb_php/peliculas/${id}`);
        const data1 = await fetch(`https://oaemdl.es/cinestar_sweb_php/peliculas/${id}`);
        if (data.status == 200) {
            const peliculas = await data.json();
            const pelicula = await data1.json();
            let html = `<br/><h1>Cartelera</h1><br/>`;

            if (id == 'cartelera' || id=='estrenos') {
                peliculas.forEach(pelicula => {
                    html += `
                        <div class="contenido-pelicula">
                            <div class="datos-pelicula">
                                <h2>${pelicula.Titulo}</h2><br/>
                                <p>${pelicula.Sinopsis}</p>
                                <br/>
                                <div class="boton-pelicula">
                                    <a onclick="getPeliculas(${pelicula.id})">
                                        <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                                    </a>
                                </div>
                                <div class="boton-pelicula"> 
                                    <a href="https://www.youtube.com/v/${pelicula.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                        <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                                    </a>
                                </div> 
                            </div>
                            <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
                        </div>
                    `;
                });
                
            } else if (Number.isInteger(id)) {
                html += `
                    <div class="contenido-pelicula">
                        <div class="datos-pelicula">
                            <h2>${pelicula.Titulo}</h2>
                            <p>${pelicula.Sinopsis}</p>
                            <br/>
                            <div class="tabla">
                                <div class="fila">
                                    <div class="celda-titulo">Título Original :</div>
                                    <div class="celda">${pelicula.Titulo}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Estreno :</div>
                                    <div class="celda">${pelicula.FechaEstreno}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Género :</div>
                                    <div class="celda">${pelicula.Geneross}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Director :</div>
                                    <div class="celda">${pelicula.Director}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Reparto :</div>
                                    <div class="celda">${pelicula.Reparto}</div>
                                </div>
                            </div>
                        </div>
                        <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"><br/><br/>
                    </div>
                    <div class="pelicula-video">
                        <embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
                    </div>
                `
            }
            document.getElementById('contenido-interno').innerHTML = html;

        } else {
            console.error("error sin respuesta");
        }

    } catch (error) {
        console.error(error);
    }
}

