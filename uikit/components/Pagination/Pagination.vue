<template>
  <div v-if="pageCount > 0" class="pagination-box">
    <nav>
      <ul class="p__pagination">
        <li class="p__pagination-item" :class="{ disabled: !hasPrev }">
          <a
            role="button"
            href="#"
            class="p__pagination-link"
            :class="{ disabled: !hasPrev }"
            :disabled="!hasPrev"
            @click.prevent="prev"
          >
            <i class="fas fa-chevron-left icon"></i>

          </a>
        </li>
        <!--First button-->
        <li v-if="hasFirst" class="p__pagination-item">
          <a
            role="button"
            href="#"
            class="p__pagination-link"
            @click.prevent="first"
          >
            1
          </a>
        </li>
        <li class="m-1" v-if="hasFirstEllipsis">
          <span class="p-pagination-ellipsis">&hellip;</span>
        </li>
        <li
          class="p__pagination-item"
          :class="{ active: page.isCurrent }"
          v-for="page in pagesInRange"
          :key="page.number"
        >
          <a
            role="button"
            href="#"
            class="p__pagination-link"
            @click.prevent="page.click"
          >
            {{ page.number }}
          </a>
        </li>
        <!--Last-->
        <li class="m-1" v-if="hasLastEllipsis"
        ><span class="p-pagination-ellipsis">&hellip;</span></li
        >
        <li class="p__pagination-item" v-if="hasLast">
          <a
              role="button"
              href="#"
              class="p__pagination-link"
              @click.prevent="last"
          >
            {{ pageCount }}
          </a>
        </li>
        <li class="p__pagination-item " :class="{ disabled: !hasNext }">
          <a
              role="button"
              href="#"
              class="p__pagination-link"
              :class="{ disabled: !hasNext }"
              :disabled="!hasNext"
              @click.prevent="next"
          >
            <i class="fas fa-chevron-right icon"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Ppagination",
  props: {
    total: [Number, String],
    perPage: {
      type: [Number, String],
      default: 20,
    },
    current: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {};
  },
  computed:{
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
    hasFirst() {
      return this.current >= 3
    },
    /**
     * Check if previous button is available.
     */
    hasPrev() {
      return this.current > 1;
    },
    /**
     * Check if first ellipsis should be visible.
     */
    hasFirstEllipsis() {
      return this.current >= 5;
    },
    /**
     * Check if last ellipsis should be visible.
     */
    hasLastEllipsis() {
      return this.current < this.pageCount - 3
    },
    /**
     * Get near pages, 1 before and 1 after the current.
     * Also add the click event to the array.
     */
    pagesInRange() {
      if (this.simple) {
        return;
      }
      let left = Math.max(1, this.current - 1);
      if (left - 1 === 2) {
        left--; // Do not show the ellipsis if there is only one to hide
      }
      let right = Math.min(this.current + 1, this.pageCount);
      if (this.pageCount - right === 2) {
        right++; // Do not show the ellipsis if there is only one to hide
      }
      const pages = [];
      for (let i = left; i <= right; i++) {
        pages.push({
          number: i,
          isCurrent: this.current === i,
          click: (event) => {
            if (this.current === i) {
              return;
            }
            this.$emit("change", i);
            this.$emit("update:current", i);
            // Set focus on element to keep tab order
            this.$nextTick(() => event.target.focus());
          },
        });
      }
      return pages;
    },
    hasLast() {
      return this.current <= this.pageCount - 2
    },
    hasNext() {
      return this.current < this.pageCount
    },
  },
  methods: {

    /**
     * Previous button click listener.
     */
    prev() {
      if (!this.hasPrev) {
        return;
      }
      this.$emit("change", this.current - 1);
      this.$emit("update:current", this.current - 1);
    },

    first() {
      this.$emit("change", 1);
      this.$emit("update:current", 1);
    },
    last() {
      this.$emit("change", this.pageCount);
      this.$emit("update:current", this.pageCount);
    },


    next() {
      if (!this.hasNext) {
        return
      }
      this.$emit('change', this.current + 1)
      this.$emit('update:current', this.current + 1)
    },
  },
  watch: {
    /**
     * If current page is trying to be greater than page count, set to last.
     */
    pageCount(value) {
      if (this.current > value) {
        this.last()
      }
    },
  },
};
</script>
