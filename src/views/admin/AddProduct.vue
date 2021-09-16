<template>
  <div class="add__product mt-100  pages">
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
                <div class="content__item">
                  <label class=" content__label fs-12">Department
                    <span class="text-danger">*</span>
                  </label>
                  <div class="content__input">
                    <multiselect
                        v-model="selectedDepartment"
                        :options="listDepartment"
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
              <image-upload @multiFile ="handleMulti" ></image-upload>
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
                      @select="handleSelect"
                      @remove="handleRemove"
                      placeholder="Select color"
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

              <div v-if="optionVarian.length" class="content__item">
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
                  <tr v-for="(item,i) in optionVarian" :key="i">
                    <td>{{item.name}}</td>
                    <td>
                      <p-input placeholder="Price" type="text" v-model="item.price"></p-input>
                    </td>
                    <td>
                      <p-input placeholder="Quantity" type="text" v-model="item.quantity" ></p-input>
                    </td>
                    <td>
                      <single-upload @file="updateFile" :id="i" ></single-upload>
                    </td>
                    <td>
                      <div style="cursor: pointer" @click="handleRmItem(item)" class="delete_item">
                        <i class="far fa-trash-alt"></i>
                      </div>
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
                  <quill-editor v-model="content"
                                ref="myQuillEditor"
                                :options="editorOption"
                  >
                  </quill-editor>
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
                  <p-checkbox :name="`status`" @change="updateStatus"></p-checkbox>
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
import {CREATE_PRODUCT} from "../../store/modules/product";
import {FETCH_DEPARTMENT} from "../../store/modules/department";
import {mapActions,mapState} from 'vuex'
import SingleUpload from "../../../uikit/components/input/SingleUpload";
import {color} from '../../share/color.js'
import PCheckbox from "../../../uikit/components/input/PCheckbox";
import {defaultVariant} from "../../helper/product";
export default {
  name: "AddProduct",
  components:{PCheckbox,SingleUpload},
  data(){
    return{
      selected: null,
      selectedDepartment: null,
      content: '<h2>I am Example</h2>',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
        }
      },
      selectedBrand: null,
      selectedColor: [],
      quantity:0,
      discount:0,
      listColor:color,
      optionSize:[],
      optionVarian:[],
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
      listCategory:(state) =>state.category
    }),
    ...mapState('department',{
      listDepartment:(state) =>state.department
    }),
    isSelectColor(){
      return this.selectedColor.length > 0
    },
    isSelectedSize(){
      return this.optionSize.length > 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('category',[FETCH_CATEGORY]),
    ...mapActions('department',[FETCH_DEPARTMENT]),
    ...mapActions('product',[CREATE_PRODUCT]),
    async init(){
      let result=  await this[FETCH_CATEGORY]()
      if(!result.success){
        this.$toast.success(result.message, {
          position: "top-right",
        })
        return
      }
      let result2=  await this[FETCH_DEPARTMENT]()
      if(!result2.success){
        this.$toast.success(result2.message, {
          position: "top-right",
        })
        return
      }
    },
    handleRemoveShopValue(option) {
      let indexS = this.optionSize.indexOf(option)
      if (indexS > -1) {
        this.optionSize.splice(indexS, 1)
      }
     this.optionVarian = this.optionVarian.filter(item=> item.size !== option.size)

    },
    handleRmItem(item){
      this.optionVarian = this.optionVarian.filter(option=> item.name !== option.name)
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
        this.valueSize =''
        return
      }
      this.optionSize.push({size:this.valueSize})

      if(!this.isSelectColor){
        this.optionVarian.push(defaultVariant(this.valueSize,null,this.valueSize))
        this.valueSize = ''
        return;
      }
      this.selectedColor.forEach(item=>{
        if(this.checkVariansExits(`${item.name}`)){
          this.optionVarian = this.optionVarian.map(element =>{
            element.name = `${item.name}-${this.valueSize}`
            element.size = this.valueSize
            return element
          })
          return
        }
        this.optionVarian.push(defaultVariant(`${item.name}-${this.valueSize}`,item.hex,this.valueSize))
      })
      this.valueSize = ''
    },
    updateFile(file,i){
      this.optionVarian[i].image = file
    },
    checkVariansExits(value){
      const isExits = this.optionVarian.some(element => element.name == value)
      return isExits
    },
    handleMulti(file){
     this.multiFile = file
    },
     async handleCreateProduct(){
      let params={
        name:this.name,
        description:this.content,
        discount:this.discount,
        department:this.selectedDepartment,
        category:this.selected,
        color:this.selectedColor,
        image:this.multiFile,
        varians:this.optionVarian,
        status:this.status
      }
       await this[CREATE_PRODUCT](params).then(res=>{
         if(res){
           this.$toast.success('Success', {
             position: "top-right",
           })
           this.$router.push({name:'product'})
         }
       }).catch(err=>{
         err.forEach(element=>{
           this.$toast.error(`${element.msg}`, {
             position: "top-right",
           })
         })
       })
    },
    updateShip(e){
      this.ship = e
    },
    updateStatus(e){
      this.status = e
    },
    handleSelect(selectedOption){
      if(!this.isSelectedSize){
        this.optionVarian.push(defaultVariant(selectedOption.name,selectedOption.hex))
      }
      this.optionSize.forEach(item=>{
        if(this.checkVariansExits(`${item.size}`)){
          this.optionVarian = this.optionVarian.map(element =>{
            element.name = `${selectedOption.name}-${item.size}`
            element.hex = selectedOption.hex
            return element
          })
          return
        }
        this.optionVarian.push(defaultVariant(`${selectedOption.name}-${item.size}`,selectedOption.hex,item.size))
      })
    },
    handleRemove(option){
     this.optionVarian= this.optionVarian.filter(element => element.hex !== option.hex)
    }
  }
}
</script>

