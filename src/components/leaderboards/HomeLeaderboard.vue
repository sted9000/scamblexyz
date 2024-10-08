<template>
  <SectionHeader title="Your Overview" />
  <div class="carousel carousel-center w-full">
    <div class="carousel-item">
      <div className="carousel-item stats ml-6 bg-gray-100 text-gray-700">
        <div className="stat text-info">
          <div className="stat-title text-gray-700">Overall Rank</div>
          <div className="stat-value flex items-center">
              <TrophyIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">12</div>
            </div>
          <div className="stat-desc">153 Points Behind 11th Place</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div className="carousel-item stats ml-6 bg-gray-100 text-gray-700">
        <div className="stat text-info">
          <div className="stat-title text-gray-700">Overall Points</div>
          <div className="stat-value flex items-center">
              <ArrowUpIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">1532</div>
            </div>
          <div className="stat-desc">Added 123 Points Yesterday</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Checkins Points</div>
            <div className="stat-value text-primary flex items-center">
              <CheckBadgeIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">1532</div>
            </div>
            <div class="stat-desc">Added 123 Points Yesterday</div>
          </div>
        </div>
      </div>

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Bonus Points</div>
          <div className="stat-value flex items-center text-secondary">
            <GiftIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">592</div>
          </div>
          <div className="stat-desc">Added 123 Points Yesterday</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Postcard Points</div>
          <div className="stat-value text-accent flex items-center">
            <EnvelopeIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">1532</div>
          </div>
          <div className="stat-desc">Added 123 Points Yesterday</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import ScrollingTickerComponent from "@/components/ScrollingTickerComponent.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { ArrowUpIcon, CheckBadgeIcon, EnvelopeIcon, GiftIcon, TrophyIcon } from "@heroicons/vue/24/outline";
</script>
