const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];
const sucursales = ["Centro", "Caballito"];
const articulos = [
    { item: "Monitor GPRS 3000", precio: 200 },
    { item: "Motherboard ASUS 1500", precio: 120 },
    { item: "Monitor ASC 543", precio: 250 },
    { item: "Motherboard ASUS 1200", precio: 100 },
    { item: "Motherboard MZI", precio: 30 },
    { item: "HDD Toyiva", precio: 90 },
    { item: "HDD Wezter Dishital", precio: 75 },
    { item: "RAM Quinston", precio: 110 },
    { item: "RAM Quinston Fury", precio: 230 },
];
const ventas = [
    // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    {
        id: 1,
        fecha: new Date(2019, 1, 4),
        nombreVendedora: "Grace",
        sucursal: "Centro",
        componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
    },
    {
        id: 2,
        fecha: new Date(2019, 0, 1),
        nombreVendedora: "Ada",
        sucursal: "Centro",
        componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
    },
    {
        id: 3,
        fecha: new Date(2019, 0, 2),
        nombreVendedora: "Grace",
        sucursal: "Caballito",
        componentes: ["Monitor ASC 543", "Motherboard MZI"],
    },
    {
        id: 4,
        fecha: new Date(2019, 0, 10),
        nombreVendedora: "Ada",
        sucursal: "Centro",
        componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"],
    },
    {
        id: 5,
        fecha: new Date(2019, 0, 12),
        nombreVendedora: "Grace",
        sucursal: "Caballito",
        componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"],
    },
];

/* FUNCIONES */
/*-----------------------------------------------------*/
/* Recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido */

const precioMaquin = listaComponentes => {
    let sumaPrecios = 0;
    for (const componente of listaComponentes) {
        for (const articulo of articulos) {
            if(articulo.item === componente){
                sumaPrecios += articulo.precio;
            }
        }
    }
}
//console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500'])); // 320 ($200 del monitor + $120 del motherboard);