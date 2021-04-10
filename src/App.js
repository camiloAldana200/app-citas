import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
});


const [consultar, setConsultar] = useState(false)
const {ciudad, pais} = busqueda;
const [resultado, setResultado] = useState({});
const [error, setError] = useState(false)

useEffect(() => {
 console.log(ciudad);
 const consultarAPI = async () => {
    if(consultar){
      const appId = 'bae15645701c5a950e76a1459ea2506e';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setResultado(resultado);
      setConsultar(false);

      //  Detecta si hubo resultado correctos

      if(resultado.cod === "404"){
        setError(true);
      
      }else{
        setError(false);
      }
    }
 }
 consultarAPI();
   // eslint-disable-next-line

}, [consultar]);

let componente;

if(error){
  componente = <Error mensaje="No hay resultados" />
}else{
  componente = <Clima
  resultado={resultado}
  />
}



  return (
    <Fragment>
      <Header
        titulo = 'Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>

          </div>

        </div>

      </div>

    </Fragment>
  );
}


export default App;
