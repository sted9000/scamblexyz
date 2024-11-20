<template>
  <ViewHeader :title="props.title" />
  <div class="container mx-auto px-4 pb-8">
    <div class="space-y-8 max-w-3xl">
      <section>
        <h2 class="text-xl font-semibold mb-2 text-gray-700">Overview</h2>
        <p>Sweeps Coin Gambling, aka Scambling, should be fun. To that end, ScambleXYZ is a collection of tools to make scambling easier and to foster a competitive and open community.</p>
        <ul class="list-disc list-inside space-y-3 mt-4">
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">To make checkin bonuses easy to claim they are launched with a single click and tracked to let you know when you can checkin again.</span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Find the best bonuses available by seeing what other community members have reported. </span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Track your postcards submittions and see when drops are happening.</span>
          </li>
        </ul>
      </section>
      <section>
        <h2 class="text-xl font-semibold mb-2 text-gray-700">Leaderboards</h2>
        <p>Compete on the Checkin, Bonuses, or Postcard Leaderboards as well as an Overall Leaderboard. </p>
        <p>Points are awarded as follows:</p>
        <ul class="list-disc list-inside space-y-3 mt-4">
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Checkins are worth 1 point + your current streak divided by 10 (rounded to the a whole number).</span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Recording a bonus is worth 1 point and by reporting a new bonus that gets confirmed by another user you receive 10 points. </span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Each postcard submitted gets you 1 point and each dropped postcard gets you 2 more. </span>
          </li>
        </ul>
      </section>
      <section>
        <h2 class="text-xl font-semibold mb-2 text-gray-700">Resources and Acknowledgements</h2>
        <p>I'd like to thank the following communities for their help in building Scamblexyz:</p>
        <ul class="list-disc list-inside space-y-3 mt-4">
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2"><a href="https://discord.gg/sweepstakes" class="text-primary">Sweepstakes Discord</a></span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2"><a href="https://discord.gg/chumba" class="text-secondary">ChumbaCasino subreddit</a></span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">and all the scamblers who have contributed. Thanks for the help!</span>
          </li>
        </ul>

      </section>
     
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";

const props = defineProps({
  title: String,
});
</script>
