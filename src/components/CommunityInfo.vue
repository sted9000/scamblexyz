<template>
  <SectionHeader title="Community" />
  <div class="carousel carousel-center w-full">

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">
            Yesterday's Leaderboard Winner
          </div>
          <div className="stat-value text-info flex items-center">
            <img src="/images/profile/2.png" class="h-8 w-8 mr-2" />
            <div class="stat-value">Ureper442</div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div className="carousel-item stats ml-6 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Today's Checkins</div>
          <div className="stat-value flex items-center text-primary">
            <UserGroupIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">1162</div>
          </div>
          <div class="stat-desc">We had 3021 Yesterday!</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Confirmed Bonuses</div>
          <div className="stat-value flex items-center text-secondary">
            <GiftIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">592</div>
          </div>
          <div class="stat-desc">Added 123 Points Yesterday</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">New Bonuses</div>
          <div className="stat-value flex items-center text-secondary">
            <GiftIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">592</div>
          </div>
          <div class="stat-desc">Added 123 Points Yesterday</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">New Drops</div>
          <div className="stat-value">No</div>
          <div class="stat-desc">Chumba expected next week</div>
        </div>
      </div>
    </div>



    <!-- <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Drops Reported</div>
          <div className="stat-value text-gray-400">No</div>
        </div>
      </div>
    </div>



    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Community Checkins</div>
          <div className="stat-value text-primary">735</div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script setup>
// import ScrollingTickerComponent from "@/components/ScrollingTickerComponent.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { GiftIcon, UserGroupIcon } from "@heroicons/vue/24/outline";
</script>
