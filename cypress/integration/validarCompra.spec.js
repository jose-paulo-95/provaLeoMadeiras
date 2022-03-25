///<reference types="cypress"/>
const faker = require('faker-br');
import ValidarCompra from '../support/pages/Actions/validCompraAction';

describe('Validar se o valor do pedido é maior que o parâmetro informado',()=>{

    it('Quando valor inferior ao parâmetro',()=>{

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit('/')
        ValidarCompra.validarValorNoCarrinho(2,15000)
    })
    it('Quando valor superior ao parâmetro',()=>{

        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit('/')
        ValidarCompra.validarValorNoCarrinho(200,15000)
    })
})