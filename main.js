// invoice information
const clientInvoice = {
    "invoiceNumber": 50,
    "invoiceDate": "Nov 9/18",
    "invoiceClientName": "Client Name",
    "invoiceClientAddress": "123 Fake St",
    "invoiceCityStateCountry": "Toronto, ON, CA",
    "invoiceZipCode": "L8P 4F9",
    invoiceLineItems: [],

    addLineItem: function(lineItem) {
        this.invoiceLineItems.push({...lineItem});
    },

    removeLineItem: function(lineItem) {
        // ID to remove the item?
    }, 

    calculateLineItemSubtotal: function(itemUnitCost, itemQuantity) {
        return itemUnitCost * itemQuantity;
    },

    calculateSubtotal: function() {
        return this.invoiceLineItems.reduce((total, lineItem) => {
            return total + (lineItem.itemUnitCost * lineItem.itemQuantity);
        },0);
    },

    calculateTax: function() {
        return this.calculateSubtotal() * 0.13;
    },

    calculateTotal: function() {
        return this.calculateSubtotal() + this.calculateTax();
    },

    renderClientInformation: function() {
        $('.invoiceClientName').html(`${this.invoiceClientName}`);
        $('.invoiceClientAddress').html(`${this.invoiceClientAddress}`);
        $('.invoiceCityStateCounty').html(`${this.invoiceCityStateCountry}`);
        $('.invoiceZipCode').html(`${this.invoiceZipCode}`);
        $('.invoiceNumber').html(`Invoice Number: ${this.invoiceNumber}`);
        $('.invoiceDate').html(`Date: ${this.invoiceDate}`);
    },

    renderLineItems: function() {
        const $items = $('.invoiceItemsList');
        $items.html('');
        this.invoiceLineItems.forEach((item) => {
            $items.append(`
                <li class='invoiceLine'>
                    <div class="itemName">${item.itemName}</div>
                    <div class="itemDescription">${item.itemDescription}</div>
                    <div class="itemUnitCost">$${item.itemUnitCost}</div>
                    <div class="itemQuantity">${item.itemQuantity}</div>
                    <div class="itemLineTotal">$${
                        this.calculateLineItemSubtotal(item.itemUnitCost, item.itemQuantity)
                    }</div>
                </li>`);
        });
    },

    renderTotals: function() {
        $('.invoiceSubtotal').html(`Subtotal: $${this.calculateSubtotal()}`);
        $('.invoiceTax').html(`Tax: $${this.calculateTax()}`);
        $('.invoiceTotal').html(`Total: $${this.calculateTotal()}`);
    }
};

$(function() {
    clientInvoice.renderClientInformation();
    clientInvoice.renderLineItems();
    clientInvoice.renderTotals();

    $('form').on('submit', function(e) {
        e.preventDefault();
        const newLineitem = {
            "itemLineNumber": $('#itemLineNumber').val(),
            "itemName": $('#itemName').val(),
            "itemDescription": $('#itemDescription').val(),
            "itemUnitCost": $('#itemUnitCost').val(),
            "itemQuantity": $('#itemQuantity').val(),
        };

        clientInvoice.addLineItem(newLineitem);
        clientInvoice.renderLineItems();
        clientInvoice.renderTotals();
    });
});