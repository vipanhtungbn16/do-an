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
                  <p-input placeholder="Name" type="text"></p-input>
                </div>
              </div>
              <div class="content__item">
                <label class=" content__label col-md-3 fs-12">Category
                  <span class="text-danger">*</span>
                </label>
                <div class="content__input col-md-9">
                  <multiselect
                      v-model="selectedParent"
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
            </div>
            <div class="content-footer">
              <button class="btn btn--primary">Save</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'AddCategory',
  data(){
    return{
      selectedParent:null,
      options:[ { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' }]
    }
  }
}
</script>