
import _ from "lodash";
export default {
    data() {
        return {
            filter: {},
        }
    },
    methods: {
        getRouteQuery() {
            const query = {}

            Object.keys(this.filter).forEach((key) => {
                if (typeof this.$route.query[key] !== 'undefined') {
                    let value = this.$route.query[key]
                    switch (typeof this.filter[key]) {
                        case 'number':
                            value = Number(value)
                            break
                        case 'boolean':
                            value = !!value
                            break
                    }

                    query[key] = value
                } else {
                    query[key] = this.filter[key]
                }
            })

            const max = 200
            query.limit = query.limit <= max ? query.limit : max

            return Object.assign({}, this.$route.query, query)
        },
        handleUpdateRouteQuery(append = {}) {
            let params = _.cloneDeep(this.$route.query)
            params = Object.assign(params, this.filter, append)

            if (!params.page) {
                params.page = 1
            }

            let query = {}
            for (const key in params) {
                // eslint-disable-next-line no-prototype-builtins
                if (params.hasOwnProperty(key) && params[key]) {
                    query[key] = params[key]
                }
            }


            this.$router
                .push({
                    query,
                    path: this.$route.path,
                })
                .catch(() => {}) // ko xoa. loi thi chay yarn upgrade
        },
    },
    watch: {
        $route: function() {
            const filters = this.getRouteQuery()

            if (_.isEqual(filters, this.filter)) {
                this.filter = filters
            }
        },
    },
}
