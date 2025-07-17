
const materias = [
  { codigo: "BI-121", nombre: "Biología General", semestre: "Primer Año - Primer Semestre", requisito: [] },
  { codigo: "QQ-103", nombre: "Química General", semestre: "Primer Año - Primer Semestre", requisito: [] },
  { codigo: "QQ-214", nombre: "Química Orgánica", semestre: "Primer Año - Segundo Semestre", requisito: ["QQ-103", "BI-121"] },
  { codigo: "AM-221", nombre: "Anatomía Macroscópica", semestre: "Segundo Año - Cuarto Semestre", requisito: ["QQ-214", "BI-121"] },
  { codigo: "OPE-326", nombre: "Operatoria Dental I", semestre: "Cuarto Año - Séptimo Semestre", requisito: ["AM-221"] },
  { codigo: "PRE-387", nombre: "Prótesis Removible I", semestre: "Cuarto Año - Octavo Semestre", requisito: ["OPE-326"] }
];

const contenedor = document.getElementById("malla");
const detalleTexto = document.getElementById("detalle-texto");
const buscador = document.getElementById("buscador");
const filtroSemestre = document.getElementById("filtro-semestre");

function renderMaterias() {
  contenedor.innerHTML = "";
  const texto = buscador.value.toLowerCase();
  const filtro = filtroSemestre.value;

  materias.forEach(m => {
    if ((m.nombre.toLowerCase().includes(texto) || m.codigo.toLowerCase().includes(texto)) &&
        (!filtro || m.semestre === filtro)) {

      const div = document.createElement("div");
      div.className = "materia";
      div.id = m.codigo;
      div.innerText = `${m.codigo}\n${m.nombre}\n${m.semestre}`;

      div.onclick = () => {
        div.classList.toggle("completada");
        detalleTexto.innerText = `Materia: ${m.nombre}\nCódigo: ${m.codigo}\nSemestre: ${m.semestre}\nRequisitos: ${m.requisito.length ? m.requisito.join(", ") : "Ninguno"}`;
      };

      contenedor.appendChild(div);
    }
  });
}

function llenarFiltroSemestre() {
  const semestres = [...new Set(materias.map(m => m.semestre))];
  semestres.forEach(s => {
    const option = document.createElement("option");
    option.value = s;
    option.textContent = s;
    filtroSemestre.appendChild(option);
  });
}

buscador.addEventListener("input", renderMaterias);
filtroSemestre.addEventListener("change", renderMaterias);

llenarFiltroSemestre();
renderMaterias();
