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
    window.open(ubicacion,"Detalle de información", "width= 1000, height= 1500, scrollbars= NO")
}

function ventanaAuxiliarImg(ubicacion) {
    window.open(ubicacion, "Detalle de información", "width= 600, height= 600, scrollbars= NO")
}

const ULTIMA_ACTUALIZACION = "Junio 2026";
const elFecha = document.getElementById("fecha-actualizacion");
if (elFecha) elFecha.textContent = ULTIMA_ACTUALIZACION;


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