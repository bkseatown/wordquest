(function () {
  "use strict";

  // Optional per-word overrides for K-2 / EAL mode.
  // Supports:
  // - root: { def_young, sentence_young } (English default)
  // - language-specific: { en: { def_young, sentence_young }, es: {...}, zh: {...}, tl: {...} }
  window.YOUNG_AUDIENCE_OVERRIDES = {
    cat: {
      def_young: "A small pet with whiskers that likes to nap and play.",
      sentence_young: "The cat sat by the window and watched a bird."
    },
    dog: {
      def_young: "A friendly pet that can guard the house and play fetch.",
      sentence_young: "The dog ran to the door when it heard the keys."
    },
    baby: {
      def_young: "A very young child who needs care and comfort.",
      sentence_young: "The baby held a spoon and laughed."
    },
    pig: {
      def_young: "A farm animal with a round nose.",
      sentence_young: "The pig rolled in the mud on the farm."
    },
    tax: {
      def_young: "Money people pay to help community services.",
      sentence_young: "Adults pay tax to support roads, schools, and parks."
    },
    sharp: {
      def_young: "Having a point or edge that makes neat, clear lines.",
      sentence_young: "The sharp pencil zoomed across the page and drew a rocket."
    },
    dull: {
      def_young: "Not sharp, so it makes soft or faint marks.",
      sentence_young: "My dull crayon made sleepy lines, so I grabbed a brighter one."
    },
    butter: {
      def_young: "A soft, creamy spread that can melt on warm food.",
      sentence_young: "The butter melted on warm toast before breakfast."
    },
    blood: {
      def_young: "A red liquid in your body that carries oxygen where it is needed.",
      sentence_young: "In science class, we learned blood is like a delivery team in the body."
    },
    through: {
      def_young: "From one side to the other side.",
      sentence_young: "We tiptoed through the hallway like secret library ninjas."
    },
    history: {
      def_young: "The study of people, places, and events from long ago.",
      sentence_young: "In history class, we read old stories and imagined interviewing a time traveler."
    },
    force: {
      en: {
        def_young: "Using strength to push or pull something.",
        sentence_young: "Maya used force to push the heavy gym door open."
      },
      es: {
        def_young: "Usar fuerza para empujar o jalar algo.",
        sentence_young: "Maya usó fuerza para empujar la puerta pesada del gimnasio y luego celebró con un bailecito."
      },
      zh: {
        def_young: "用力去推或拉某样东西。",
        sentence_young: "玛雅用力推开体育馆沉重的门，然后开心地跳了一个小舞步。"
      },
      tl: {
        def_young: "Paggamit ng lakas para itulak o hilahin ang isang bagay.",
        sentence_young: "Gumamit si Maya ng lakas para itulak ang mabigat na pinto ng gym, tapos napasayaw siya sa tuwa."
      },
      hi: {
        def_young: "किसी चीज़ को धक्का देने या खींचने के लिए ताकत का उपयोग करना।",
        sentence_young: "माया ने भारी जिम का दरवाज़ा खोलने के लिए ताकत लगाई और खुशी में छोटा सा डांस किया।"
      }
    },
    web: {
      def_young: "A sticky net made by a spider.",
      sentence_young: "We saw a spider web shining in the morning light."
    },
    vet: {
      def_young: "A doctor who helps animals stay healthy.",
      sentence_young: "The vet checked the puppy and gave it a treat."
    },
    stress: {
      def_young: "A worried feeling in your mind or body.",
      sentence_young: "When I feel stress, I take a slow breath."
    },
    drill: {
      def_young: "A tool that can make holes in wood or walls.",
      sentence_young: "The worker used a drill to fix the shelf."
    },
    kin: {
      def_young: "Your family members and relatives.",
      sentence_young: "My kin came over for a family dinner."
    },
    jam: {
      def_young: "Sweet fruit spread for bread or toast.",
      sentence_young: "I spread jam on my toast for breakfast."
    },
    gap: {
      def_young: "An empty space between two things.",
      sentence_young: "There is a small gap between the boards."
    },
    van: {
      def_young: "A larger vehicle that can carry people or supplies.",
      sentence_young: "The class used a van to travel to the museum."
    },
    hem: {
      def_young: "The folded edge at the bottom of clothing.",
      sentence_young: "She stitched the hem so the dress fit well."
    },
    bug: {
      def_young: "A small insect.",
      sentence_young: "A small bug landed on the leaf."
    },
    globe: {
      en: {
        def_young: "A round map of Earth with countries and oceans.",
        sentence_young: "We spun the globe and found an island near the equator."
      },
      es: {
        def_young: "Un mapa redondo de la Tierra con países y océanos.",
        sentence_young: "Giramos el globo y encontramos una isla cerca del ecuador."
      },
      zh: {
        def_young: "一个圆形的地球地图，可以看到国家和海洋。",
        sentence_young: "我们转动地球仪，在赤道附近找到了一个小岛。"
      },
      tl: {
        def_young: "Isang bilog na mapa ng mundo na may mga bansa at karagatan.",
        sentence_young: "Pinaikot namin ang globo at nakakita ng pulo malapit sa ekwador."
      },
      vi: {
        def_young: "Mô hình Trái Đất hình tròn có các nước và đại dương.",
        sentence_young: "Chúng em xoay quả địa cầu và tìm thấy một hòn đảo gần xích đạo."
      },
      ms: {
        def_young: "Peta dunia berbentuk bulat dengan negara dan lautan.",
        sentence_young: "Kami memutar glob dan menemui sebuah pulau dekat khatulistiwa."
      }
    }
  };
})();
