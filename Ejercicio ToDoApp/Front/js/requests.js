const urlApi="http://localhost:55809"

function EjecutarPeticionServidor(
    rutaControlador,
    metodo,
    cuerpoPeticion,
    callback
  ) {
    let requestInit = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: metodo,
    };
    if (cuerpoPeticion) {
      requestInit.body = JSON.stringify(cuerpoPeticion);
    }
  
    fetch(urlApi + "/api/" + rutaControlador, requestInit)
      .then((response) => (response.status == 204 ? null : response.json()))
      .then((data) => {
        callback.call(window, data);
      });
  }