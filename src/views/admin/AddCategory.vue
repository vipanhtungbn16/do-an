<template>
  <div class="pages mt-100 add__category">
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
                  <p-input v-model="name" placeholder="Name" type="text"></p-input>
                </div>
              </div>
              <div class="content__item">
                <label class=" content__label col-md-3 fs-12">Category
                  <span class="text-danger">*</span>
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
import {FETCH_CATEGORY,CREATE_CATEGORY} from "../../store/modules/category";
import {FETCH_DEPARTMENT} from "../../store/modules/department";
export default {
  name:'AddCategory',
  data(){
    return{
      selectedParent:null,
      name:''
    }
  },
  computed:{
    ...mapState('category',{
      listCategory:(state) =>state.category,

    }),
    ...mapState('department',{
      listDe :(state) => state.department
    })
  },
  methods:{
    ...mapActions('category',[FETCH_CATEGORY,CREATE_CATEGORY]),
    ...mapActions('department',[FETCH_DEPARTMENT]),
    async init(){
      let [result] = await Promise.all([
        this[FETCH_CATEGORY]({})
      ])
      if(!result.success){
        this.$toast.error('Something went wrong.', {
          position: "top-right",
        })
        return
      }
    },
    handleSelect(value){
     this.selectedParent = value.parentID
    },
    handleRemove(){
      this.selectedParent = null
    },
    async handleCreate(){
      let params = {
        name:this.name,
        parentID:this.selectedParent,
      }
      await this[CREATE_CATEGORY](params).then(res =>{
        if(res){
          this.$toast.success('Success', {
            position: "top-right",
          })
          this.$router.push({
            name:'category'
          })
        }
      }).catch(err=>{
        err.forEach(element=>{
          this.$toast.error(`${element.msg}`, {
            position: "top-right",
          })
        })
      })

    }
  },
  created() {
    this.init()
  }
}
</script>