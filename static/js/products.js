/*** 
	Copyright 2019, Nathan Lecompte 
        ID: 45423725
        Model: Products
***/

(function() {

    // Create event for data change
    let productsChangedEvent = new Event('productsChanged')

    // Products model
    function Products() {
        this.url = '/products'
        this.products = []
    }

    // Function to fetch data from API & store locally
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
            // Store data of products locally
            self.products = json.products
            
            // Trigger data change event
            window.dispatchEvent(productsChangedEvent)
        })
    }

    // Returns array of products in category & sorted accordingly
    Products.prototype.getProducts = function(category, order) {
        return (this.products) ? this.products : []
    }

    // Returns a product as object according to id
    Products.prototype.getProduct = function(id) {
        return (this.products) ? this.products[id] : []
    }

    // Export to global window object
    window.app = window.app || {}
    window.app.Products = Products

})()