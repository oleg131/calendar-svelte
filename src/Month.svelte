<script>
    import { format, addDays, addMonths, isBefore, getDay } from "date-fns";

    import Day from "./Day.svelte";

    import { chunk } from "./utils.js";

    export let startDate, markedDays;

    // Generate days
    let days = [];
    for (
        var m = startDate;
        isBefore(m, addMonths(startDate, 1));
        m = addDays(m, 1)
    ) {
        days.push(m);
    }
    // Fill in weekdays from other months
    var nBefore = getDay(days[0]);
    var nAfter = getDay(6 - days[days.length - 1]);
    days.unshift(...[...Array(nBefore).keys()].map(() => null));
    days.push(...[...Array(nAfter).keys()].map(() => null));
</script>

<style>
    .month {
        width: 100%;
    }

    .day {
        width: 30px;
        cursor: pointer;
        margin: 0 auto;
        padding: 2px;
    }

    .day-box {
        width: 14%;
    }

    .day-old {
        cursor: default;
    }
</style>

<table class="month mb-3">
    <thead>
        <tr>
            <th class="month-title" colSpan="7">{format(startDate, 'MMMM')}</th>
        </tr>
        <tr>
            <th class="day-header">Su</th>
            <th class="day-header">Mo</th>
            <th class="day-header">Tu</th>
            <th class="day-header">We</th>
            <th class="day-header">Th</th>
            <th class="day-header">Fr</th>
            <th class="day-header">Sa</th>
        </tr>
    </thead>
    <tbody>
        {#each chunk(days, 7) as row}
            <tr>
                {#each row as day}
                    {#if day}
                        <td class="day-box">
                            <Day {day} bind:markedDays />
                        </td>
                    {:else}
                        <td class="day day-old" />
                    {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
