let salePosition;
const toastContainer = $(".screen-overshadow");
const editToast = $("#toast-edit");
const deleteToast = $("#toast-delete");
const addToast = $("#toast-add");
const errorToast = $("#toast-error");

const btnNewSale = $("#btn-new-sell");
const btnsCloseToast = $$(".toast-close");

const selectBranch = $$(".select-branch");
const selectSeller = $$(".select-seller");
const selectComponents = $$(".select-components");

class Venta {
    constructor(id, date, name, branch, components) {
        this.id = id;
        this.fecha = date;
        this.nombreVendedora = name;
        this.sucursal = branch;
        this.componentes = components;
    }
}

const updateSelect = (array, elements) => {
    for (const element of elements) {
        let txt = "";
        for (const item of array) {
            txt += `<option value="${item}">${item}</option>`;
        }
        element.innerHTML = txt;
    }
}
const updateComponents = () => {
    for (const select of selectComponents) {
        let txt = "";
        for (const item of articulos) {
            txt += `<option value="${item.item}" class="op-component">${item.item}</option>`;
        }
        select.innerHTML = txt;
    }
}

const showToast = toastElement => {
    toastContainer.classList.remove("not-show");
    let toast = new bootstrap.Toast(toastElement);
    toast.show();
}

const hideToast = toastElement =>{
    let toast = new bootstrap.Toast(toastElement);
    toast.hide()
}

const changeToastValues = toastElement => {
    const $T = element => toastElement.querySelector(element);
    const $$T = element => toastElement.querySelectorAll(element);
    const seller = $T(".select-seller");
    const components = $$T(".op-component");
    const branch = $T(".select-branch");
    const date = $T(".input-date");
    for (const element of ventas[salePosition].componentes) {
        for (const component of components) {
            if (component.innerText === element) {
                component.selected = true;
                break;
            }
        }
    }
    seller.selectedIndex = vendedoras.indexOf(ventas[salePosition].nombreVendedora);
    date.value = dateFormat(ventas[salePosition].fecha, 2);
    branch.selectedIndex = sucursales.indexOf(ventas[salePosition].sucursal);
}

const makeObject = (pos, toast) => {
    const $T = element => toast.querySelector(element);
    const $$T = element => toast.querySelectorAll(element);
    const seller = $T(".select-seller");
    const components = $$T(".op-component");
    const branch = $T(".select-branch");
    const date = $T(".input-date");
    let componentsArray = [];
    for (const component of components) {
        if (component.selected) {
            componentsArray.push(component.value);
        }
    }
    return new Venta(pos, new Date(date.value), vendedoras[seller.selectedIndex], sucursales[branch.selectedIndex], componentsArray);
}

btnNewSale.addEventListener("click", () => {
    let inputDate = addToast.querySelector(".input-date");
    inputDate.value = dateFormat(new Date(),2);
    const components = toastContainer.querySelectorAll(".op-component");
    for (const component of components) {
        component.selected = false;
    }
    showToast(addToast);
});

for (const btn of btnsCloseToast) {
    btn.addEventListener("click", () => {
        toastContainer.classList.add("not-show");
    });
}
