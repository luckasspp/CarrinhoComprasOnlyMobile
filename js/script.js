$(document).ready(function(){
    $.ajax({
        method:'get',
        url:'php/banco.js',
        beforeSend:function(){}
    })
    .done(function(){ 
    produtos.forEach(item => {

        document.querySelector('.produto').style.display = 'block'

        produto = document.querySelector('.produto').cloneNode(true)
        produto.querySelector('.nomeProduto').innerHTML = item.nome
        produto.querySelector('.imagemProduto').src = item.src
        produto.querySelector('.precoProduto').innerHTML = item.preco

        document.querySelector('.linha').append(produto)

        document.querySelector('.produto').style.display = 'none'

    });

    ProdutosAppendados = document.querySelectorAll('.produto')

    ProdutosAppendados.forEach(element => {
     
        element.onclick = function(){

            document.querySelector('.modal').style.display = 'flex'

            let modal = document.querySelector('.modal').cloneNode(true)

            document.querySelector('.FundoModal').style.display = 'flex'

            modal.querySelector('.imagemModal').src = element.querySelector('.imagemProduto').src
            modal.querySelector('.nomeProdutoModal').innerHTML = element.querySelector('.nomeProduto').innerHTML 
            modal.querySelector('.precoProdutoModal').innerHTML = element.querySelector('.precoProduto').innerHTML
            modal.querySelector('.subtotalModal').innerHTML = element.querySelector('.precoProduto').innerHTML
            modal.querySelector('.quantidadeModal').innerHTML = 1
            modal.querySelector('.btnMenosModal').onclick = function(){
                let z = parseFloat(element.querySelector('.precoProduto').innerHTML)
                let y = parseFloat(element.querySelector('.precoProduto').innerHTML)
                let x = parseInt(modal.querySelector('.quantidadeModal').innerHTML)
                if(x > 1) x -= 1
                y = x * z
                modal.querySelector('.quantidadeModal').innerHTML = x
                modal.querySelector('.subtotalModal').innerHTML = y.toFixed(2)
            }
            modal.querySelector('.btnMaisModal').onclick = function(){
                let z = parseFloat(element.querySelector('.precoProduto').innerHTML)
                let y = parseFloat(element.querySelector('.precoProduto').innerHTML)
                let x = parseInt(modal.querySelector('.quantidadeModal').innerHTML)
                x += 1
                y = x * z
                modal.querySelector('.quantidadeModal').innerHTML = x
                modal.querySelector('.subtotalModal').innerHTML = y.toFixed(2)
            }
            modal.querySelector('.fecharModal').onclick = function(){
                modal.remove()
                document.querySelector('.FundoModal').style.display = 'none'
            }
            modal.querySelector('.addCarrinhoModal').onclick = function(){

                document.querySelector('.FundoModal').style.display = 'none'
                document.querySelector('.FundoCarrinho').style.width = '80%'
                document.querySelector('.FundoCarrinho').style.width = '80%'
        
                let ApendadosPedido = document.querySelectorAll('.modeloPedido')
                let imagemModal = modal.querySelector('.imagemModal').src
        
                let quantidadeModal = parseInt(modal.querySelector('.quantidadeModal').innerHTML)
                let precoProdutoModal = parseFloat(modal.querySelector('.precoProdutoModal').innerHTML)
                let precoModal = quantidadeModal * precoProdutoModal   
        
                let aux1
                let aux2
        
                ApendadosPedido.forEach(element => {
                    
                    if(element.querySelector('.imagemPedido').src == imagemModal){
                       aux1 = element
                       aux2 = true
                    }
        
                });
        
                if(aux2)
                {   
                    let quantidadePedidoItem = parseInt(aux1.querySelector('.quantidadePedido'). innerHTML)        
                    let subtotalPedidoItem = parseFloat(aux1.querySelector('.subtotalPedido').   innerHTML)
        
                    let quantidadeAtualizadaItem = quantidadePedidoItem + quantidadeModal
                    let subtotalAtualizadoItem = subtotalPedidoItem + precoModal
        
                    aux1.querySelector('.quantidadePedido').innerHTML = quantidadeAtualizadaItem
                    aux1.querySelector('.subtotalPedido').innerHTML = subtotalAtualizadoItem.toFixed(2)
                }
        
                else
                {
                    document.querySelector('.modeloPedido').style.display = 'flex'
        
                    let modeloPedido = document.querySelector('.modeloPedido').cloneNode(true)
        
                    modeloPedido.querySelector('.imagemPedido').src = imagemModal
                    modeloPedido.querySelector('.subtotalPedido').innerHTML = precoModal.toFixed(2)
                    modeloPedido.querySelector('.quantidadePedido').innerHTML = quantidadeModal
        
                    document.querySelector('.modeloPedido').style.display = 'none'
        
        
                    modeloPedido.querySelector('.btnMaisPedido').onclick = function(){
                        let quantidadePedido = parseInt(modeloPedido.querySelector('.quantidadePedido').innerHTML)
                        quantidadePedido += 1
                        modeloPedido.querySelector('.quantidadePedido').innerHTML = quantidadePedido
                        let subtotalPedido = parseFloat(modeloPedido.querySelector('.subtotalPedido').innerHTML)
                        subtotalPedido += precoProdutoModal
                        modeloPedido.querySelector('.subtotalPedido').innerHTML = subtotalPedido.toFixed(2)
                        atualizaTotalPedido()
        
                    }
        
                    modeloPedido.querySelector('.btnMenosPedido').onclick = function(){
                        
                        let quantidadePedido = parseInt(modeloPedido.querySelector('.quantidadePedido').innerHTML)
        
                        if(quantidadePedido > 1){
        
                            quantidadePedido -= 1
                            modeloPedido.querySelector('.quantidadePedido').innerHTML = quantidadePedido
                            let subtotalPedido = parseFloat(modeloPedido.querySelector('.subtotalPedido').  innerHTML)
                            subtotalPedido -= precoProdutoModal
                            modeloPedido.querySelector('.subtotalPedido').innerHTML = subtotalPedido.toFixed(2)
                            atualizaTotalPedido()
                        }
                        else{

                            modeloPedido.remove()
                            atualizaTotalPedido()
                        }
                    }
                    document.querySelector('.FundoCarrinho').append(modeloPedido)
                    atualizaTotalPedido()
                }
                atualizaTotalPedido()
                modal.remove()
            }
            document.querySelector('.modal').style.display = 'none'

            document.querySelector('.FundoModal').append(modal)
            modal.style.opacity = 0
            modal.style.display = 'flex'
            setTimeout(() => modal.style.opacity = 1, 150)
        }
    });
    document.querySelector('.fecharCarrinho').onclick = function(){ 
        document.querySelector('.FundoCarrinho').style.width = 0
    }
    function atualizaTotalPedido(){

        subtotal = document.querySelectorAll('.subtotalPedido')
        aux = 0
        subtotal.forEach(element => {
        sub = parseFloat(element.innerHTML)
        aux += sub
    });
    document.querySelector('.totalPedido').innerHTML = aux.toFixed(2)
 
    }
    })
    .fail(function(){ console.log('Fail')})
})
