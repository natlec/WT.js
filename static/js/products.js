/*** 
	Copyright 2019, Nathan Lecompte 
		ID: 45423725
***/

(function(){

    let productsChangedEvent = new Event('productsChanged')

    function Products() {
        this.url = '/products'
        this.products = []
    }

    Products.prototype.getData = function() {
        let self = this
        fetch(self.url, {
            method: 'GET',
            cache: 'default'
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            self.products = json.products
            window.dispatchEvent(productsChangedEvent)
        })
    }

    Products.prototype.getProducts = function(order) {
        if (this.products === []) {
            return []
        } else {
            return this.products
        }
    }

    window.app = window.app || {}
    window.app.Products = Products

})()