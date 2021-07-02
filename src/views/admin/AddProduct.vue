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
                    <p-input placeholder="Product name" type="text"></p-input>
                  </div>
                </div>
                <div class="content__item">
                  <label class=" content__label fs-12">Category
                    <span class="text-danger">*</span>
                  </label>
                  <div class="content__input">
                    <multiselect
                        v-model="selected"
                        :options="options"
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
                  <label class=" content__label fs-12">Brand
                    <span class="text-danger">*</span>
                  </label>
                  <div class="content__input">
                    <multiselect
                        v-model="selectedBrand"
                        :options="optionsBrand"
                        :searchable="true"
                        :close-on-select="true"
                        label="name"
                        placeholder="Select one">
                      >
                    </multiselect>
                  </div>
                </div>
                <div class="content__item">
                  <label class=" content__label fs-12">Unit
                    <span class="text-danger">*</span>
                  </label>
                  <div class="content__input">
                    <p-input placeholder="Eg. KG,gam..." type="text"></p-input>
                  </div>
                </div>
                <div class="content__item">
                  <label class=" content__label fs-12">Unit Price
                    <span class="text-danger">*</span>
                  </label>
                  <div class="content__input">
                    <p-input type="number"></p-input>
                  </div>
                </div>
                <div class="content__item">
                  <label class=" content__label fs-12">Quantity
                    <span class="text-danger">*</span>
                  </label>
                  <div class="content__input">
                    <p-input v-model="quantity" type="number"  min="0"></p-input>
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
              <image-upload></image-upload>
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
                      {{ option }} |
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
            <button class="btn btn--primary">Save</button>
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
                    <p-checkbox></p-checkbox>
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

import ImageUpload from "../../../uikit/components/input/ImageUpload";
import {color} from '../../share/color.js'
import PCheckbox from "../../../uikit/components/input/PCheckbox";
export default {
  name: "AddProduct",
  components:{PCheckbox, ImageUpload},
  data(){
    return{
      selected: null,
      editorData: '<p>Content of the product.</p>',
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
      valueSize:''
    }
  },
  methods: {
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
          (element) => this.valueSize === element
      )
      if (i) {
        return
      }
      this.optionSize.push(this.valueSize)
      this.valueSize = ''
    },
  }
}
</script>

