<script>
  import { csv, scaleBand, scaleLinear, max } from "d3";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  const row = function (data) {
    data["Population"] = +data["2020"] * 1000; // + here is the unary conversion operator
    return data;
  };

  let dataset = [];
  onMount(async () => {
    dataset = await csv("../data/population_data.csv", row).then((data) => {
      return data.slice(0, 10);
    });
  });

  const margin = { top: 20, bottom: 20, left: 20, right: 20 };
  const width = 840,
    height = 60;

  $: yScale = scaleBand()
    .domain(dataset.map((d) => d["Location"]))
    .range([0, height])
    .paddingInner(0.15);

  $: xScale = scaleLinear()
    .domain([0, max(dataset, (d) => d.Population)])
    .range([0, width]);
</script>

<main>
  <svg {width} {height}>
    {#each dataset as data, i}
      <rect
        x={0}
        y={yScale(data.Location)}
        width={xScale(data.Population)}
        height={yScale.bandwidth()}
        in:fly={{ x: -200, duration: 1000, delay: i * 50 }}
      />
    {/each}
  </svg>
</main>

<style>
  rect {
    fill: #13293d;
  }
</style>
