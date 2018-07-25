<template>
  <div class="col-12 pie-div">
    <svg id="pie-chart" />
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as nv from 'nvd3';
import { colors } from 'quasar';

export default {
  name: 'pie-chart',
  props: ['Todos'],
  mounted() {
    this.$nextTick(function () {
      console.log(this.Todos);
      this.testData = [
        {
          label: 'Complete',
          value: 3,
          color: colors.getBrand('positive'),
          arcRadius: { outer: 1, inner: 0.7 },
        },
        {
          label: 'In Progress',
          value: 1,
          color: colors.getBrand('light'),
          arcRadius: { outer: 1, inner: 0.7 },
        },
        {
          label: 'Incomplete',
          value: 4,
          color: colors.getBrand('negative'),
          arcRadius: { outer: 1, inner: 0.7 },
        },
      ];
      this.drawPieGraph(this.testData);
    });
  },
  methods: {
    drawPieGraph(data) {
      const svg = d3.select('#pie-chart');
      const that = this;
      const colorArray = data.map(data => data.color);
      nv.addGraph(() => {
        const pieChart = nv.models
          .pieChart()
          .x(d => d.label)
          .y(d => d.value)
          .showLabels(false)
          .showLegend(false)
          .color(colorArray)
          .legendPosition('bottom')
          .donut(true)
          .donutRatio(0.5)
          .margin({
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          })
          .cornerRadius(2)
          .padAngle(0.1);

        svg
          .datum(data)
          .transition()
          .duration(350)
          .call(pieChart);

        return pieChart;
      });
    },
  },
};
</script>

<style scoped>
#pie-chart {
  width: 350px;
  height: 350px;
  padding: 0px;
}
.pie-div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
