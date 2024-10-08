<template>
  <div class="flex flex-col h-screen border-l-2 border-gray-200">
    <SectionHeader
      title="News and Articles"
      :icon="UserGroupIcon"
      class="mt-6"
    />
    <div v-for="item in items" :key="item.id">
      <div
        class="flex flex-col p-4 rounded mx-2 mb-4"
        :class="getBackgroundColor(item.source)"
      >
        <div class="flex justify-between">
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <span class="text-sm text-gray-500">{{ item.source }}</span>
        </div>
        <p class="mt-2 text-sm text-gray-600 line-clamp-4">{{ item.body }}</p>
        <div class="flex justify-between items-center mt-2">
          <div>
            <span class="text-sm text-gray-500">{{ item.date }}</span>
            <span class="text-sm text-gray-500 ml-2">|</span>
            <span class="text-sm text-gray-500 ml-2">{{ item.type }}</span>
          </div>
          <button class="btn btn-sm">Read More</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { UserGroupIcon } from "@heroicons/vue/24/outline";
const items = [
  {
    id: 0,
    title: "Good Scambling Resources",
    body: "If you're looking to dive into the world of scambling, you'll need reliable resources to guide you. This comprehensive list includes websites, forums, and YouTube channels dedicated to scambling strategies, techniques, and community discussions. From beginner-friendly tutorials to advanced tactics, these resources cover everything you need to know. You'll find in-depth analyses of various scambling methods, tips for managing your bankroll, and insights into the psychology behind successful scambling. The list also features reputable online platforms where you can practice your skills in a safe environment. Don't forget to check out the recommended books and podcasts for even more knowledge. Whether you're a novice or an experienced scambler, these resources will help you stay informed and improve your game. Remember to always gamble responsibly and within your means.",
    type: "Link",
    date: "2021-10-10",
    source: "Reddit",
  },
  {
    id: 1,
    title: "What the F is Scambling",
    body: "Scambling, a portmanteau of 'scam' and 'gambling,' is a controversial practice that blurs the line between legitimate gambling and fraudulent activities. It often involves manipulating odds, exploiting loopholes in gaming systems, or using deceptive tactics to gain an unfair advantage. While some view scambling as a clever way to beat the system, others consider it unethical and potentially illegal. Scambling techniques can range from simple card counting in blackjack to sophisticated algorithms used in online betting. The term has gained traction in recent years due to the rise of cryptocurrency gambling and the increasing complexity of online betting platforms. It's important to note that engaging in scambling can lead to serious consequences, including legal troubles and lifetime bans from casinos or betting sites. As the gambling industry evolves, so do the methods of scambling, making it a constant cat-and-mouse game between operators and those looking to exploit the system.",
    type: "Article",
    date: "2021-10-10",
    source: "Moderator",
  },
  {
    id: 2,
    title: "Best Deposit Bonuses???",
    body: "Deposit bonuses are a key feature in the world of online gambling and scambling, offering players extra funds or free spins when they add money to their account. These bonuses can significantly boost your playing power, but it's crucial to understand the terms and conditions attached. The best deposit bonuses offer a balance between generous amounts and fair wagering requirements. Look for bonuses that match a high percentage of your deposit, ideally 100% or more. However, be wary of bonuses that seem too good to be true, as they often come with stringent playthrough conditions. Some top-rated bonuses include those with low wagering requirements, no maximum cashout limits, and longer validity periods. It's also worth considering bonuses that are tailored to your preferred games. Remember, while deposit bonuses can enhance your gaming experience, they should never be the sole reason for choosing a particular platform. Always prioritize reputable, licensed operators to ensure a safe and fair gaming environment.",
    type: "Link",
    date: "2021-10-10",
    source: "Reddit",
  },
  {
    id: 2,
    title: "How to Make Money Scambling",
    body: "Deposit bonuses are a key feature in the world of online gambling and scambling, offering players extra funds or free spins when they add money to their account. These bonuses can significantly boost your playing power, but it's crucial to understand the terms and conditions attached. The best deposit bonuses offer a balance between generous amounts and fair wagering requirements. Look for bonuses that match a high percentage of your deposit, ideally 100% or more. However, be wary of bonuses that seem too good to be true, as they often come with stringent playthrough conditions. Some top-rated bonuses include those with low wagering requirements, no maximum cashout limits, and longer validity periods. It's also worth considering bonuses that are tailored to your preferred games. Remember, while deposit bonuses can enhance your gaming experience, they should never be the sole reason for choosing a particular platform. Always prioritize reputable, licensed operators to ensure a safe and fair gaming environment.",
    type: "Link",
    date: "2021-10-10",
    source: "Site",
  },
];

const getBackgroundColor = (source) => {
  switch (source) {
    case "Reddit":
      return "bg-orange-50";
    case "Moderator":
      return "bg-indigo-50";
    default:
      return "bg-gray-50";
  }
};
</script>
