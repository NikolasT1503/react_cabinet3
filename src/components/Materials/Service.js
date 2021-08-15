export class Service {

    getMaterials() {
        return fetch('data/materialsData.json').then(res => res.json()).then(d => d.matherials);
    }

    getProjects() {
        console.log("getProjects");
        return fetch('/data/projectsData.json').then(res => res.json()).then(d => d.projects);
    }

    getProductsWithOrdersSmall() {
        return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
    }
}