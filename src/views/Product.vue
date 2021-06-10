<template>
  <div class="product  pages">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="product__header mb-3">
            <div class="product__header-title title-text">All Products</div>
            <div class="product__header-btn btn ">
              <router-link
              :to="{name:'add-product'}"
              >
                Add New product
              </router-link>
            </div>
          </div>
          <br/>
          <div class="product__content">
            <div class="product__content-header">
              <div class="title">All Product</div>
              <div class="action">
                <p-input
                :placeholder="`Search...`"
                ></p-input>
              </div>
            </div>
            <div class="product__content-table">
              <table>
                <thead>
                  <tr class="table-header">
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Stock</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span class=" text-product">Nike Men 'Mercurial Superfly 7 Elite</span>
                    </td>
                    <td>
                      <img class="img-product" src="@/assets/img/product.png">
                    </td>
                    <td>
                      <span class="text-product">500</span>
                    </td>
                    <td>
                      <span class="text-status badged-success badged">Active</span>
                    </td>
                    <td>
                      <div class="product-action">
                        <div class="btn-soft success">
                          <box-icon color="#0abb75" size="sm" type='solid' name='show'></box-icon>
                        </div>
                        <div class="btn-soft primary">
                          <box-icon color="#377dff" type='solid' name='edit'></box-icon>
                        </div>
                        <div class="btn-soft danger">
                          <box-icon color="#ef486a" name='trash' ></box-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="product__footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "product",
};
</script>

