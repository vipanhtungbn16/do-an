<template>
  <div class="add__product  pages">
    <div class="container">
      <div class="row">
        <div class="add__product-header mb-3">
          <div class="title-text">Add New Product</div>
        </div>
        <div class="col-md-8">
          <div class="add__product-content cards">
            <div class="content-header">
              <div class="title-text">Product Information</div>
            </div>
            <div class="content">
              <div class="content__item">
                <label class=" content__label fs-12">Product name
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input">
                  <p-input placeholder="Product name" v-model="name" type="text"></p-input>
                </div>
              </div>
              <div class="content__item">
                <label class=" content__label fs-12">Category
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input">
                  <multiselect
                      v-model="selected"
                      :options="listCategory"
                      :searchable="true"
                      :close-on-select="true"
                      :allow-empty="false"
                      label="name"
                      placeholder="Select one">
                    >
                  </multiselect>
                </div>
              </div>
              <!--                <div class="content__item">-->
              <!--                  <label class=" content__label fs-12">Brand-->
              <!--                    <span class="text-danger">*</span>-->
              <!--                  </label>-->
              <!--                  <div class="content__input">-->
              <!--                    <multiselect-->
              <!--                        v-model="selectedBrand"-->
              <!--                        :options="optionsBrand"-->
              <!--                        :searchable="true"-->
              <!--                        :close-on-select="true"-->
              <!--                        label="name"-->
              <!--                        placeholder="Select one">-->
              <!--                      >-->
              <!--                    </multiselect>-->
              <!--                  </div>-->
              <!--                </div>-->
              <div class="content__item">
                <label class=" content__label fs-12">Unit
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input">
                  <p-input placeholder="Eg. KG,gam..." v-model="unit" type="text"></p-input>
                </div>
              </div>
              <div class="content__item">
                <label class=" content__label fs-12">Unit Price
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input">
                  <p-input type="number" v-model="unitprice"></p-input>
                </div>
              </div>
              <div class="content__item">
                <label class=" content__label fs-12">Discount
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input">
                  <p-input v-model="discount" type="number" min="0"></p-input>
                </div>
              </div>
            </div>
          </div>
          <div class="add__product-content cards">
            <div class="content-header">
              <div class="title-text">Product Images</div>
            </div>
            <div class="content">
              <image-upload :old-file="product.image"  @multiFile ="handleMulti" ></image-upload>
            </div>
          </div>
          <div class="add__product-content cards">
            <div class="content-header">
              <div class="title-text">Product Variation</div>
            </div>
            <div class="content">
              <div class="content__item">
                <label class=" content__label fs-12">Color
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input">
                  <multiselect
                      v-model="selectedColor"
                      :options="listColor"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="true"
                      label="name"
                      :multiple="true"
                      track-by="name"
                      placeholder="Select color">
                    >
                    <template slot="selection" slot-scope="{ values }">
                      <span class="multiselect__single" v-if="values.length">
                    {{ values.length }} options selected
                     </span>
                    </template>

                    <template slot="option" slot-scope="props">
                      <div class="item-color">
                        <div class="color" :style="{backgroundColor:props.option.hex}">
                          <span class="text-color" :style="{color:props.option.hex}">
                            {{props.option.hex}}
                          </span>
                        </div>
                        <div class="title-color">
                          {{props.option.name}}
                        </div>
                      </div>
                    </template>
                  </multiselect>
                </div>
              </div>

              <div class="content__item">
                <label class=" content__label fs-12">Size
                </label>
                <div class="content__input size__option">
                  <template v-for="(option, j) in optionSize">
                    <div :key="j" class="p-button">
                      {{ option.size }} |
                      <span
                          class="p-icon-x"
                          @click="handleRemoveShopValue(option)"
                      >&times;</span>
                    </div>
                  </template>
                  <input
                      type="text"
                      v-model="valueSize"
                      @keyup.enter="addOptionValue()"
                      placeholder="Add value"
                      class="size__option-input"
                  />
                </div>
              </div>

              <div v-if="optionSize.length" class="content__item">
                <table class="content__item-table">
                  <thead>
                  <tr class="table-header">
                    <th width="50">Varian</th>
                    <th width="150">Varian Price</th>
                    <th width="150">Quantity</th>
                    <th width="250">Photo</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,i) in optionSize" :key="i">
                    <td>{{item.size}}</td>
                    <td>
                      <p-input placeholder="Price" type="text" v-model="item.price"></p-input>
                    </td>
                    <td>
                      <p-input placeholder="Quantity" type="text" v-model="item.quantity" ></p-input>
                    </td>
                    <td>
                      <single-upload :detail="true" :old-file="item.image" @file="updateFile" :id="i" ></single-upload>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="add__product-content cards">
            <div class="content-header">
              <div class="title-text">Product Description</div>
            </div>

            <div class="content">
              <div class="content__item">
                <label class=" content__label fs-12">Description
                </label>
                <div class="content__input">
                  <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
                </div>
              </div>
            </div>
          </div>
          <div class="content-footer">
            <button @click="handleCreateProduct" class="btn btn--primary">Save</button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="add__product-content cards">
            <div class="content-header">
              <div class="title-text">Configuration</div>
            </div>

            <div class="content">
              <div class="content__item">
                <label class=" content__label fs-12">Free Shipping
                </label>
                <div class="content__input">
                  <p-checkbox :name="`ship`" @change="updateShip"></p-checkbox>
                </div>
              </div>
              <div class="content__item">
                <label class=" content__label fs-12">Status
                </label>
                <div class="content__input">
                  <p-checkbox :name="`status`" :value="status" @change="updateStatus"></p-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FETCH_CATEGORY} from "../../store/modules/category";
import {GET_DETAIL_PRODUCT} from "../../store/modules/product";
import {mapActions,mapState} from 'vuex'
import ImageUpload from "../../../uikit/components/input/ImageUpload";
import SingleUpload from "../../../uikit/components/input/SingleUpload";
import {color} from '../../share/color.js'
import PCheckbox from "../../../uikit/components/input/PCheckbox";
import {defaultVariant} from "../../helper/product";
export default {
  name: "DetailProduct",
  components:{PCheckbox, ImageUpload,SingleUpload},
  data(){
    return{
      selected: null,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' }
      ],
      selectedBrand: null,
      selectedColor: null,
      optionsBrand: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' }
      ],
      quantity:0,
      discount:0,
      listColor:color,
      optionSize:[],
      valueSize:'',
      multiFile:[],
      name:'',
      unit:'',
      unitprice:0,
      ship:false,
      status:false,
    }
  },
  computed:{
    ...mapState('category',{
      listCategory:(state) =>state.category,
    }),
    ...mapState('product',{
      product:(state) => state.product
    })
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('category',[FETCH_CATEGORY]),
    ...mapActions('product',[GET_DETAIL_PRODUCT]),
    async init(){
      const { id } = this.$route.params
      let result=  await this[FETCH_CATEGORY]()
      let productResult =  await this[GET_DETAIL_PRODUCT](id)
      if(!result.success){
        this.$toast.success(result.message, {
          position: "top-right",
        })
        return
      }
      if(!productResult.success){
        this.$toast.success(productResult.message, {
          position: "top-right",
        })
        return
      }
      this.name = this.product.name
      if(this.product.category){
        this.selected = this.listCategory.filter(element =>{
          return element._id == this.product.category
        })
      }
      this.editorData = this.product.description
      this.status = this.product.status
      this.selectedColor = this.product.color
      this.optionSize = this.product.varians
    },
    handleRemoveShopValue(option) {
      let index = this.optionSize.indexOf(option)
      if (index > -1) {
        this.optionSize.splice(index, 1)
      }
    },
    addOptionValue() {
      if (this.valueSize.trim() == '') {
        return
      }
      if (this.valueSize.trim().includes(',')) {
        return
      }
      const i = this.optionSize.some(
          (element) => this.valueSize === element.size
      )
      if (i) {
        this.$toast.error('Size is exits', {
          position: "top-right",
        })
        return
      }
      this.optionSize.push(defaultVariant(this.valueSize))
      this.valueSize = ''
    },
    updateFile(file,i){
      this.optionSize[i].image = file
    },
    handleMulti(file){
      this.multiFile = file
    },
    async handleCreateProduct(){
      // let params={
      //   name:this.name,
      //   description:this.editorData,
      //   discount:this.discount,
      //   category:this.selected,
      //   color:this.selectedColor,
      //   image:this.multiFile,
      //   varians:this.optionSize,
      //   status:this.status
      // }
      // await this[CREATE_PRODUCT](params).then(res=>{
      //   if(res){
      //     this.$toast.success('Success', {
      //       position: "top-right",
      //     })
      //     this.$router.push({name:'product'})
      //   }
      // }).catch(err=>{
      //   err.forEach(element=>{
      //     this.$toast.error(`${element.msg}`, {
      //       position: "top-right",
      //     })
      //   })
      // })
    },
    updateShip(e){
      this.ship = e
    },
    updateStatus(e){
      this.status = e
    }
  }
}
</script>

