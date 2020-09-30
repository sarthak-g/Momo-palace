import axios from 'axios';
import Noty from 'noty';
import { initAdmin } from './admin';

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cart-Counter')

function updateCart(momo) {
    axios.post('/update-cart', momo)
        .then(res => {
            console.log(res)
            cartCounter.innerText = res.data.totalQty;
            new Noty({
                type: 'success',
                timeout: 800,
                text: 'Item added to cart',
                progressBar: false
            }).show()
        })
        .catch(err => {
            new Noty({
              type: "error",
              timeout: 1000,
              text: "Something went wrong",
              progressBar: false,
            }).show();
        })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let momo = JSON.parse(btn.dataset.momo);
        updateCart(momo)
    })
})

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

initAdmin()