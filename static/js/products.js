/*** 
	Copyright 2019, Nathan Lecompte 
        ID: 45423725
        Model: Products
***/

(function(){

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
            // Store data as Products property
            self.products = json.products
            // Trigger data change event
            window.dispatchEvent(productsChangedEvent)
        })
    }

    // Returns array of products in category & sorted accordingly
    Products.prototype.getProducts = function(category, order) {
        if (this.products === []) {
            return []
        } else {
            return this.products
        }
    }

    // Export to global window object
    window.app = window.app || {}
    window.app.Products = Products

})()