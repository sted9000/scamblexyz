<template>
  <ViewHeader :title="props.title" />
  <div class="container mx-auto px-4 pb-8">
    <div class="space-y-8">
      <section>
        <h2 class="text-3xl font-semibold mb-4 text-primary">What is Scambling?</h2>
        <p class="text-lg">Scambling is a gamified version of "Sweeps Coin Gambling." At Scamblexyz, we're amping up the sweepstakes casino experience by adding friendly competition and providing the community with tools to "scamble" more effectively. Our goal? To make scambling fun, inviting, and rewarding!</p>
      </section>

      <section>
        <h2 class="text-3xl font-semibold mb-4 text-secondary">Our Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl mb-2 text-accent">Daily Check-ins</h3>
              <p>Maximize your rewards with minimal effort! Many sweepstakes sites offer small bonuses just for logging in. With Scamblexyz, you can:</p>
              <ul class="list-disc list-inside mt-2">
                <li>Configure multiple check-in sites</li>
                <li>Earn bonuses with just a few clicks</li>
                <li>Accumulate points and climb our leaderboard</li>
                <li>Turn minutes of effort into daily rewards</li>
              </ul>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl mb-2 text-info">Bonus Tracking</h3>
              <p>Never miss out on a bonus again! Sweepstakes casinos offer various promotions, and we make it easy to capitalize on them all:</p>
              <ul class="list-disc list-inside mt-2">
                <li>View community-reported bonuses</li>
                <li>Track your active bonuses</li>
                <li>Earn leaderboard points for claiming bonuses</li>
              </ul>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl mb-2 text-primary">Postcard Campaigns</h3>
              <p>Many sites allow you to receive sweeps coins by sending in postcards. With Scamblexyz, you can:</p>
              <ul class="list-disc list-inside mt-2">
                <li>Track your postcard submissions</li>
                <li>Monitor processing times across different sites</li>
                <li>Optimize your postcard strategy</li>
              </ul>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl mb-2 text-secondary">Game Analytics</h3>
              <p>After collecting your sweeps coins, it's time to play! Our platform helps you make informed decisions:</p>
              <ul class="list-disc list-inside mt-2">
                <li>Track your gameplay across multiple sites</li>
                <li>Analyze game performance and payouts</li>
                <li>Discover the best games for scambling</li>
              </ul>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl mb-2 text-accent">Real-time Leaderboards</h3>
              <p>Compete with fellow scamblers and prove your skills! Our leaderboard system:</p>
              <ul class="list-disc list-inside mt-2">
                <li>Awards points for check-ins, bonuses, and postcards</li>
                <li>Updates in real-time</li>
                <li>Offers transparent scoring (see our algorithm <a href="#" class="link link-primary">here</a>)</li>
              </ul>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl mb-2 text-info">News and Articles</h3>
              <p>Stay informed about the dynamic world of scambling:</p>
              <ul class="list-disc list-inside mt-2">
                <li>Read the latest industry news</li>
                <li>Enjoy articles on strategies and tips</li>
                <li>Keep up with regulatory changes and site updates</li>
              </ul>
            </div>
          </div>
        </div>
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
