const tbBranchSales = $("#branch-sales");
const tbSales = $("#sells");
const starProduct = $(".star-product");
const starSeller = $(".star-seller");

const btnDelete = $("#btn-delete");
const btnAdd = $("#btn-add");
const btnEdit = $("#btn-edit");
const btnAccept = $(".accept-error");

const changeReport = () => {
    if (ventas.length !== 0) {
        starSeller.innerText = componenteMasVendido();
        starProduct.innerText = vendedoraEstrella();
    }
    else {
        let txt = "No se han vendido productos";
        starSeller.innerText = txt;
        starProduct.innerText = txt;
    }
}

const changeBranchSales = () => {
    let txt = "";
    for (const branch of sucursales) {
        txt += `
            <tr>
                <td scope="row">${branch}</td>
                <td>${ventasSucursal(branch)}</td>
            </tr>`;
    }
    tbBranchSales.innerHTML = txt;
}
const headerSales = () => {
    tbSales.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Vendedora</th>
                <th scope="col">Sucursal</th>
                <th scope="col" class="min-col">Componentes</th>
                <th scope="col">Precio</th>
                <th scope="col" class="min-col-2">Acciones</th>
            </tr>
        </thead>`;
}
const bodySales = () => {
    let txt = "";
    for (const sell of ventas) {
        let date = dateFormat(sell.fecha, 1);
        txt += `<tr>
            <td scope="row">${date}</td>
            <td>${sell.nombreVendedora}</td>
            <td>${sell.sucursal}</td>
            <td class="min-col">${sell.componentes.join(" - ")}</td>
            <td>${precioMaquina(sell.componentes)}</td>
            <td class="min-col-2">
                <button class="btn edit-sell"><i class="far fa-edit add"></i></button>
                <button class="btn delete-sell"><i class="far fa-trash-alt delete"></i></button></td>
        </tr>`;
    }
    return txt;
}
const btnConfig = () => {
    const btnsEdit = $$(".edit-sell");
    const btnsDelete = $$(".delete-sell");
    for (let i = 0; i < ventas.length; i++) {
        btnsEdit[i].addEventListener("click", () => {
            salePosition = i;
            changeToastValues(editToast);
            showToast(editToast);
        });
        btnsDelete[i].addEventListener("click", () => {
            salePosition = i;
            showToast(deleteToast);
        });
    }
}
const changeSales = () => {
    if (ventas.length !== 0) {
        headerSales();
        tbSales.innerHTML += `<tbody>${bodySales()}</tbody>`;
        btnConfig();
    }
    else {
        tbSales.innerHTML = `<h2>No hay ventas disponibles</h2>`;
    }
}

const update = () => {
    changeReport();
    changeBranchSales();
    changeSales();
}

btnDelete.addEventListener("click", () => {
    ventas.splice(salePosition, 1);
    update();
});

btnAdd.addEventListener("click", () => {
    let newSale = makeObject(ventas[ventas.length - 1].id + 1, addToast);
    if(newSale.componentes.length > 0){
        ventas.push(newSale);
        toastContainer.classList.add("not-show");
        update();
        hideToast(toastContainer);
    }
    else {
        showToast(errorToast);
    }
});

btnAccept.addEventListener("click",()=>{
    hideToast(errorToast);
});

btnEdit.addEventListener("click", () => {
    ventas[salePosition] = makeObject(salePosition, editToast);
    update();
});

update();
updateSelect(sucursales, selectBranch);
updateSelect(vendedoras, selectSeller);
updateComponents();