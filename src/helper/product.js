export function defaultVariant(name='',hex = null,size = null) {
    name = name.trim()
    return {
            name: name,
            quantity: 1,
            price: 0,
            image:'',
            hex:hex,
            size:size
    }
}