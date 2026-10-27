# Cotizador de Herrería

Diseñá una reja, una parrilla o una mesa como un modelo 3D de caja y caras, y obtené la lista de materiales sin contar un hierro dos veces: barras de 6 m con corte optimizado, chapa por m², peso y precio sugerido.

Un solo archivo HTML. Sin build, sin backend. Se abre en el navegador y guarda el trabajo localmente.

![Estructura 3D con las tres vistas](docs/estructura-3d.png)

## Qué hace

- **Caja y partes · 3D.** Definís ancho, alto y profundidad, qué aristas existen (una mesa no tiene aristas abajo) y agregás partes interiores a una cara: grillas, travesaños, estantes, chapa. Las arrastrás en el 3D, las movés con las flechas, deshacés con Ctrl+Z. Las vistas Frente, Lateral y Planta se generan del mismo modelo.
- **Piezas hacia adentro.** Toda pieza dibujada en una cara puede hundirse N cm hacia el interior de la caja, desde el panel o arrastrándola en el 3D. El travesaño del 3D es una barra libre en un eje, ubicada por las otras dos coordenadas y arrastrable en ambas.
- **Dibujar caras · 2D.** Las seis caras de la caja se dibujan con partes arrastrables: marcos, barrotes con paso, tramos, arcos y volutas con longitud desarrollada real, chapa y piezas de catálogo. Lo que dibujás aparece montado en el 3D al instante, y las otras caras muestran su proyección como fantasma para alinear.
- **Medidas exteriores.** La caja y las caras se miden de borde a borde del hierro, alto total hasta el piso. Los hierros van por dentro de esa medida y se cuentan por su largo exterior. Cotas con líneas de extensión y etiquetas en el 3D, y medidas de cada cara en el plano. Con "Medir" se agregan cotas propias de un punto a otro (se pegan a esquinas y extremos de hierros); quedan en el proyecto y en la imagen para el cliente.
- **Materiales.** Cada hierro existe una sola vez en el modelo. Si una arista de la caja y el borde de un marco dibujado ocupan el mismo lugar, se cuenta uno. Corte en barras de 6 m (first-fit decreasing, kerf 3 mm) con sobrantes, kg por tabla de perfiles, chapa en hojas de 1×2 m, catálogo por unidad. Desglose por origen para auditar.
- **Mano de obra, consumibles y extras.** Dos porcentajes sobre el material (mano de obra; consumibles: soldadura, discos, pintura) y un monto fijo de extras (flete, instalación). Se guardan en el navegador.
- **Tramos parciales.** Un marco, chapa o grilla puede ocupar solo un tramo de la caja (desde y hasta en cada eje del plano): estantes a media caja, divisores solo donde van los cajones, parantes cortos.
- **Tapa de madera / MDF.** Material de superficie junto a las chapas, contado en placas, para que los muebles con tapa de madera cierren el presupuesto.
- **Malla / enrejado fino.** Material de superficie junto a las chapas: se dibuja en una cara con el tamaño que haga falta o se agrega como parte interior en 3D, se ve como trama en el plano y grilla fina en el 3D, y se cuenta por m² en paneles de 1×2 m.
- **Modelos base.** Galería con miniaturas renderizadas: vacío, rejas, portón, puerta, baranda, mesas, banqueta, rack, estantería, perchero, mesa de comedor patas U, banqueta alta de bar, rack TV con cajones, carro con ruedas, estantería con cruces, biblioteca asimétrica, parrilla, parrilla con tapa (cuerpo de chapa, tapa, estante de planchuela, ruedas), chulengo (medio tacho de 200 L con parrilla y chimenea), pérgola, banco de trabajo y brasero. Se abre al crear un proyecto nuevo; elegís uno y lo retocás.
- **Perfiles propios.** Tubo, planchuela, cuadrado, redondo, ángulo o caño con medidas en mm y precio; el peso por metro se calcula solo y el perfil aparece en todas las listas.
- **Mis piezas.** Una selección del plano guardada con nombre y miniatura para insertarla en cualquier cara de cualquier proyecto (un pie de lámpara, un brazo a cierto ángulo). Viajan con Exportar todo.
- **Tambor / cilindro.** Parte 3D para tachos y caños grandes: eje, centro, diámetro, largo, medio o entero; se cuenta como pieza de catálogo (tacho, chimenea) o como chapa por el manto.
- **Proyectos.** Varios proyectos con nombre, guardados solos en el navegador, con duplicar, borrar y exportar/importar como archivo o texto. **Compartir** genera un link con el proyecto comprimido adentro: quien lo abre recibe una copia (solo en hosting propio, no dentro del visor de artifacts).
- **Bisagras.** Tapas de tambor, hojas de portón o puerta dibujadas en 2D y cualquier parte plana (marco, chapa, grilla) pueden colgar de una bisagra en uno de sus lados, con ángulo de apertura. El botón "Abrir / cerrar" del 3D las anima; las bisagras se cuentan solas en materiales (2 por hoja o tapa).
- **Aristas individuales.** Una pata o arista de la caja se quita tocándola en el 3D; se restauran todas desde el panel.
- **Salida.** Presupuesto en texto para WhatsApp, lista de cortes para el taller (qué cortar, cuántos, de qué perfil, y cómo repartir cada barra, con casillas para tildar) e imagen del 3D o del plano para el cliente.

![Caras 2D con el 3D al lado](docs/caras-2d.png)

![Proyección de la reja en la vista de planta](docs/proyeccion-planta.png)

## Usar

En línea: **https://germanalvarez8.github.io/cotizador-herreria/**

O abrí `index.html` en el navegador. Es un archivo estático: cualquier hosting sirve.

Los precios de perfiles, chapa y catálogo son de ejemplo y se editan en la misma página. La lista de perfiles vive en el código, en el bloque `calc-begin`.

## Desarrollo

```bash
node check.js    # aserciones del bloque de cálculo (largos, corte, chapa, cantidades)
npm install      # Playwright, solo para validar en navegador
node shoot.js    # abre la página en Chromium headless, prueba interacciones y guarda capturas en shots/
```

Las librerías se cargan por CDN: Fabric.js 5.3.1 para el 2D y Three.js r128 para el 3D.

## Qué falta

Por orden de impacto en el número del presupuesto:

1. Precio por kg además de por barra.
2. Superficie para pintura y consumibles (discos, electrodo) calculados de la geometría.
3. Mano de obra por horas en vez de porcentaje, calibrada con un herrero.
4. Validaciones: partes fuera de la cara, hierros que atraviesan chapa.
5. IVA y margen separados.
6. Nesting de chapa en hojas reales.
7. Lista de precios actualizable desde la ferretería.
