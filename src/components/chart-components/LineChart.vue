<template>
  <div class="col-12 line-div">
    <svg id="line-chart" />
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as nv from 'nvd3';
import { colors } from 'quasar';

export default {
  name: 'line-chart',
  props: ['Todos'],
  mounted() {
    this.$nextTick(function () {
      let sin = [],
        sin2 = [],
        cos = [];

      // Data is represented as an array of {x,y} pairs.
      for (let i = 0; i < 100; i++) {
        sin.push({ x: i, y: Math.sin(i / 10) });
        sin2.push({ x: i, y: Math.sin(i / 10) * 0.25 + 0.5 });
        cos.push({ x: i, y: 0.5 * Math.cos(i / 10) });
      }
      this.testData = [
        {
          values: sin, // values - represents the array of {x,y} data points
          key: 'Sine Wave', // key  - the name of the series.
          color: '#ff7f0e', // color - optional: choose your own line color.
          area: false,
        },
        {
          values: cos,
          key: 'Cosine Wave',
          color: '#2ca02c',
          area: false,
        },
        {
          values: sin2,
          key: 'Another sine wave',
          color: '#7777ff',
          area: false, // area - set to true if you want this line to turn into a filled area chart.
        },
      ];
      this.drawPieGraph(this.testData);
    });
  },
  methods: {
    drawPieGraph(data) {
      const svg = d3.select('#line-chart');
      const colorArray = data.map(data => data.color);
      nv.addGraph(() => {
        const chart = nv.models
          .lineChart()
          .margin({ left: 100 }) // Adjust chart margins to give the x-axis some breathing room.
          .useInteractiveGuideline(true) // We want nice looking tooltips and a guideline!
          // .transitionDuration(350) //how fast do you want the lines to transition?
          .showLegend(true) // Show the legend, allowing users to turn on/off line series.
          .showYAxis(true) // Show the y-axis
          .showXAxis(true); // Show the x-axis

        // .color(colorArray);

        chart.xAxis // Chart x-axis settings
          .axisLabel('Time (ms)')
          .tickFormat(d3.format(',r'));

        chart.yAxis // Chart y-axis settings
          .axisLabel('Voltage (v)')
          .tickFormat(d3.format('.02f'));

        /* Done setting the chart up? Time to render it! */
        const myData = data; // You need data...

        svg // Select the <svg> element you want to render the chart in.
          .datum(myData) // Populate the <svg> element with chart data...
          .attr('each-line', 'line')
          .call(chart); // Finally, render the chart!

        // Update the chart when window resizes.
        nv.utils.windowResize(() => {
          chart.update();
        });
        return chart;
      });
    },
  },
};
</script>

<style scoped>
#line-chart {
  width: 1000px;
  height: 500px;
  padding: 0px;

  /* stroke-width: 1.5px; */
}

/* .line-chart {
  display: flex;
  align-items: center;
  justify-content: center;
}  */
</style>
