<script>
    import { onMount } from "svelte";

    import { format, getDate } from "date-fns";

    export let day, markedDays;

    const CURRENT_DAY = format(new Date(), "yyyy-MM-dd");

    let ref;

    function generateClassName(markedDays) {
        let className = "day";
        if (markedDays.includes(format(day, "yyyy-MM-dd"))) {
            className = className + " day-highlight";
        }
        if (format(day, "yyyy-MM-dd") === CURRENT_DAY) {
            className += " day-current";
        }
        return className;
    }

    $: className = generateClassName(markedDays);

    function onClick(day) {
        day = format(day, "yyyy-MM-dd");
        const newMarkedDays = markedDays.slice();
        if (!markedDays.includes(day)) {
            newMarkedDays.push(day);
        } else {
            newMarkedDays.splice(newMarkedDays.indexOf(day), 1);
        }
        markedDays = newMarkedDays;
    }

    onMount(() => {
        if (format(day, "yyyy-MM-dd") === CURRENT_DAY) {
            console.log(CURRENT_DAY);
            ref.scrollIntoView();
        }
    });
</script>

<style>
    .day {
        width: 30px;
        cursor: pointer;
        margin: 0 auto;
        padding: 2px;
    }

    .day-highlight {
        background-color: #e6194b;
        border-radius: 15px;
    }

    .day-current {
        border: 2px solid black;
        border-radius: 15px;
    }
</style>

<div
    class={className}
    bind:this={ref}
    on:click|preventDefault={(e) => onClick(day)}>
    {getDate(day)}
</div>
