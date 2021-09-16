<template>
  <div class="overview p-24 mt-100 pages">
    <div class="container ">
      <div class="row">
        <div class="col-md-8">
          <div class="overview__content">
            <div class="overview__order ">
              <div class="box-icon">
              </div>
              <div class="number__order">
                23 789
                <div class="text" >Orders</div>
              </div>
            </div>
            <div class="overview__profit ">
              <div class="box-icon">
              </div>
              <div class="number__order">
                $23 789
                <div class="text">
                  Profit
                </div>
              </div>
            </div>
          </div>

          <div class="overview__chart mt-4">
            <div class="overview__chart-title">Sales statistics</div>
            <area-chart></area-chart>
          </div>
        </div>
        <div class="col-md-4">
          <div class="overview__top">
            <div class="overview__top-header">
              <div class="overview__top-title">Top selling products</div>
              <div class="overview__top-link">See all</div>
            </div>
            <div class="overview__top-content">
              <ul class="top-sell-list mt-4">
                <li class="top-sell-item">
                  <div class="number">1</div>
                  <img class="item-img" src="@/assets/img/product.png"/>
                  <div class="item-info">
                    <div class="item-name">Tshirt Levis</div>
                    <div class="item-price">$ 49,99</div>
                  </div>
                </li>
                <li class="top-sell-item">
                  <div class="number">2</div>
                  <img class="item-img" src="@/assets/img/product.png"/>
                  <div class="item-info">
                    <div class="item-name">Tshirt Levis</div>
                    <div class="item-price">$ 49,99</div>
                  </div>
                </li>
                <li class="top-sell-item">
                  <div class="number">3</div>
                  <img class="item-img" src="@/assets/img/product.png"/>
                  <div class="item-info">
                    <div class="item-name">Tshirt Levis</div>
                    <div class="item-price">$ 49,99</div>
                  </div>
                </li>
                <li class="top-sell-item">
                  <div class="number">4</div>
                  <img class="item-img" src="@/assets/img/product.png"/>
                  <div class="item-info">
                    <div class="item-name">Tshirt Levis</div>
                    <div class="item-price">$ 49,99</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AreaChart from "../components/AreaChart";
export default {
  name: "OverView",
  components:{AreaChart}
};
</script>

