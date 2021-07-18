export function defaultVariant(name='') {
    name = name.trim()
    return {
            size: name,
            sku: '',
            quantity: 1,
            price: 0,
            image:''
    }
}