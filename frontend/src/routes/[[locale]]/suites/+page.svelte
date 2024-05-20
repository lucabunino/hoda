<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import * as m from "$lib/paraglide/messages"
  import { languageTag, onSetLanguageTag } from "$lib/paraglide/runtime.js";

  import { urlFor } from '$lib/utils/image';
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';
  import { navigating, page } from '$app/stores';

  import { register } from 'swiper/element/bundle';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  
  register();

  $: innerWidth = 0
	$: innerHeight = 0
  $: margin = 16
  $: ready = false
  
  onMount(() => {
    const id = window.location.hash.replace(/^#/, '');
    const element = id && document.getElementById(id);
    if (id && element) {
      setTimeout(() => {
        element.scrollIntoView();
        const header = document.getElementById("header")
        setTimeout(() => {
          header?.classList.add("up")
        }, 200);
      }, 1100);
    }
	});

  afterNavigate(() => {
    setTimeout(() => {
      mountSlider();
      mountTh();
      ready = true;
    }, 1000);
	});

  function mountSlider() {
    const swiperElements = document.querySelectorAll('.swiperEl');
    let effect = ""
    if (innerWidth > 900) {
      effect = "fade"
    } else {
      effect = "slide"
    }
    const params = {
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
      effect: effect,
      spaceBetween: 8,
      slidesPerView:1.1,
      rewind:'false',
      loop:'true',
      simulateTouch:'true',
      breakpoints: {
        900: {
          autoplay: {
            delay: "6000",
          },
          slidesPerView:1,
          simulateTouch:'false',
          rewind:'false',
          loop:'false',
        }
      },
    };
    swiperElements.forEach((swiperEl, index) => {
      Object.assign(swiperEl, params);
      swiperEl.initialize();
    });
  }

  function mountTh() {
    const swiperThumbs = document.querySelectorAll('.swiperThumbs');
    swiperThumbs.forEach((swiperTh, index) => {
      swiperTh.initialize();
    });
  }

  let prevWidth = innerWidth;
  function handleResize() {
    console.log(prevWidth);
    if ((innerWidth > 900 && prevWidth <= 900) || (innerWidth <= 900 && prevWidth > 900)) {    
      location.replace(location.href);
    }
    prevWidth = innerWidth;
  }

  let lodgifyActive = ""
  let scrollLock = false;
  function book(i) {
    if (innerWidth > 900) {
      scrollLock = true
      lodgifyActive = i
    }
  }
  function unbook() {
    if (innerWidth > 900) {
      scrollLock = false
      lodgifyActive = false
    }
  }
  function bookMobile(i) {
    scrollLock = true
    lodgifyActive = i
  }
  function unbookMobile() {
    lodgifyActive = false
    scrollLock = false
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight on:resize={handleResize} on:wheel|nonpassive={e => {if(scrollLock)e.preventDefault()}}/>

{#if data.suitesPage[0].suitesIntro && ready}
  <section id="intro">
    <h3>{data.suitesPage[0].suitesIntro[languageTag()]}</h3>
  </section>
{/if}
{#each data.suites as suite, i (suite)}
{#if suite.language === languageTag()}
  <section id="{(suite.title.replace('’',''))}" class="suite" style={innerWidth > 900 ? `height: ${innerHeight - 34 - margin*2}px` : `height: auto`}>
      <div class="suite-images">
        <swiper-container
        init=false
        direction={'vertical'}
        class={`desktopOnly swiperThumbs swiperThumbs${i}`}
        slides-per-view=auto
        free-mode=true
        watch-slides-progress=true
        mousewheel=true
        space-between=3
        loop=false
        >
          {#each suite.slider as slide, i (slide)}
            <swiper-slide>
              <picture>
                <img
                src={urlFor(slide).url()}
                alt="{m.alt()} {suite.title}"
                />
              </picture>
            </swiper-slide>
          {/each}
        </swiper-container>
             
        <swiper-container
        init=false
        class={`swiperEl swiperEl${i}`}
        speed=500
        thumbs-swiper={`.swiperThumbs${i}`}
        slidesPerView=1
        navigation=true
        >
          {#each suite.slider as slide, i (slide)}
            <swiper-slide>
              <picture>
                <img
                src={urlFor(slide).url()}
                alt="{m.alt()} {suite.title}"
                />
              </picture>
            </swiper-slide>
          {/each}
        </swiper-container>
      </div>
      {#if ready}
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
          <button class="btn primary suite-book" on:click={(e) => book(i)} on:touchstart={(e) => bookMobile(i)}>{m.booknow()}</button>
          <p class="suite-book-details">{m.bookinfo()}</p>
        </div>
      </div>
      {#if lodgifyActive === i}
        <div id="lodgify-book-now-background" on:click={(e) => unbook(e)} on:touchend={() => unbookMobile(i)}></div>
        <div
        id="lodgify-book-now-box"
        class="lodgify-book-now-box lodgify-{i}"
        data-rental-id={suite.rentalId}
        data-website-id="507783"
        data-slug="sara-barbara"
        data-language-code={languageTag()}
        data-new-tab="true"
        data-check-in-label={m.checkin()}
        data-check-out-label={m.checkout()}
        data-guests-label={m.guests()}
        data-guests-singular-label="{'{'}{'{'}NumberOfGuests{'}'}{'}'} {m.guestssingular()}"
        data-guests-plural-label="{'{'}{'{'}NumberOfGuests{'}'}{'}'} {m.guestsplural()}"
        data-location-input-label={m.location()}
        data-total-price-label={m.totalprice()}
        data-select-dates-to-see-price-label={m.selectdatestoseeprice()}
        data-minimum-price-per-night-first-label={m.minimumpricepernightfirst()}
        data-minimum-price-per-night-second-label={m.minimumpricepernightsecond()}
        data-book-button-label={m.booknow()}
        data-version="1.18.2"
        ></div>
        <script src="https://app.lodgify.com/book-now-box/1.18.2/renderBookNowBox.js"></script>
      {/if}
      {/if}
  </section>
{/if}
{/each}
<section id="general-info">
  <div id="general-info-left" class:noRight={!data.suitesPage[0].suitesGeneralInfoRightTitle}>
    {#if data.suitesPage[0].suitesGeneralInfoLeftTitle}
      <h4 class="general-info-title" class:noRight={!data.suitesPage[0].suitesGeneralInfoRightTitle}>{data.suitesPage[0].suitesGeneralInfoLeftTitle[languageTag()]}</h4>
    {/if}
    {#if data.suitesPage[0].suitesGeneralInfoLeft}
      {#each data.suitesPage[0].suitesGeneralInfoLeft as suitesLeft, i (suitesLeft)}
        <div class="general-info-row">
          {#if suitesLeft.infoRowTitle}<h5 class="general-info-row-title">{suitesLeft.infoRowTitle[languageTag()]}</h5>{/if}
          {#if suitesLeft.infoRowText}<p class="general-info-row-content">{suitesLeft.infoRowText[languageTag()]}</p>{/if}
          {#if suitesLeft.infoRowSpecs}<p class="general-info-row-content">{suitesLeft.infoRowSpecs[languageTag()]}</p>{/if}
        </div>
      {/each}
    {/if}
  </div>
  <div id="general-info-right">
    {#if data.suitesPage[0].suitesGeneralInfoRightTitle}
      <h4 class="general-info-title">{data.suitesPage[0].suitesGeneralInfoRightTitle[languageTag()]}</h4>
    {/if}
    {#if data.suitesPage[0].suitesGeneralInfoRight}
      {#each data.suitesPage[0].suitesGeneralInfoRight as suitesRight, i (suitesRight)}
        <div class="general-info-row">
          {#if suitesRight.infoRowTitle}<h5 class="general-info-title">{suitesRight.infoRowTitle[languageTag()]}</h5>{/if}
          {#if suitesRight.infoRowText}<p class="general-info-row-title">{suitesRight.infoRowText[languageTag()]}</p>{/if}
          {#if suitesRight.infoRowSpecs}<p class="general-info-row-content">{suitesRight.infoRowSpecs[languageTag()]}</p>{/if}
        </div>
      {/each}
    {/if}
  </div>
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
  @media only screen and (max-width: 900px) {
    #intro {
      padding: calc(70px + var(--gutter)) var(--margin) calc(var(--margin)*2);
    }
    h3 {
      font-size: 18px;
      line-height: 24px;
      text-align: left;
    }
  }

  /* SUITES */
  h2 {
    font-size: 90px;
    line-height: 90px;
    letter-spacing: -0.04em;
    max-width: 800px;
  }
  .suite {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: var(--margin);
    margin-bottom: var(--sectionMargin);
    padding: var(--margin);
  }
  .suite:nth-of-type(odd),
  .suite:nth-of-type(odd)>.suite-images {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
  }
  .suite-images {
    display: -webkit-box;
    display: -ms-flexbox;
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
  :global(swiper-slide.swiper-slide-active) {
    opacity: 1 !important;
  }
  swiper-slide>picture>img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
       object-fit: cover;
    display: block;
  }
  swiper-container.swiperEl {
    width: calc(85% - var(--gutter)/4);
    height: 100%;
  }
  :global(swiper-slide.swiperEl>picture) {
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
    width: 50%;
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
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr var(--gutter) 1fr;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    -webkit-column-gap: var(--gutter);
       -moz-column-gap: var(--gutter);
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
  @media only screen and (max-width: 900px) {
    h2 {
      font-size: 56px;
      line-height: 60px;
      padding: 0;
    }
    .suite {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      gap: var(--margin);
      margin-bottom: var(--sectionMargin);
      padding: var(--margin) 0;
    }
    .suite:nth-of-type(odd),
    .suite:nth-of-type(odd)>.suite-images {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }
    .suite-images {
      width: auto;
      gap: unset;
    }
    swiper-container.swiperEl {
      width: 100%;
    }
    swiper-container::part(button-prev),
    swiper-container::part(button-next) {
      display: none;
    }
    swiper-container::part(wrapper) {
      padding: 0 var(--margin);
    }
    .suite-content {
      padding: 0 var(--margin);
      width: auto;
    }
    .suite-title {
      padding: 0;
    }
    .suite-description {
      font-size: 18px;
      line-height: 24px;
      max-width: unset;
    }
    .suite-info {
      max-width: unset;
    }
    .suite-book-container {
      position: relative;
      bottom: unset;
    }
    .suite-book {
      margin-top: calc(var(--margin)*2);
      display: block;
      text-align: center;
      font-size: 18px;
    }
    .suite-book-details {
      margin-top: var(--margin);
      font-size: 14px;
      line-height: 17px;
      max-width: unset;
    }
  }
  @media only screen and (min-width: 901px) {
    swiper-slide {
      width: 100% !important;
    }
  }

  /* GENERAL INFO */
  #general-info {
    display: -ms-grid;
    display: grid;
    gap: var(--gutter);
    -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: var(--sectionMargin);
  }
  #general-info-left {
    -ms-grid-column-span: 2;
    grid-column: span 2;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (1fr)[2];
    grid-template-columns: repeat(2, 1fr);
  }
  #general-info-left.noRight {
    -ms-grid-column-span: 3;
    grid-column: span 3;
    -ms-grid-columns: (1fr)[3];
    grid-template-columns: repeat(3, 1fr);
  }
  #general-info-right {
    -ms-grid-column-span: 1;
    grid-column: span 1;
  }
  .general-info-title {
    -ms-grid-column-span: 2;
    grid-column: span 2;
    font-size: 12px;
    line-height: 15px;
    text-transform: uppercase;
    border-top: solid 1px var(--lightGray);
    margin-bottom: var(--margin);
    padding-top: var(--gutter);
  }
  .general-info-title.noRight {
    -ms-grid-column-span: 3;
    grid-column: span 3;
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

  @media only screen and (max-width: 900px) {
    #general-info {
      -ms-grid-columns: (1fr)[2];
      grid-template-columns: repeat(2, 1fr);
    }
    #general-info-left {
      -ms-grid-column-span: 1;
      grid-column: span 1;
      -ms-grid-columns: (1fr)[1];
      grid-template-columns: repeat(1, 1fr);
    }
    #general-info-left.noRight {
      -ms-grid-columns: (1fr)[2];
      grid-template-columns: repeat(2, 1fr);
    }
    #general-info-right {
      -ms-grid-column-span: 1;
      grid-column: span 1;
    }
    .general-info-title {
      -ms-grid-column-span: 1;
      grid-column: span 1;
    }
    .general-info-title.noRight {
      -ms-grid-column-span: 2;
      grid-column: span 2;
    }
    .general-info-row {
      margin-bottom: calc(var(--margin)*4);
    }
    .general-info-row-title {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: var(--margin);
    }
    .general-info-row-content {
      font-size: 14px;
      line-height: 18px;
    }
  }
  @media only screen and (max-width: 700px) {
    #general-info {
      -ms-grid-columns: 1fr;
      grid-template-columns: repeat(1, 1fr);
      gap: calc(var(--margin)*3);
    }
    #general-info-right {
      gap: calc(var(--margin)*3);
      display: -ms-grid;
      display: grid;
    }
    .general-info-row-title,
    .general-info-row-content {
      width: 100%;
    }
    #general-info-left.noRight {
      -ms-grid-columns: (1fr)[1];
      grid-template-columns: repeat(1, 1fr);
    }
    .general-info-title.noRight {
      -ms-grid-column-span: 1;
      grid-column: span 1;
    }
  }
</style>