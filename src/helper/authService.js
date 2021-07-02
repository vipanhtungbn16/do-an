const key = 'user'

const AuthService = {
    user: {},
    store: {},

    /**
     * Init
     */
    init() {
        const user = this.getStorage()

        if (user && !Object.keys(user).length === 0) {
            this.set(user, false)
        }
    },

    /**
     * Set
     * @param user
     * @param storage
     */
    set(user, storage = true) {
        this.user = user || {}
        if (storage) {
            this.storage(user)
        }
    },

    /**
     * Get id
     * @returns {number}
     */
    getId() {
        return parseInt(this.user.id, 10) || 0
    },

    /**
     * Get email
     * @returns {string}
     */
    getEmail() {
        return this.user.email
    },

    /**
     * Get access token
     * @returns {string}
     */
    getAccessToken() {
        return this.user.accessToken
    },

    /**
     * Is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
         let user = JSON.parse(this.getStorage())
        var myregexp = /^[0-9a-fA-F]{24}$/;

        if(user){
            return user.id.match(myregexp)
         }
        return false

    },

    /**
     * Get data from storage
     * @returns {*|{}}
     */
    getStorage() {
        return localStorage.getItem(key)
    },

    /**
     * Storage data
     * @param data
     */
    storage(data) {
        localStorage.setItem(key, data)
    },

    /**
     * Storage access token
     * @param accessToken
     */
    storageAccessToken(accessToken) {
        const user = Object.assign({}, AuthService.user, { accessToken })
        AuthService.user = user
        AuthService.storage(user)
    },

    /**
     * Clear storage
     */
    clear() {
        localStorage.removeItem(key)
    },
}

export const getUserId = () => AuthService.getId()

export default AuthService
