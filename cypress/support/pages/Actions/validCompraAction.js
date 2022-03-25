const validComp = require('../Elements/validCompraElements').ValidCompr


class validCompra {

    validarValorNoCarrinho(qtdDoProduto,parametroValor){
        
        cy.intercept({
            method: "GET",
            url: "**/estadoscomlojas",
        }).as("step1")
        .wait("@step1", { timeout: 100000 })
        cy.get(validComp.menuCategorias).realHover('mouse')
        .get(validComp.categorias).realHover('mouse')
        .get(validComp.subCategorias).click()
        .get(validComp.validaCategoriaSelecionadas).should('be.visible', { timeout: 10000 }).contains('COMPENSADOS')
        .intercept({
            method: "POST",
            url: "**/preco/obter",
        }).as("step2")
        .wait("@step2", { timeout: 100000 })
        .get(validComp.selecionaProduto).click()
        .get(validComp.mudaQtdProduto).type('{backspace}')
        .get(validComp.mudaQtdProduto).type(qtdDoProduto)
        .get(validComp.btnComprar).click()
        .get(validComp.validaProdutoAdcCarrinho).should('be.visible')
        cy.get(validComp.iconeCarrinho).realHover('mouse')
        .get(validComp.btnFinalizaCompra).click()
        .intercept({
            method: "GET",
            url: "**/NossasLojasCliqueRetire/",
        }).as("step3")
        .wait("@step3", { timeout: 100000 })
        .get(validComp.inserirCep).click()
        cy.wait(2000)
        .get(validComp.inserirCep).type('02652052',{force: true})
        .get(validComp.btnCondirmarCep).click()
        .intercept({
            method: "POST",
            url: "**/ccstoreui/v1/orders/**",
        }).as("step4")
        .wait("@step4", { timeout: 100000 })
        cy.get(validComp.txtValorCarrinho).invoke('text')
        .then(
            (preco)=>{
               let retirar = preco.replace('R$','')
                let valorEmTela = retirar.replace('.','')
                if(parseFloat(valorEmTela) > parametroValor){
                    cy.log(`Valor foi superior a ${parametroValor}`)
                }else{
                    cy.log(valorEmTela)
                }
            }
        )
    }


}
export default new validCompra();