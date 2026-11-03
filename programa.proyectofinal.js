//Programa para abrir las solapas segun cada item

const b1 = 'Boton 1'
const b2 = 'Boton 2'
const b3 = 'Boton 3'
const b4 = 'Boton 4'
const b5 = 'Boton 5'
const b6 = 'Boton 6'
let botones = [b1, b2, b3, b4, b5, b6]

const i1 = 'datospersonales'
const i2 = 'Educación'
const i3 = 'Experiencia'
const i4 = 'Capacitaciones y Cursos'
const i5 = 'Habilidades'
const i6 = 'Referencias'
let items = [i1, i2, i3, i4, i5, i6]

// Recorre cada item - solo si existen en esta página y le indica que inicialmente debe estar la solapa cerrada
items.forEach(function (item) {
  const el = document.getElementById(item);
  if (el) el.style.display = 'none';
})

// Recorre cada boton - solo si existen en esta página y le aplica la funcion informacionboton cuando se le hace click
botones.forEach(function (boton) {
  const el = document.getElementById(boton);
  if (el) el.addEventListener('click', function () {
    informacionboton(boton);
  });
})

// Esta funcion toma un determinado boton, busca el item asociado y ejecuta la funcion para abrir
// o cerrar la solapa

function informacionboton(boton) {
  if (document.getElementById(items[botones.indexOf(boton)]).style.display === "none") {
    abririnfo(boton);
  } else {
    cerrarinfo(boton);
  }
}

function cerrarinfo(boton) {
  document.getElementById(items[botones.indexOf(boton)]).style.display = 'none';
}

function abririnfo(boton) {
  document.getElementById(items[botones.indexOf(boton)]).style.display = 'block';
}

//Funcion para apertura de ventanas auxiliares para desplegar la informacion dentro de la solapa

function ventanaAuxiliar(ubicacion) {
  window.open(ubicacion, "Detalle de información", "width= 1000, height= 1500, scrollbars= NO")
}

function ventanaAuxiliarImg(ubicacion) {
  window.open(ubicacion, "Detalle de información", "width= 600, height= 600, scrollbars= NO")
}

// Actualización de la actualización en el footer
const ULTIMA_ACTUALIZACION = "Agosto 2026";
const elFecha = document.getElementById("fecha-actualizacion");
if (elFecha) elFecha.textContent = ULTIMA_ACTUALIZACION;

// Actualización automática del año en el footer
document.getElementById("anio").textContent = new Date().getFullYear();
document.getElementById("fecha-actualizacion").textContent = new Date().toLocaleDateString("es-AR", {
  year: "numeric", month: "long", day: "numeric"
});


// Función para las pestañas de proyectos y correlaciones
// Tabs

document.querySelectorAll('.corr-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.corr-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.corr-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.target);
    if (target) target.classList.add('active');
  });
});

// Acordeón "Ver detalle técnico"
document.querySelectorAll('.corr-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.nextElementSibling;
    if (!detail) return;
    detail.classList.toggle('open');
    btn.textContent = detail.classList.contains('open')
      ? 'Ocultar detalle técnico ▴'
      : 'Ver detalle técnico ▾';
  });
});

// Lightbox para pairplots
const overlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (overlay && lightboxImg) {
  // Escucha todas las imágenes dentro de .image-row (no solo pairplots)
  document.querySelectorAll('.image-row img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      overlay.classList.add('open');
    });
  });

  // Cerrar clickeando el fondo
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === lightboxClose) {
      overlay.classList.remove('open');
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
    }
  });
}

// Código para página de proyectos de autocad

const PROYECTOS = [
  {
    titulo: "Tratamiento de efluente del pretratamiento de aceite para biodiésel: PFD.",
    descripcion: "Esquema PFD para el tratamiento de un efluente obtenido en el pretratamiento del aceite neutralizado para procesar biodiésel. Mis tareas: diseño conceptual, balances de masa y energía y confección de los PFD.",
    etapa: "Diseño conceptual - Orden de inversión",
    rol: "",
    entregables: ["PFD", "Balances de masa y energía"],
    horas: 20.5,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-pretratamiento-aceite.png"
  },

  {
    titulo: "Planta de biodiésel y glicerina: revisión y control de nuevos P&ID",
    descripcion:
      "Se realizó una revisión en campo de los nuevos planos P&ID, se aportó una mirada de ingeniería de procesos" +
      "aplicando la corrección de errores en papel y finalmente generando la modificación de los planos en AutoCAD Plant 3D.",
    rol: "Revisión en campo y control",
    entregables: ["P&ID", "Revisión de procesos"],
    horas: 69.8,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-columna-bio-glicerina.png"
  }
  
  ,{
    titulo: "Calentamiento de tanques de grasa animal: esquema PFD",
    descripcion: "Realice el esquema de flujo de proceso (PFD) para el calentamiento de tanques de grasa animal.",    
    rol: "Generación de PFD",
    entregables: ["Diagram flow process"],
    horas: 8,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-tanque-serpentin.png"
  }

  ,{
    titulo: "Cálculo y diseño de transporte neumático para tierras de blanqueo: esquema PFD",
    descripcion: "Participé en el cálculo y diseño del sistema de transporte neumático para tierras de blanqueo. Confeccioné los esquemas de procesos (PFD) del sistema de transporte.",    
    rol: "Cálculos y generación de PFD",
    entregables: ["Diagram flow process", "Balances de masa y energía", "Cálculos"],
    horas: 9,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-transporte-neumatico.png"
  }

  ,{
    titulo: "Planta de tratamiento de glicerina: P&ID",
    descripcion: "Confección del proyecto en AutoCAD Plant 3D de la planta de tratamiento de glicerina, incluyendo el diseño de los P&ID y los listados de componentes y equipos.",    
    rol: "Ingeniería de detalles",
    entregables: ["P&ID", "Listado de elementos"],
    horas: 37.2,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-tratamiento-glicerina.png"
  }

  ,{
    titulo: "Planta de Oleínas: PFD",
    descripcion: "Generé los diagramas de flujo de proceso (PFD) para la planta de oleínas, incluyendo tablas conectadas con los balances de masa a través de la función Data Link.",    
    rol: "Orden de inversión",
    entregables: ["PFD", "Listado de elementos","Balances de masa en planos"],
    horas: 96.4,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-decantadores-oleinas.png"
  }
  
,{
    titulo: "Instalación de filtros de placas verticales: P&ID",
    descripcion: "Actualización de los P&ID para una planta de blanqueo que instaló filtros de placas verticales en lugar de filtros prensas.",    
    rol: "Ingeniería de detalles",
    entregables: ["P&ID", "Listado de elementos"],
    horas: 35.5,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-filtros-blanqueo.png"
  }

  ,{
    titulo: "Modificaciónes en planta de Neutralizado: P&ID",
    descripcion: "Actualización de los P&ID para una planta de neutralización de aceite vegetal a la que se le realizaron mejoras de procesos varias.",    
    rol: "Ingeniería de detalles",
    entregables: ["P&ID", "Listado de elementos"],
    horas: 27.8,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-modificaciones-neutralizado.png"
  }

  ,{
    titulo: "Blanqueo y Desodorización de sebo: PFD",
    descripcion: "Generé los diagramas de flujo de proceso (PFD) para una planta de blanqueo y desodorización de sebo, en el marco de un proyecto de orden de inversión.",
    rol: "Orden de inversión",
    entregables: ["PFD", "Listado de elementos"],
    horas: 68.7,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-blanqueo-desodorizacion-sebo.png"
  }

  ,{
    titulo: "Blanqueo y Desodorización de sebo: P&ID",
    descripcion: "Generé proyecto AutoCad Plant con los P&ID para una planta de blanqueo y desodorización de sebo.",
    rol: "Ingeniería de detalles",
    entregables: ["P&ID", "Listado de elementos"],
    horas: 70.8,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-blanqueo-desodorizacion-sebo2.png"
  }

  ,{
    titulo: "Modificaciónes en planta de refinado Batch: P&ID",
    descripcion: "Actualización de los P&ID para una planta de refinado de aceite vegetal batch a la que se le realizaron mejoras de procesos varias.",    
    rol: "Ingeniería de detalles",
    entregables: ["P&ID", "Listado de elementos"],
    horas: 1.3,
    horasNota: "de dibujo",
    imagen: "../../../Imagenes/AutoCad/portada-modificaciones-batch.png"
  }

];

/* ---------- Render ---------- */

const fmt = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });

function el(tag, clase, texto) {
  const nodo = document.createElement(tag);
  if (clase) nodo.className = clase;
  if (texto !== undefined) nodo.textContent = texto;
  return nodo;
}

function crearTarjeta(p) {
  const card = el("article", "pa-card");

  if (p.imagen) {
    const img = el("img", "pa-card__img");
    img.src = p.imagen;
    img.alt = "Detalle del proyecto: " + p.titulo;
    img.loading = "lazy";
    img.onerror = function () {
      const vacia = el("div", "pa-card__img pa-card__img--vacia", "P&ID");
      img.replaceWith(vacia);
    };
    card.appendChild(img);
  } else {
    card.appendChild(el("div", "pa-card__img pa-card__img--vacia", "P&ID"));
  }

  const cuerpo = el("div");

  const meta = [p.anio, p.etapa, p.rol].filter(Boolean).join(" · ");
  if (meta) cuerpo.appendChild(el("p", "pa-card__meta", meta));

  cuerpo.appendChild(el("h3", "pa-card__titulo", p.titulo));
  if (p.descripcion) cuerpo.appendChild(el("p", "pa-card__desc", p.descripcion));

  const pie = el("div", "pa-card__pie");
  if (p.entregables && p.entregables.length) {
    const chips = el("ul", "pa-card__chips");
    p.entregables.forEach(function (e) { chips.appendChild(el("li", null, e)); });
    pie.appendChild(chips);
  }
  if (typeof p.horas === "number" && p.horas > 0) {
    const nota = p.horasNota ? " " + p.horasNota : "";
    pie.appendChild(el("span", "pa-card__horas", fmt.format(p.horas) + " h" + nota));
  }
  cuerpo.appendChild(pie);

  card.appendChild(cuerpo);
  return card;
}

function crearDato(valor, etiqueta) {
  const d = el("div", "pa__dato");
  d.appendChild(el("strong", null, valor));
  d.appendChild(el("span", null, etiqueta));
  return d;
}

const lista = document.getElementById("pa-lista");
const resumen = document.getElementById("pa-resumen");

PROYECTOS.forEach(function (p) { lista.appendChild(crearTarjeta(p)); });

const totalHoras = PROYECTOS.reduce(function (acc, p) { return acc + (p.horas || 0); }, 0);
const anios = PROYECTOS.map(function (p) { return p.anio; }).filter(Boolean);

resumen.appendChild(crearDato(String(PROYECTOS.length), PROYECTOS.length === 1 ? "Proyecto" : "Proyectos"));
if (totalHoras > 0) resumen.appendChild(crearDato(fmt.format(totalHoras) + " h", "De dibujo registradas"));
if (anios.length) {
  const min = Math.min.apply(null, anios), max = Math.max.apply(null, anios);
  resumen.appendChild(crearDato(min === max ? String(min) : min + " – " + max, "Período"));
}