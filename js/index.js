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

/* FUNCIONES ADICIONALES*/
const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element);

const dateFormat = (oldDate, format) => {
    let newDate;
    const day = (`0${oldDate.getDate()}`).slice(-2);
    const month = (`0${oldDate.getMonth() + 1}`).slice(-2);
    const year = oldDate.getFullYear();
    if (format === 1) {
        newDate = [day, month, year];
        newDate = newDate.join("/");
    } else {
        newDate = [year, month, day];
        newDate = newDate.join("-")
    }
    return newDate;
}
/*---------------------------------------------------*/
/* Devuelve la vendedora que más ventas ha hecho en el total de ventas*/
const vendedoraEstrella = () => {
    let mayor = "Ada";
    for (const vendedora of vendedoras) {
        if (ventasVendedora(mayor) < ventasVendedora(vendedora)) {
            mayor = vendedora;
        }
    }
    return mayor;
}
/*---------------------------------------------------*/
/* Calcula el total de ventas en un array de ventas*/
const totalVentas = arrayVentas => {
    total = 0;
    for (const venta of arrayVentas) {
        total += precioMaquina(venta.componentes);
    }
    return total;
}

/*---------------------------------------------------*/
/* Filtra las ventas según un parámetro y un valor determinado para ese parámetro*/
const filtroVentas = (parametro, valor) => {
    let ventasFiltradas = ventas.filter(venta => venta[parametro] === valor)
    return totalVentas(ventasFiltradas);
}

/*---------------------------------------------------*/
/* Retorna el total de las ventas filtradas por un parámetro y el valor de este*/
const ganadorDelMes = (parametro, array, mes, anio) => {
    let ventasPorCategoria = [];
    let ventasFiltradas = ventas.filter(venta => venta.fecha.getMonth() === mes - 1 && venta.fecha.getFullYear() === anio);
    let ganador;
    for (const valor of array) {
        ventasPorCategoria.push({ nombre: valor, total: 0 });
    }
    for (const venta of ventasFiltradas) {
        i = array.indexOf(venta[parametro]);
        ventasPorCategoria[i].total += precioMaquina(venta.componentes);
    }
    for (const item of ventasPorCategoria) {
        if (ganador === undefined) {
            ganador = item;
        }
        else if (ganador.total < item.total) {
            ganador = item;
        }
    }
    return ganador.nombre;
}

/* FUNCIONES */
/*---------------------------------------------------*/
/* Recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido */

const precioMaquina = list => {
    let sumaPrecios = 0;
    for (const componente of list) {
        for (const item of articulos) {
            if (item.item === componente) {
                sumaPrecios += item.precio;
            }
        }
    }
    return sumaPrecios;
}
//console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500'])); // 320 ($200 del monitor + $120 del motherboard);

/*---------------------------------------------------*/
/* Recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.*/
const cantidadVentasComponente = componente => {
    let cantVendido = 0;
    for (const venta of ventas) {
        for (const item of venta.componentes) {
            if (componente === item) {
                cantVendido++;
            }
        }
    }
    return cantVendido;
}
//console.log(cantidadVentasComponente('Monitor ASC 543')); // 2

/*---------------------------------------------------*/
/* Se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).*/
const vendedoraDelMes = (mes, anio) => {
    return ganadorDelMes("nombreVendedora", vendedoras, mes, anio);
}
//console.log(vendedoraDelMes(1, 2019)); // "Ada"

/*---------------------------------------------------*/
/* Obtiene las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).*/
const ventasMes = (mes, anio) => {
    let ventasFiltradas = ventas.filter(venta => venta.fecha.getMonth() === mes - 1 && venta.fecha.getFullYear() === anio);
    return totalVentas(ventasFiltradas);
}
//console.log(ventasMes(1, 2019)); // 1250

/*---------------------------------------------------*/
/*  Obtiene las ventas totales realizadas por una vendedora sin límite de fecha. */
const ventasVendedora = nombre => {
    return filtroVentas("nombreVendedora", nombre);
}
//console.log(ventasVendedora('Grace')); // 900

/*---------------------------------------------------*/
/* Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente */
const componenteMasVendido = () => {
    let componentesArticulos = [];
    let masVendido;
    for (const articulo of articulos) {
        componentesArticulos.push({ item: articulo.item, vecesVendidas: 0 });
    }
    for (const venta of ventas) {
        for (const item of venta.componentes) {
            for (const articulo of componentesArticulos) {
                if (item === articulo.item) {
                    articulo.vecesVendidas++;
                }
            }
        }
    }
    for (const item of componentesArticulos) {
        if (masVendido === undefined) {
            masVendido = item;
        }
        else if (masVendido.vecesVendidas < item.vecesVendidas) {
            masVendido = item;
        }
    }
    return masVendido.item;
}

//console.log(componenteMasVendido()); // Monitor GPRS 3000

/*---------------------------------------------------*/
/* Indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). */
const huboVentas = (mes, anio) => {
    let ventasFiltradas = ventas.filter(venta => venta.fecha.getMonth() === mes - 1 && venta.fecha.getFullYear() === anio);
    return ventasFiltradas.length > 0;
}
//console.log(huboVentas(0, 2019)); // false

/*---------------------------------------------------*/
/* Obtiene las ventas totales realizadas por una sucursal sin límite de fecha. */
const ventasSucursal = sucursal => {
    return filtroVentas("sucursal", sucursal);
}
//console.log(ventasSucursal('Centro')); // 990

/*---------------------------------------------------*//* Se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). */
const sucursalDelMes = (mes, anio) => {
    return ganadorDelMes("sucursal", sucursales, mes, anio);
}
//console.log(sucursalDelMes(1, 2019)); // "Centro"