<template>
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeaderComponent :appName="appName"/>
      <CallToActionComponent :main-description="mainDescription" :secondary-description="secondaryDescription"/>
      <AppPreviewComponent :imagePath="imagePath"/>
      <FooterComponent/>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import CallToActionComponent from './components/CallToActionComponent.vue'
import AppPreviewComponent from './components/AppPreviewComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const appName = ref('GambitPLO')
const mainDescription = ref('Start Learning Pot Limit Omaha Visually and Intuitively!')
const secondaryDescription = ref('A modern webapp that helps you learn Game Theory Optimal PLO starting ranges with Heatmaps and Quizzes.')
const imagePath = ref('/images/app-preview/')
</script>
