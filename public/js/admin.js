


const deleteProduct = async (btn) => {
    const prodId = btn.parentNode.querySelector('[name="productId"]').value
    const csrf = btn.parentNode.querySelector('[name="_csrf"]').value

    const prodElem = btn.closest('article')
    fetch(`/admin/product/` + prodId, {
        method: 'DELETE',
        headers: {
            "csrf-token": csrf
        }
    }).then(result => result.json()).then(data => {
        prodElem.parentNode.removeChild(prodElem)
    }).catch(err => console.log(err))
    btn.closest('article').remove()
}






