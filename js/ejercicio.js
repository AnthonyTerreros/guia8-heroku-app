const cargarDatos = () => {
  fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
    .then((data) => data.text())
    .then((data) => new DOMParser().parseFromString(data, "text/xml"))
    .then((xml) => {
      let arreglo, element;
      element = document.getElementsByName("select")[0];
      arreglo = xml.querySelectorAll("escritores > escritor");
      for (let escritor of arreglo) {
        let option = document.createElement("option");
        let valor =
          escritor.querySelector("nombre") == null
            ? ""
            : escritor.querySelector("nombre").textContent;
        option.textContent = valor;
        let id =
          escritor.querySelector("id") == null
            ? ""
            : escritor.querySelector("id").textContent;
        option.setAttribute("value", id);
        element.appendChild(option);
      }
    });
};

const selectElement = document.querySelector("select");
selectElement.addEventListener("change", () => {
  fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
    .then((data) => data.json())
    .then((data) => {
      let contenedor = document.querySelector("#frases")
      contenedor.innerHTML = ""
      for (let frase of data.frases) {
        if (Number(frase.id_autor) === Number(selectElement.value)) {
          let fraseAutor = frase.texto
          let optionLabel = selectElement.options[selectElement.selectedIndex]
          let template = `
        <div class="col-lg-3">
    <div class="test-inner ">
        <div class="test-author-thumb d-flex">
            <div class="test-author-info">
                <h4>${optionLabel.textContent}</h4>                                            
            </div>
        </div>
        <span>${fraseAutor}</span>
        <i class="fa fa-quote-right"></i>
    </div>
</div>
        `;
        

        contenedor.innerHTML += template;
        }
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();
});
