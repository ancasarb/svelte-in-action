<script>
  import { onMount } from "svelte";
  import { csv, scaleLinear, extent, scaleOrdinal } from "d3";
  import { petalPaths } from "./paths";
  import Axis from "./Axis.svelte";

  const row = function (data) {
    data.sepal_length = +data.sepal_length;
    data.sepal_width = +data.sepal_width;
    data.petal_length = +data.petal_length;
    data.petal_width = +data.petal_width;

    return data;
  };

  let dataset = [];

  onMount(async () => {
    dataset = await csv(
      "https://gist.githubusercontent.com/curran/9e04ccfebeb84bcdc76c/raw/3d0667367fce04e8ca204117c290c42cece7fde0/iris.csv",
      row
    ).then((data) => {
      return data;
    });
  });

  const colorSet = new Set(dataset.map((d) => d.class));
  const classSet = new Set(dataset.map((d) => d.class));

  const margin = { top: 15, bottom: 50, left: 50, right: 20 };
  const width = 900,
    height = 600;

  const innerHeight = height - margin.top - margin.bottom,
    innerWidth = width - margin.left - margin.right;

  $: xScale = scaleLinear()
    .domain(extent(dataset, (d) => d.petal_width))
    .range([0, innerWidth]);

  $: yScale = scaleLinear()
    .domain(extent(dataset, (d) => d.petal_length))
    .range([innerHeight, 0]);

  $: colorScale = scaleOrdinal()
    .domain(colorSet)
    .range(["#003049", "#d62828", "#f77f00"]);

  $: shapeScale = scaleOrdinal().domain(classSet).range(petalPaths);
</script>

<main />
<main>
  <svg {width} {height}>
    <g transform={`translate(${margin.left},${margin.top})`}>
      <Axis {innerHeight} {margin} scale={xScale} position="bottom" />
      <Axis {innerHeight} {margin} scale={yScale} position="left" />
      <text transform={`translate(${-25},${innerHeight / 2}) rotate(-90)`}
        >Petal Length
      </text>
      {#each dataset as data, i}
        <!-- <circle
          cx={xScale(data.petal_width)}
          cy={yScale(data.petal_length)}
          r="5"
          style={`fill:${colorScale(data.class)}`}
        /> -->
        <g
          transform={`translate(${xScale(data.petal_width)},${
            yScale(data.petal_length) - 5
          })`}
        >
          <path d={shapeScale(data.class)} fill={`${colorScale(data.class)}`} />
        </g>
      {/each}
      <text x={innerWidth / 2} y={innerHeight + 35}>Petal Width</text>
    </g>
  </svg>
</main>

<style>
</style>
