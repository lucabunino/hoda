<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  console.log(data);

  import {urlFor} from '$lib/utils/image';
  import { onMount } from 'svelte';
  import {PortableText} from '@portabletext/svelte'
  import PortableTextStyle from '../components/portableTextStyle.svelte';
  import { fade, slide, fly } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';

  import { register } from 'swiper/element/bundle';
  register();

  $: scrollX = 0
  $: innerWidth = 0
	$: innerHeight = 0
  $: margin = 16
  $: gutter = 8
  $: cleoPopupVisible = false
  function cleoPopup() {
    cleoPopupVisible = !cleoPopupVisible
  }

  let ready = false;
  onMount(() => {
    ready = true
    const swiperElements = document.querySelectorAll('.swiperEl');
    const params = {
      autoplay: {
        delay: "2000",
      },
      on: {
        tap() {
          this.autoplay.stop();
        }
      },
      injectStyles: [
        `
        .swiper-button-next>svg,
        .swiper-button-prev>svg {
          display:none;
        }
        .swiper-pagination-bullet {
          background: var(--white);
          width: 100%;
          height: 4px;
          border-radius: 4px;
          opacity: .4;
          margin: 0 2px;
          position: relative;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: transparent;
          border-radius: 4px;
        }
        .swiper-pagination-bullet-active::before {
          border-radius: 4px;
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: .4;
          background-color: var(--white);
        }
        .swiper-pagination-bullet-active::after {
          border-radius: 4px;
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          width: 0;
          opacity: 1;
          background-color: var(--white);
          animation: bulletAnimation 2500ms forwards;
        }
        @keyframes bulletAnimation {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        `,
      ],
    };
    
    swiperElements.forEach((swiperEl, index) => {
      Object.assign(swiperEl, params);
      swiperEl.initialize();
      swiperEl.swiper.autoplay.stop()
      swiperEl.addEventListener("mouseover", (e) => {
        swiperEl.swiper.autoplay.start();
      });
      swiperEl.addEventListener("mouseout", () => {
        swiperEl.swiper.autoplay.stop();
      });
    });
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollX/>

{#if data.homepage[0].homepageHeroDesktop}
  <section id="hero">
    <picture class="desktopOnly">
      <img
      src={urlFor(data.homepage[0].homepageHeroDesktop).url()}
      alt="Interiors of HOD’A"
      />
    </picture>
    {#if data.homepage[0].homepageHeroMobile}
      <picture class="mobileOnly">
        <img
        src={urlFor(data.homepage[0].homepageHeroMobile).url()}
        alt="Interiors of HOD’A"
        />
      </picture>
    {/if}
  </section>
{/if}
{#if data.homepage[0].homepageIntro}
  <section id="intro">
    <PortableText
    value={data.homepage[0].homepageIntro.en}
    components={{
      block: {
        normal: PortableTextStyle,
        h2: PortableTextStyle,
        h3: PortableTextStyle,
        h4: PortableTextStyle,
        h5: PortableTextStyle,
      },
      marks: {
        link: PortableTextStyle,
      },
    }}
    />
  </section>
{/if}
{#if data.suites}
  <section id="suites">
    <h3>Stay with us</h3>
    <div>
      {#each data.suites as suite, i (suite)}
        <!-- <div style={innerWidth > 900 ? `width: ${Math.round((innerWidth - margin * 2 - gutter * 2) / 3)}px` : `width: ${Math.round((innerWidth - margin * 2 - gutter) / 2)}px`}> -->
        <div>
          <swiper-container
              init="false"
              class={`swiperEl swiperEl${i}`}
              speed=500
              rewind={true}
              effect='fade'
              slidesPerView=1
              navigation={true}
              pagination={{
                clickable: true
              }}
          >
          <!-- autoplay={{
            delay: 6000
          }} -->
            {#each suite.slider as slide, i (slide)}
              <swiper-slide :key={i}>
                <picture>
                  <img
                  src={urlFor(slide).url()}
                  alt="Interiors of {suite.title}"
                  />
                </picture>
              </swiper-slide>
            {/each}
          </swiper-container>
          <h2 class="suite-title arizona l">{suite.title}</h2>
          {#if suite.info}
            <ul class="suite-info">
            {#each suite.info as info, i (info)}
              <li>{info}</li> 
            {/each}
            </ul>
          {/if}
          <a class="btn" href="{suite.reservationURL}">Book now</a>         
          <a class="suite-more" href="/suites#{suite.title}">More info</a>
        </div>
      {/each}
    </div>
  </section>
{/if}
{#if data.homepage[0].homepageCleo}
  <section id="cleo">
    <div id="cleo-spline" class:cleoPopup={cleoPopupVisible}>
      <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.68/build/spline-viewer.js"></script>
      <spline-viewer url="https://prod.spline.design/UEEj4bhUtCEMpMjB/scene.splinecode"></spline-viewer>
      <div id="logo-cover"></div>
    </div>
    <div id="cleo-logo" class:cleoPopup={cleoPopupVisible}>{@html data.homepage[0].homepageLogoCleo}</div>
    <p id="cleo-payoff" class:cleoPopup={cleoPopupVisible}>Make a wish</p>
    <p id="cleo-content" class:cleoPopup={cleoPopupVisible}>{data.homepage[0].homepageCleo.en}</p>
    <button id="cleo-btn" class="btn" class:cleoPopup={cleoPopupVisible} on:click={cleoPopup}>Ask anything</button>
    {#if cleoPopupVisible}
      <div id="cleo-popup" in:fade={{duration: 1000, delay: 200, easing: quartInOut}} out:fade={{duration: 1000, delay: 0, easing: quartInOut}}>
        <form action="">
          <button class="cleo-form">Regular user</button>
        </form>
        <form action="">
          <button class="cleo-form">HOD’A guest</button>
        </form>
      </div>
    {/if}
  </section>
{/if}
<section id="shop" class="hidden">
  <div>SHOP</div>
</section>

<style>
  :root {
    --cleoPopupTranslate: calc(-50% - 200px)
  }
  section {
    position: relative;
  }
  h3 {
    font-size: 30px;
    line-height: 36px;
    max-width: 800px;
  }
  h4 {
    font-size: 30px;
    line-height: 36px;
    max-width: 800px;
  }
  #hero {
    height: 100vh;
    background-color: var(--lightGray);
  }
  #hero>picture {
    display: block;
    width: 100%;
    height: 100vh;
  }
  #hero>picture>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #intro {
    padding: var(--gutter) var(--margin);
  }
  #suites {
    padding-top: 115px;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  #suites::-webkit-scrollbar {
    display: none;
  } 
  #suites>h3 {
    padding: 0 var(--margin);
  }
  #suites>div {
    padding: var(--margin);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--gutter);
    row-gap: var(--margin);
  }
  #suites>div>div {
    width: calc((100vw - var(--margin)*2 - var(--gutter)*2)/3);
    grid-column: span 1;
  }
  swiper-container {
    height: auto;
    width: 100%;
    border-radius: var(--gutter);
    overflow: hidden;
  }
  swiper-slide {
    width: 100%;
  }
  swiper-slide>picture {
    aspect-ratio: 2/3;
    display: block;
  }
  swiper-slide>picture>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  swiper-container::part(pagination) {
    top: var(--margin);
    bottom: unset;
    display: flex;
    padding: 0 var(--margin);
    width: calc(100% - var(--margin)*2);
  }
  swiper-container::part(button-prev),
  swiper-container::part(button-next) {
    opacity: 0;
    top: 0;
    margin: 0;
    width: 50%;
    height: 100%;
  }
  swiper-container::part(button-prev) {
    left: 0;
    cursor: w-resize;
  }
  swiper-container::part(button-next) {
    right: 0;
    cursor: e-resize;
  }
  .suite-title {
    margin: var(--gutter) 0 var(--margin);
  }
  .suite-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 0 calc(var(--margin)*2);
    column-gap: var(--gutter);
    margin: 0;
  }
  .suite-info>li {
    list-style: none;
    padding: calc(var(--gutter)/2) 0;
    border-top: 1px solid var(--lightGray);
    border-bottom: 1px solid var(--lightGray);
    margin-top: -1px;
  }
  .suite-more {
    text-decoration: underline;
    margin-left: var(--margin);
  }
  .suite-more:hover {
    color: var(--darkGray);
  }

  /* CLEO */
  #cleo {
    align-content: center;
    justify-content: center;
    text-align: center;
    height: auto;
  }
  #cleo-logo {
    width: 10vw;
    margin: auto;
    padding: 20vh 0 var(--margin);
    transition: var(--transition);
  }
  #cleo-logo.cleoPopup {
    transform: translateY(-80px);
  }
  #cleo-payoff {
    width: auto;
    margin: auto;
    padding: 0 0 40vh;
    transition: var(--transition);
  }
  #cleo-payoff.cleoPopup {
    transform: translateY(-80px);
    opacity: 0;
  }
  #cleo-content {
    max-width: 400px;
    margin: auto;
    padding: 0 0 var(--margin);
    position: relative;
    z-index: 1;
  }
  #cleo-btn {
    margin: 0 auto 20vh;
    z-index: 2;
    position: relative;
  }
  #cleo-spline {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: var(--transition);
    z-index: 1;
    display: block;
  }
  #cleo-spline.cleoPopup {
    transform: translateX(-50%) translateY(var(--cleoPopupTranslate)) scale(.3);
  }
  #cleo-spline>#logo-cover {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    background-color: var(--white);
    z-index: 2;
  }
  #cleo-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 3;
    display: flex;
    width: auto;
    height: auto;
    margin: auto;
  }
  @media only screen and (max-width: 1200px) {
    #suites>div {
      grid-template-columns: repeat(3, 1fr);
      overflow-x: scroll;
    }
    #suites>div>div {
      width: calc((100vw - var(--margin)*2 - var(--gutter)*2)/2.2);
    }
  }
  @media only screen and (max-width: 900px) {
    #suites>div>div {
      width: calc((100vw - var(--margin)*2 - var(--gutter)*2)/1.6);
    }
  }
  @media only screen and (max-width: 600px) {
    #suites>div {
      grid-template-columns: repeat(1, 1fr);
    }
    #suites>div>h3 {
      grid-column: span 1;
    }
    #suites>div>div {
      width: calc((100vw - var(--margin)*2));
      margin-bottom: var(--sectionMargin);
    }
  }
</style>