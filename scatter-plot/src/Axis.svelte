<script>
  import { select, selectAll } from "d3-selection";
  import { axisBottom, axisLeft } from "d3-axis";

  export let innerHeight;
  export let margin;
  export let position;
  export let scale;

  let transform;
  let g;
  $: {
    select(g).selectAll("*").remove();
    let axis;
    switch (position) {
      case "bottom":
        axis = axisBottom(scale).tickSizeOuter(0);
        transform = `translate(0, ${innerHeight})`;
        break;
      case "left":
        axis = axisLeft(scale).tickSizeOuter(0);
        // dunno exactly what was the intention of translating here `translate(margin, 0)` doesn't work because margin is an object
        transform = `translate(0, 0)`;
    }
    select(g).call(axis);
  }
</script>

<g class="axis" bind:this={g} {transform} />
