<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
 
interface ContetnItem {
  title: string,
  id: number,
  parenid?: number,
  subtitle?: number,
  namespace: string,
  channelId: number,
  highload: number,
  typeId: number,
  priority: number,
  alias: string,
  typeName: string,
  backgroundKey: number,
  template: string,
  titleHidden: boolean,
}
 
interface Person {
  type: string,
  id: number,
  name: string,
  surname: string,
  title: string,
  origName?: string,
  origSurname?: string,
  picId: number,
  url: string
}
 
const popupIndex = ref<number>(0);
const sliderIndex = ref<number>(0);
const showPopup = ref<boolean>(false);
const Persons = ref<Array<Person>>([{ type: "person", id: 0, name: "-----", surname: "-----", title: "----- -----", picId: 0, url: "none" }])
 
const changeIndex = (checkedPerson: Person): void => {
  popupIndex.value = Persons.value.indexOf(checkedPerson)
  showPopup.value = true;
}
 
const plusSlide = (): void => {
  if (sliderIndex.value < Persons.value.length - 1) {
    sliderIndex.value++
  }
  else {
    sliderIndex.value = 0;
  }
}
 
onMounted(async () => {
  try {
    let res = await axios.get("https://cdnapi.smotrim.ru/api/v1/boxes/vesti2")
    Persons.value = res.data.data.content.find((item: ContetnItem) => item.title == "Персоны").content;
  }
  catch (err) {
    console.log(err);
  }
})
</script>
 
<template>
  <div class="slider">
    <div class="slider-persons">
      <div v-for="person in Persons" :key="person.id" @click="changeIndex(person)"
        :style="'transform: translate(-' + (160 * sliderIndex) + 'px);'" class="slider-person">
        <img :src="`https://api.smotrim.ru/api/v1/pictures/${person.picId}/bq/redirect`" :alt="person.title"
          class="slider-image">
        <div class="slider-person_name">
          <span class="slider-text text"> {{ person.name }}</span>
          <span class="slider-text text"> {{ person.surname }}</span>
        </div>
      </div>
      <img @click="plusSlide" src="src/assets/arrow.png" alt="button next" class="slider-button_next">
    </div>
  </div>
  <div v-show="showPopup" class="popup">
    <div @click="showPopup = false" class="popup-mask">
      <a :href="`${Persons[popupIndex].url}`" target="_blank" class="popup-container">
        <img src="src/assets/play button.png" alt="play button" class="popup-image_mask">
        <img :src="`https://api.smotrim.ru/api/v1/pictures/${Persons[popupIndex].picId}/bq/redirect`"
          :alt="Persons[popupIndex].title" class="popup-image">
        <div class="popup-info">
          <span class="popup-title">ВЕДУЩИЙ</span>
          <div class="popup-person">
            <span class="text">{{ Persons[popupIndex].name }}</span>
            <span class="text">{{ Persons[popupIndex].surname }}</span>
          </div>
          <span class="popup-text text">{{ Persons[popupIndex].title }} – российский журналист и общественный деятель,
            ведущий на телевидении и радио, автор документальных фильмов и книг, кандидат экономических наук. </span>
        </div>
      </a>
    </div>
  </div>
</template>
 
<style lang="scss" scoped>
@font-face {
  font-family: "RF Dewi";
  src: local("RF Dewi"),
    url(src/fonts/RFDewi.ttf) format("truetype");
}
 
@font-face {
  font-family: "RF Dewi Condensed";
  src: local("RF Dewi Condensed"),
    url(src/fonts/RFDewiCondensed.ttf) format("truetype");
}
 
.text {
  font-family: "RF Dewi";
}
 
.slider {
  background-color: #fff;
  height: 256px;
  max-width: 100vw;
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
 
  &-persons {
    margin: 24px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
 
  &-person {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 1s;
    width: 160px;
    height: 208px;
    padding: 0px 8px 0px 8px;
    &_name{
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
 
  &-image {
    width: 144px;
    height: 144px;
    border-radius: 100px;
  }
 
  &-text {
    color: #000;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 4px;
    font-weight: 700;
  }
 
  &-button_next {
    position: absolute;
    cursor: pointer;
    right: 8px;
    top: 80px;
    width: 48px;
    height: 48px;
    -webkit-filter: drop-shadow(0px 4px 20px 0px #0000000D);
    filter: drop-shadow(0px 4px 20px 0px #0000000D);
  }
}
 
.popup {
  &-mask {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
 
  &-container {
    position: relative;
    overflow: hidden;
    text-decoration: none;
    color: #000;
    background-color: #fff;
    box-shadow: 0px 16px 32px 0px #0000000D;
    width: 286px;
    height: 380px;
    border-radius: 16px;
  }
 
  &-image {
    object-fit: cover;
    width: 286px;
    height: 160px;
    border-radius: 8px;
 
    &_mask {
      position: absolute;
      border-radius: 0 8px 0 0;
      right: 0;
      width: 108px;
      height: 72px;
    }
  }
 
  &-info {
    display: flex;
    flex-direction: column;
    width: 254px;
    height: 193px;
    margin-left: 16px;
    margin-top: 17px;
  }
 
  &-title {
    font-family: "RF Dewi Condensed";
    color: #B8C2CC;
    width: 254px;
    font-size: 12px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 1px;
    margin-bottom: 2px;
  }
 
  &-person {
    display: flex;
    flex-direction: column;
    margin-bottom: 2px;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
  }
 
  &-text {
    font-size: 16px;
    line-height: 24px;
    -webkit-mask-image: linear-gradient(180deg, #000000 25%, rgba(0, 0, 0, 0) 53.57%);
  }
}</style>