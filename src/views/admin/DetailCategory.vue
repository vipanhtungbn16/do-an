<template>
  <div class="pages add__category">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="add__category-content cards">
            <div class="content-header">
              <div class="title-text">Category Information</div>
            </div>
            <div class="content">
              <div class="content__item ">
                <label class=" content__label col-md-3 fs-12">Name
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input col-md-9">
                  <p-input v-model="name" :value="name" placeholder="Name" type="text"></p-input>
                </div>
              </div>
              <div class="content__item">
                <label class=" content__label col-md-3 fs-12">Parent Category
                </label>
                <div class="content__input col-md-9">
                  <multiselect
                      v-model="selectedParent"
                      :options="listCategory"
                      :searchable="true"
                      :close-on-select="true"
                      :allow-empty="true"
                      label="name"
                      @select="handleSelect"
                      @remove="handleRemove"
                      placeholder="Select one">
                    >
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="content-footer">
              <button class="btn btn--primary" @click="handleCreate">Save</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {FETCH_CATEGORY, DETAIL_CATEGORY,UPDATE_CATEGORY} from "../../store/modules/category";
export default {
  name:'DetailCategory',
  data(){
    return{
      selectedParent:null,
      name:''
    }
  },
  computed:{
    ...mapState('category',{
      listCategory:(state) =>state.category,
      category:(state)=>state.detail_category
    })
  },
  methods:{
    ...mapActions('category',[FETCH_CATEGORY,DETAIL_CATEGORY,UPDATE_CATEGORY]),
    async init(){
     const { id } = this.$route.params
      await this[FETCH_CATEGORY]()
      let result =  await this[DETAIL_CATEGORY](id)
      if(!result.success){
        this.$toast.success(result.message, {
          position: "top-right",
        })
        return
      }
      this.name = this.category.name
      if(this.category.parentID){
        this.selectedParent = this.listCategory.filter(element =>{
          return element._id == this.category.parentID
        })
      }
    },
    handleSelect(value){
      this.selectedParent = value.parentID
    },
    handleRemove(){
      this.selectedParent = null
    },
    async handleCreate(){
      const { id } = this.$route.params
      let params = {
        id:id,
        content:{
          name:this.name,
          parentID:this.selectedParent[0]._id
        }
      }
      console.log(params)
      let result= await this[UPDATE_CATEGORY](params)
      if(!result.success){
        this.$toast.success(result.message, {
          position: "top-right",
        })
        return
      }
      this.$toast.success('Success', {
        position: "top-right",
      })
      this.$router.push({
        name:'category'
      })
    }
  },
  created() {
    this.init()
  }
}
</script>