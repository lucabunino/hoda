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
  import { browser } from '$app/environment';

  export let form;
  console.log(form);
  $: userKind = "unset";
  $: bg = "unset";
  
  import { enhance } from '$app/forms';  

  import { register } from 'swiper/element/bundle';
  register();

  $: lang = "en"

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

  let lodgifyActive = ""
  let scrollTop = null;
  let scrollLeft = null;
  function book(i) {
    console.log("book " + i);
    disableScroll()
    lodgifyActive = i
  }
  function unbook(i) {
    console.log("unbook " + i);
    lodgifyActive = false
    enableScroll()
  }
  function disableScroll() {
    if (browser) {
      scrollTop = 
        window.pageYOffset || window.document.documentElement.scrollTop;
      scrollLeft = 
        window.pageXOffset || window.document.documentElement.scrollLeft,
        window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
      }};
    }
  function enableScroll() {
    if (browser) {
      window.onscroll = function() {};
    }
  };
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
          <button class="btn" on:click={() => book(i)}>Book now</button>     
          <a class="suite-more" href="/suites#{suite.title}">More info</a>
        </div>
        {#if lodgifyActive === i}
          <div id="lodgify-book-now-background" on:click={() => unbook(i)}></div>
          <div
          id="lodgify-book-now-box"
          class="lodgify-book-now-box lodgify-{i}"
          data-rental-id={suite.rentalId}
          data-website-id="507783"
          data-slug="sara-barbara"
          data-language-code="en"
          data-new-tab="true"
          data-check-in-label="Arrival"
          data-check-out-label="Departure"
          data-guests-label="Guests"
          data-guests-singular-label="{'{'}{'{'}NumberOfGuests{'}'}{'}'} ospite"
          data-guests-plural-label="{'{'}{'{'}NumberOfGuests{'}'}{'}'} ospiti"
          data-location-input-label="Location"
          data-total-price-label="Total price:"
          data-select-dates-to-see-price-label="Select dates to see total price"
          data-minimum-price-per-night-first-label="From"
          data-minimum-price-per-night-second-label="per night"
          data-book-button-label="Book Now"
          data-version="stable"
          ></div>
          <script src="https://app.lodgify.com/book-now-box/stable/renderBookNowBox.js"></script>
        {/if}
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
    <button id="cleo-btn" class="btn blue-azure" class:cleoPopup={cleoPopupVisible} on:click={cleoPopup}>Ask anything</button>
    {#if cleoPopupVisible}
      <div id="cleo-popup" in:fade={{duration: 1000, delay: 200, easing: quartInOut}} out:fade={{duration: 1000, delay: 0, easing: quartInOut}}>
        <form
        id="cleo-form"
        action="?/create"
        method="POST"
        use:enhance
        >
          {#if userKind === "unset"}
            <button type="button" class="btn cleo dropShadow azure" id="hoda" name="hoda" on:click={() => userKind="hoda"}>HOD’A guest</button>
            <button type="button" class="btn cleo dropShadow blue" id="regular" name="regular" on:click={() => userKind="regular"}>Regular user</button>
          {/if}
          {#if userKind === "hoda"}
            <div class="formBackground dropShadow azure">
              <p>Nice to meet you again</p>
              <input type="text" id="fname" name="fname" value={form?.fname ?? ''} placeholder={lang == "en" ? `First name (required)` : 'Nome (obbligatorio)'} required>
              <input type="text" id="lname" name="lname" value={form?.lname ?? ''} placeholder={lang == "en" ? `Last name (required)` : 'Cognome (obbligatorio)'} required>
              <select id="suite" name="suite" form="cleo-form" required>
                <option value="HOM">HO’M</option>
                <option value="HOL">HO’L</option>
                <option value="HOC">HO’C</option>
              </select>
              <button type="button" class="btn cleo dropShadow confirm" id="confirm" name="confirm" on:click={() => userKind="selected"}>Confirm</button>
            </div>
          {:else if userKind === "regular"}
            <div class="formBackground dropShadow blue">
              <!-- ADDD BG -->
              <p>Fill in your contacts</p>
              <input type="text" id="fname" name="fname" value={form?.fname ?? ''} placeholder={lang == "en" ? `First name (required)` : 'Nome (obbligatorio)'} required>
              <input type="text" id="lname" name="lname" value={form?.lname ?? ''} placeholder={lang == "en" ? `Last name (required)` : 'Cognome (obbligatorio)'} required>
              <input type="email" id="email" name="email" value={form?.email ?? ''} placeholder={lang == "en" ? `E-mail (required)` : 'E-mail (obbligatorio)'} required>
              <input type="phone" id="phone" name="phone" value={form?.phone ?? ''} placeholder={lang == "en" ? `Phone number (required)` : 'Numero di telefono (obbligatorio)'} required>
              <input type="company" id="company" name="company" value={form?.company ?? ''} placeholder={lang == "en" ? `Company name (required)` : 'Nome azienda (obbligatorio)'} required>
              <button type="button" class="btn cleo dropShadow confirm" id="confirm" name="confirm" on:click={() => userKind="selected"}>Confirm</button>
            </div>
          {:else if userKind === "selected"}
            <div class="formBackground dropShadow {bg}">
              <p>Fill in your contacts</p>
              <input type="text" id="fname" name="fname" value={form?.fname ?? ''} placeholder={lang == "en" ? `First name (required)` : 'Nome (obbligatorio)'} required>
              <input type="text" id="lname" name="lname" value={form?.lname ?? ''} placeholder={lang == "en" ? `Last name (required)` : 'Cognome (obbligatorio)'} required>
              <input type="email" id="email" name="email" value={form?.email ?? ''} placeholder={lang == "en" ? `E-mail (required)` : 'E-mail (obbligatorio)'} required>
              <input type="phone" id="phone" name="phone" value={form?.phone ?? ''} placeholder={lang == "en" ? `Phone number (required)` : 'Numero di telefono (obbligatorio)'} required>
              <input type="company" id="company" name="company" value={form?.company ?? ''} placeholder={lang == "en" ? `Company name (required)` : 'Nome azienda (obbligatorio)'} required>
              <button type="button" class="btn cleo dropShadow confirm" id="confirm" name="confirm" on:click={() => userKind="selected"}>Confirm</button>
            </div>
          {/if}
          <button id="submit" type="submit" class="btn">Submit</button>
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
    transition: var(--transition);
  }
  #cleo-content.cleoPopup {
    opacity: 0;
  }
  #cleo-btn {
    margin: 0 auto 20vh;
    z-index: 2;
    position: relative;
  }
  .blue-azure {
    background: linear-gradient(0.25turn, #91B0B6, #FFF, #D8FFF4);
  }
  .blue-azure:hover {
    color: #444;
  }
  .blue {
    background: linear-gradient(0.25turn, #91B0B6, #FFF);
  }
  .azure {
    background: linear-gradient(0.25turn, #D8FFF4, #FFF);
  }
  .cleo {
    padding: 12px 30px 17px;
    border-radius: 5px;
    font-size: 22px;
    line-height: 26px;
  }
  .cleo:hover {
    color: #444;
  }
  .dropShadow {
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05));
  }
  .confirm {
    background-color: #FFF;
    border-radius: 99px;
    height: 33px;
    padding: 0px 30px 4px;
    width: fit-content;
    margin: auto;
    margin-top: 1.3em;
    margin-bottom: .5em;
  }
  .formBackground {
    display: block;
    padding: var(--margin);
    min-height: 40vh;
    width: 40vw;
    display: flex;
    flex-direction: column;
    row-gap: var(--gutter);
    border-radius: 5px;
  }
  .formBackground>input {
    color: #A0A0A0;
    padding: 0px 10px 4px;
    display: block;
    font-size: 22px;
    line-height: 26px;
    height: 33px;
    border-radius: 5px;
    border: none;
    width: -webkit-fill-available;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05));
  }
  .formBackground>p {
    font-size: 22px;
    line-height: 26px;
    margin-top: .5em;
    margin-bottom: 1.3em;
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