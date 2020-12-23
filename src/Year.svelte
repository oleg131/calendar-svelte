<script>
    import { addMonths } from "date-fns";

    import Month from "./Month.svelte";

    import { chunk } from "./utils";

    export let year, markedDays;

    function prevYear() {
        year -= 1;
    }
    function nextYear() {
        year += 1;
    }

    // Generate months
    let months = Array.from(Array(12).keys()).map((i) =>
        addMonths(new Date(year, 0, 1), i)
    );
</script>

<div>
    <h1>
        <button
            type="button"
            class="btn btn-link"
            on:click|preventDefault={prevYear}>
            ←
        </button>
        {year}
        <button
            type="button"
            class="btn btn-link"
            on:click|preventDefault={nextYear}>
            →
        </button>
    </h1>

    {#each chunk(months, 3) as row}
        <div class="row">
            {#each row as startDate}
                <div class="col-sm-4">
                    <Month {startDate} bind:markedDays />
                </div>
            {/each}
        </div>
    {/each}
</div>
