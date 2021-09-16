import Vue from 'vue'
 Vue.filter('formatPrice', num => {
    if (!num) {
        return '0.00';
    }
    const number = (num / 1).toFixed(0).replace(',', '.');
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫`;
});
Vue.filter('uppercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
})
