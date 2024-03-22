<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  console.log(data);
  

  import {urlFor} from '$lib/utils/image';
  import { onMount } from 'svelte';

  import { register } from 'swiper/element/bundle';
  register();

  $: innerWidth = 0
	$: innerHeight = 0
  $: margin = 16
  $: gutter = 8

  let ready = false;
  onMount(() => {
    const swiperElements = document.querySelectorAll('.swiperEl');
    const params = {
      autoplay: {
        delay: "6000",
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
        `,
      ],
    };
    ready = true

    swiperElements.forEach((swiperEl, index) => {
      Object.assign(swiperEl, params);
      swiperEl.initialize();
    });

    const swiperThumbs = document.querySelectorAll('.swiperThumbs');
    swiperThumbs.forEach((swiperTh, index) => {
      swiperTh.initialize();
    });
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight/>
{#if data.suitesPage[0].suitesIntro}
  <section id="intro">
    <h3>{data.suitesPage[0].suitesIntro.en}</h3>
  </section>
{/if}
{#if data.suites}
  {#each data.suites as suite, i (suite)}
  <section id="{suite.title}" class="suite" class:transparent={ready != true} style={`height: ${innerHeight - 34 - margin*2}px`}>
      <div class="suite-images">
        <swiper-container
        init=false
        direction={'vertical'}
        class={`swiperThumbs swiperThumbs${i}`}
        slides-per-view="auto"
        free-mode=true
        watch-slides-progress="true"
        mousewheel="true"
        space-between="3"
        loop=false
        >
          {#each suite.slider as slide, i (slide)}
            <swiper-slide>
              <picture>
                <img
                src={urlFor(slide).url()}
                alt="Interiors of {suite.title}"
                />
              </picture>
            </swiper-slide>
          {/each}
        </swiper-container>
        
        <swiper-container
        init=false
        class={`swiperEl swiperEl${i}`}
        speed=500
        loop=false
        thumbs-swiper={`.swiperThumbs${i}`}
        effect='fade'
        slidesPerView=1
        navigation={true}
        >
          {#each suite.slider as slide, i (slide)}
            <swiper-slide>
              <picture>
                <img
                src={urlFor(slide).url()}
                alt="Interiors of {suite.title}"
                />
              </picture>
            </swiper-slide>
          {/each}
        </swiper-container>
      </div>
      <div class="suite-content">
        <h2 class="suite-title arizona xl">{suite.title}</h2>
        {#if suite.description}
          <p class="suite-description">{suite.description}</p>
        {/if}
        {#if suite.info}
          <ul class="suite-info">
          {#each suite.info as info, i (info)}
            <li>{info}</li>
          {/each}
          </ul>
        {/if}
        <div class="suite-book-container">
          <a class="btn primary suite-book" href="{suite.reservationURL}">Book now</a>
          <p class="suite-book-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
  </section>
  {/each}
{/if}
<section id="general-info">
  <div id="general-info-left">
    {#if data.suitesPage[0].suitesGeneralInfoLeftTitle}
      <h4 class="general-info-title">{data.suitesPage[0].suitesGeneralInfoLeftTitle.en}</h4>
    {/if}
    {#if data.suitesPage[0].suitesGeneralInfoLeft}
      {#each data.suitesPage[0].suitesGeneralInfoLeft as suitesLeft, i (suitesLeft)}
        <div class="general-info-row">
          {#if suitesLeft.infoRowTitle}<h5 class="general-info-row-title">{suitesLeft.infoRowTitle.en}</h5>{/if}
          {#if suitesLeft.infoRowText}<p class="general-info-row-content">{suitesLeft.infoRowText.en}</p>{/if}
          {#if suitesLeft.infoRowSpecs}<p class="general-info-row-content">{suitesLeft.infoRowSpecs.en}</p>{/if}
        </div>
      {/each}
    {/if}
  </div>
  <div id="general-info-right">
    {#if data.suitesPage[0].suitesGeneralInfoRightTitle}
      <h4 class="general-info-title">{data.suitesPage[0].suitesGeneralInfoRightTitle.en}</h4>
    {/if}
    {#if data.suitesPage[0].suitesGeneralInfoRight}
      {#each data.suitesPage[0].suitesGeneralInfoRight as suitesRight, i (suitesRight)}
        <div class="general-info-row">
          {#if suitesRight.infoRowTitle}<h5 class="general-info-title">{suitesRight.infoRowTitle.en}</h5>{/if}
          {#if suitesRight.infoRowText}<p class="general-info-row-title">{suitesRight.infoRowText.en}</p>{/if}
          {#if suitesRight.infoRowSpecs}<p class="general-info-row-content">{suitesRight.infoRowSpecs.en}</p>{/if}
        </div>
      {/each}
    {/if}
  </div>
</section>
<section style="padding: 100px;">
  <h3 style="margin-bottom: 30px;">Custom booking example, <br>after click on "Book now"</h3>
  <div
    id="lodgify-book-now-box"
    data-rental-id="550300"
    data-website-id="500098"
    data-slug="luca-bunino"
    data-language-code="it"
    data-new-tab="true"
    data-check-in-label="Arrivo"
    data-check-out-label="Partenza"
    data-guests-label="Ospiti"
    data-guests-singular-label="&#123;&#123;NumberOfGuests&#125;&#125; ospite"
    data-guests-plural-label="&#123;&#123;NumberOfGuests&#125;&#125; ospiti"
    data-location-input-label="Località"
    data-total-price-label="Prezzo totale:"
    data-select-dates-to-see-price-label="Selezionare le date per vedere il prezzo totale"
    data-minimum-price-per-night-first-label="Da"
    data-minimum-price-per-night-second-label="a notte"
    data-book-button-label="Prenota adesso"
    
    data-version="stable"
    >
  </div>
  <script src="https://app.lodgify.com/book-now-box/stable/renderBookNowBox.js"></script>
</section>

<style>
  section {
    display: block;
    padding: 0 var(--margin);
  }

  /* INTRO */
  #intro {
    padding: 170px var(--margin) var(--sectionMargin);
  }
  h3 {
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    margin: auto;
    max-width: 800px;
  }

  /* SUITES */
  h2 {
    font-size: 90px;
    line-height: 90px;
    letter-spacing: -0.04em;
    padding: var(--margin) 0;
    max-width: 800px;
  }
  .suite {
    display: flex;
    gap: var(--margin);
    margin-bottom: var(--sectionMargin);
    padding: var(--margin);
  }
  .suite:nth-of-type(odd),
  .suite:nth-of-type(odd)>.suite-images {
    flex-direction: row-reverse;
  }
  .suite-images {
    display: flex;
    width: calc(50% - var(--gutter));
    gap: calc(var(--gutter)/2);
  }
  swiper-slide {
    border-radius: var(--gutter);
    overflow: hidden;
    width: 100%;
    height: auto;
  }
  swiper-container.swiperThumbs {
    width: calc(15% - var(--gutter)/4);
    height: auto;
  }
  .swiper-slide-thumb-active {
    opacity: .5;
  }
  swiper-container.swiperThumbs>swiper-slide>picture {
    width: 100%;
    height: auto;
    display: block;
    cursor: pointer;
  }
  swiper-slide>picture>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  swiper-container.swiperEl {
    width: calc(85% - var(--gutter)/4);
    height: 100%;
  }
  swiper-slide.swiperEl>picture {
    width: 100%;
    height: 100%;
    display: block;
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
  .suite-content {
    position: relative;
    width: 100%;
  }
  .suite-title {
    padding: var(--margin) 0;
  }
  .suite-description {
    font-size: 22px;
    line-height: 26px;
    padding: var(--margin) 0 calc(var(--margin)*2);
    max-width: 515px;
  }
  .suite-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    column-gap: var(--gutter);
    margin: 0;
    max-width: 515px;
  }
  .suite-info>li {
    list-style: none;
    padding: calc(var(--gutter)/2) 0;
    border-top: 1px solid var(--lightGray);
    border-bottom: 1px solid var(--lightGray);
    margin-top: -1px;
  }
  .suite-book-container {
    position: absolute;
    bottom: calc(var(--margin)*2);
  }
  .suite-book {

  }
  .suite-book-details {
    margin-top: calc(var(--margin)*1.5);
    max-width: 360px;
    font-size: 12px;
    line-height: 15px;
    color: var(--darkGray);
  }

  /* GENERAL INFO */
  #general-info {
    display: grid;
    gap: var(--gutter);
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: var(--sectionMargin);
  }
  #general-info-left {
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  #general-info-right {
    grid-column: span 1;
  }
  .general-info-title {
    grid-column: span 2;
    font-size: 12px;
    line-height: 15px;
    text-transform: uppercase;
    border-top: solid 1px var(--lightGray);
    margin-bottom: var(--margin);
    padding-top: var(--gutter);
  }
  .general-info-row {
    margin-bottom: calc(var(--margin)*3);
  }
  .general-info-row-title,
  .general-info-row-content {
    width: 90%;
  }
  .general-info-row-title {
    white-space: pre-line;
    font-size: 22px;
    line-height: 26px;
    margin-bottom: var(--margin);
  }
  .general-info-row-content {
    white-space: pre-line;
    font-size: 15px;
    line-height: 18px;
  }
</style>