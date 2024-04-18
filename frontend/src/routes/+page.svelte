<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  let svgLogoCleo = data.homepage[0].homepageLogoCleo.replace('<svg', '<svg overflow="visible"');

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
  $: valueFNameHoda = "";
  $: valueFNameRegular = "";
  $: valueLName = "";
  $: valueEmail = "";
  $: valuePhone = "";
  $: valueRequest = "";
  $: valuePickup = "";
  $: valueDestination = "";
  $: valueDatetime = "";
  $: valuePassengers = "";
  $: valueRestaurant = "";
  $: valueGuests = "";
  $: valueItems = "";
  
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
          animation: bulletAnimation 1000ms forwards;
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

<svelte:window bind:innerWidth bind:innerHeight bind:scrollX on:wheel|nonpassive={e => {if(scrollLock)e.preventDefault()}}/>

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
          {#if suite.infoHomepage}
            <ul class="suite-info">
            {#each suite.infoHomepage as info, i (info)}
              <li>{info}</li>
            {/each}
            </ul>
          {/if}
          <button class="btn" on:click={() => book(i)} on:touchstart={() => bookMobile(i)}>Book now</button>     
          <a data-sveltekit-noscroll class="suite-more" href="/suites/#{(suite.title.replace('’',''))}">More info</a>
        </div>
        {#if lodgifyActive === i}
          <div id="lodgify-book-now-background" on:click={() => unbook()} on:touchend={() => unbookMobile()}></div>
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
          data-guests-singular-label={`{{NumberOfGuests}} guest`}
          data-guests-plural-label={`{{NumberOfGuests}} guests`}
          data-location-input-label="Location"
          data-total-price-label="Total price:"
          data-select-dates-to-see-price-label="Select dates to see total price"
          data-minimum-price-per-night-first-label="From"
          data-minimum-price-per-night-second-label="per night"
          data-book-button-label="Book Now"
          data-version="1.18.2"
          ></div>
          <script src="https://app.lodgify.com/book-now-box/1.18.2/renderBookNowBox.js"></script>
        {/if}
      {/each}
    </div>
  </section>
{/if}
{#if data.homepage[0].homepageCleo}
  <section id="cleo">
    <div id="cleo-spline" class:cleoPopup={cleoPopupVisible}>
      <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.93/build/spline-viewer.js"></script>
      <spline-viewer class="desktopOnly" url="https://prod.spline.design/UEEj4bhUtCEMpMjB/scene.splinecode"></spline-viewer>
      <spline-viewer class="mobileOnly" url="https://prod.spline.design/ImmL4rt5FrQ2k-I9/scene.splinecode"></spline-viewer>
      <div id="logo-cover"></div>
    </div>
    <div id="cleo-logo" class:cleoPopup={cleoPopupVisible}>
      {@html svgLogoCleo}
    </div>
    <p id="cleo-payoff" class:cleoPopup={cleoPopupVisible}>Make a wish</p>
    <p id="cleo-content" class:cleoPopup={cleoPopupVisible}>{data.homepage[0].homepageCleo.en}</p>
    {#if !cleoPopupVisible}
      <button id="cleo-btn" class="btn blue-azure" class:cleoPopup={cleoPopupVisible} on:click={() => cleoPopupVisible = !cleoPopupVisible}>Ask anything</button>
    {:else}
      <button id="cleo-btn" class="btn back" on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Back</button>
    {/if}
    {#if cleoPopupVisible}
      <div id="cleo-popup" in:fade={{duration: 1000, delay: 200, easing: quartInOut}} out:fade={{duration: 1000, delay: 0, easing: quartInOut}}>
        <form
        id="cleo-form"
        style="width: -webkit-fill-available;"
        action="?/create"
        method="POST"
        use:enhance
        >
          <div class="form-step" class:active={userKind === "unset"}>
            <button type="button" class="btn cleo shadow azure" id="hoda" name="hoda" on:click={() => userKind="hoda"}>HOD’A guest</button>
            <button type="button" class="btn cleo shadow blue" id="regular" name="regular" on:click={() => userKind="regular"}>Regular user</button>
          </div>
          <div class="form-step" class:active={userKind === "hoda"}>
            <div class="formBackground shadow azure">
              <p>Nice to meet you again</p>
              <input bind:value={valueFNameHoda} type="text" id="fnameHoda" name="fnameHoda" placeholder={lang == "en" ? `First name (required)` : 'Nome (obbligatorio)'}>
              <input bind:value={valueLName} type="text" id="lname" name="lname" placeholder={lang == "en" ? `Last name (required)` : 'Cognome (obbligatorio)'}>
              <div style="display: flex;    align-items: baseline;">
                <p style="margin-left: 2px; margin-right: var(--margin);">I'm in suite: </p>
                <select id="suite" name="suite" form="cleo-form" class="btn dropShadow">
                  <option value="HOM">HO’M</option>
                  <option value="HOL">HO’L</option>
                  <option value="HOC">HO’C</option>
                </select>
              </div>
              <button type="button" class="btn dropShadow next" id="next" name="next"
              class:locked={valueFNameHoda === "" || valueLName === ""}
              on:click={() => {userKind="selectedHoda"; bg="azure"}}>Next</button>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "regular"}>
            <div class="formBackground shadow blue">
              <p>Fill in your contacts</p>
              <input type="text" bind:value={valueFNameRegular} id="fnameRegular" name="fnameRegular" placeholder={lang == "en" ? `First name (required)` : 'Nome (obbligatorio)'}>
              <input type="text" bind:value={valueLName} id="lname" name="lname" placeholder={lang == "en" ? `Last name (required)` : 'Cognome (obbligatorio)'}>
              <input type="text" bind:value={valueEmail} id="email" name="email" placeholder={lang == "en" ? `E-mail (required)` : 'E-mail (obbligatorio)'} >
              <input type="text" bind:value={valuePhone} id="phone" name="phone" placeholder={lang == "en" ? `Phone number (required)` : 'Numero di telefono (obbligatorio)'}>
              <input type="text" id="company" name="company" placeholder={lang == "en" ? `Company name` : 'Nome azienda'}>
              <button type="button" class="btn dropShadow next" id="next" name="next"
              class:locked={valueFNameRegular === "" || valueLName === "" || valueEmail === "" || valuePhone === ""}
              on:click={() => {userKind="selectedRegular"; bg="blue"}}>Next</button>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "selectedHoda"}>
            <div class="formBackground shadow {bg}">
              <p>Write your request</p>
              <textarea bind:value={valueRequest} class="" rows="4" id="message" name="message" placeholder={lang == "en" ? `I'd like to...` : 'Vorrei...'}></textarea>
              <button id="submit" type="submit" class="btn submit dropShadow"  class:locked={valueRequest === ""} on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Submit</button>
              <p style="margin-top: .5em; margin-bottom: .5em;">Or choose from suggested services</p>
              <div style="display: flex; flex-wrap: wrap; gap: var(--gutter); justify-content:center; margin-bottom: 1em;">
                <button type="button" class="btn dropShadow {bg}Inverse option" id="car" name="car" on:click={() => userKind="car"}>I need a car</button>
                <button type="button" class="btn dropShadow {bg}Inverse option" id="table" name="table" on:click={() => userKind="table"}>Book a table</button>
                <button type="button" class="btn dropShadow {bg}Inverse option" id="laundry" name="laundry" on:click={() => userKind="laundry"}>Laundry service</button>
                <button type="button" class="btn dropShadow {bg}Inverse option" id="food" name="food" on:click={() => userKind="food"}>Food delivery</button>
                <button type="button" class="btn dropShadow {bg}Inverse option" id="tour" name="tour" on:click={() => userKind="tour"}>Private tour</button>
                <button type="button" class="btn dropShadow {bg}Inverse option" id="spa" name="spa" on:click={() => userKind="spa"}>SPA Treatments</button>
              </div>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "selectedRegular"}>
            <div class="formBackground shadow {bg}">
              <p>Write your request</p>
              <textarea bind:value={valueRequest} class="dropShadow" rows="8" id="message" name="message" placeholder={lang == "en" ? `I'd like to...` : 'Vorrei...'}></textarea>
              <button id="submit" type="submit" class="btn submit dropShadow"  class:locked={valueRequest === ""} on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Submit</button>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "car"}>
            <div class="formBackground shadow {bg}">
              <p>Give us some details</p>
              <div style="display: flex; flex-wrap: wrap; gap: var(--gutter); justify-content:flex-start; margin-bottom: 1em;">
                <input style="width: 100%;" type="text" bind:value={valuePickup} id="pickup" name="pickup" placeholder={lang == "en" ? `Pick up address (required)` : '___'}>
                <input style="width: 100%;" type="text" bind:value={valueDestination} id="destination" name="destination" placeholder={lang == "en" ? `Destination address` : '___'}>
                <p class="label">Pick up date, time and passengers: </p>
                <input style="width: 60%" type="datetime-local" bind:value={valueDatetime} id="datetime" name="datetime">
                <input style="width: calc(40% - var(--gutter) - 40px)" type="number" min="1" max="10" bind:value={valuePassengers} id="passengers" name="passengers" placeholder={lang == "en" ? `1` : '___'}>
              </div>
              <textarea bind:value={valueRequest} class="dropShadow" rows="4" id="message" name="message" placeholder={lang == "en" ? `Additional requests` : 'Altre richieste'}></textarea>
              <button id="submit" type="submit" class="btn submit dropShadow"  class:locked={valuePickup === "" || valueDestination === "" || valueDatetime === "" || valuePassengers === ""} on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Submit</button>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "table"}>
            <div class="formBackground shadow {bg}">
              <p>Give us some details</p>
              <div style="display: flex; flex-wrap: wrap; gap: var(--gutter); justify-content:flex-start; margin-bottom: 1em;">
                <input style="width: 100%;" type="text" bind:value={valueRestaurant} id="restaurant" name="restaurant" placeholder={lang == "en" ? `Restaurant (required)` : '___'}>
                <p class="label">Date, hour and guests: </p>
                <input style="width: 60%" type="datetime-local" bind:value={valueDatetime} id="datetime" name="datetime">
                <input style="width: calc(40% - var(--gutter) - 40px)" type="number" min="1" max="10" bind:value={valueGuests} id="guests" name="guests" placeholder={lang == "en" ? `Guests` : '___'}>
              </div>
              <textarea bind:value={valueRequest} class="dropShadow" rows="4" id="message" name="message" placeholder={lang == "en" ? `Additional requests` : 'Altre richieste'}></textarea>
              <button id="submit" type="submit" class="btn submit dropShadow"  class:locked={valueRestaurant === "" || valueDatetime === "" || valueGuests === ""} on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Submit</button>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "laundry"}>
            <div class="formBackground shadow {bg}">
              <p>Give us some details</p>
              <div style="display: flex; flex-wrap: wrap; gap: var(--gutter); justify-content:flex-start; margin-bottom: 1em;">
                <p class="label">Pickup date and time: </p>
                <input style="width: 100%" type="datetime-local" bind:value={valueDatetime} id="datetime" name="datetime">
                <input style="width: 100%;" type="text" bind:value={valueItems} id="items" name="items" placeholder={lang == "en" ? `Items (required, separate with comma)` : '___'}>
              </div>
              <textarea bind:value={valueRequest} class="dropShadow" rows="4" id="message" name="message" placeholder={lang == "en" ? `Additional requests` : 'Altre richieste'}></textarea>
              <button id="submit" type="submit" class="btn submit dropShadow"  class:locked={valueDatetime === "" || valueItems === ""} on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Submit</button>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "food"}>
            <div class="formBackground shadow {bg}">
              <p>Give us some details</p>
              <div style="display: flex;    align-items: baseline;">
                <p style="margin-left: 10px; margin-right: var(--margin);">I'd like to eat: </p>
                <select id="food" name="food" form="cleo-form" class="dropShadow">
                  <option value="Pizza">Pizza</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Hamburger">Hamburger</option>
                  <option value="Salad">Salad</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <input style="width: auto;" type="text" bind:value={valueRestaurant} id="restaurant" name="restaurant" placeholder={lang == "en" ? `Restaurant (required)` : '___'}>
              <input style="width: auto" type="datetime-local" bind:value={valueDatetime} id="datetime" name="datetime">
              <input style="width: auto;" type="text" bind:value={valueItems} id="items" name="items" placeholder={lang == "en" ? `Items (required, separate with comma)` : '___'}>
              <textarea bind:value={valueRequest} class="dropShadow" rows="4" id="message" name="message" placeholder={lang == "en" ? `Additional requests` : 'Altre richieste'}></textarea>
              <button id="submit" type="submit" class="btn submit dropShadow"  class:locked={valueRestaurant === "" || valueDatetime === "" || valueItems === ""} on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Submit</button>
            </div>
          </div>
          <div class="form-step" class:active={userKind === "spa" || userKind === "tour"}>
            <div class="formBackground shadow {bg}">
              <p>{#if userKind === "spa"}What treatment would you like to have?{:else if userKind === "tour"}What whould you like to see?{/if}</p>
              <textarea bind:value={valueRequest} rows="11" id="message" name="message" placeholder={lang == "en" ? `I'd like to...` : 'Vorrei...'}></textarea>
              <button id="submit" type="submit" class="btn submit dropShadow"  class:locked={valueRequest === ""} on:click={() => {cleoPopupVisible = !cleoPopupVisible; userKind="unset"}}>Submit</button>
            </div>
          </div>
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
    -o-object-fit: cover;
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
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr;
    grid-template-columns: repeat(3, 1fr);
    -webkit-column-gap: var(--gutter);
       -moz-column-gap: var(--gutter);
            column-gap: var(--gutter);
    row-gap: var(--margin);
    scrollbar-width: none;  /* Firefox */
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  #suites>div::-webkit-scrollbar {
    display: none;
  }
  #suites>div>div {
    width: calc((100vw - var(--margin)*2 - var(--gutter)*2)/3);
    -ms-grid-column-span: 1;
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
    -o-object-fit: cover;
       object-fit: cover;
    display: block;
  }
  swiper-container::part(pagination) {
    top: var(--margin);
    bottom: unset;
    display: -webkit-box;
    display: -ms-flexbox;
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
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr var(--gutter) 1fr;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 0 calc(var(--margin)*2);
    -webkit-column-gap: var(--gutter);
       -moz-column-gap: var(--gutter);
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
    -ms-flex-line-pack: center;
        align-content: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    text-align: center;
    height: auto;
  }
  #cleo-logo {
    width: 10vw;
    margin: auto;
    padding: 20vh 0 var(--margin);
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }
  #cleo-logo.cleoPopup {
    -webkit-transform: translateY(-80px);
        -ms-transform: translateY(-80px);
            transform: translateY(-80px);
  }
  #cleo-payoff {
    width: auto;
    margin: auto;
    padding: 0 0 40vh;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }
  #cleo-payoff.cleoPopup {
    -webkit-transform: translateY(-80px);
        -ms-transform: translateY(-80px);
            transform: translateY(-80px);
    opacity: 0;
  }
  #cleo-content {
    max-width: 400px;
    margin: auto;
    padding: 0 var(--margin) var(--margin);
    position: relative;
    z-index: 1;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
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
  #cleo-btn.back {
    text-decoration: underline;
    background: none;
    border: none;
    color: #000;
  }
  .blue-azure {
    /* background: -webkit-gradient(linear, left top, right top, from(#91B0B6), color-stop(#FFF), to(#D8FFF4));
    background: -o-linear-gradient(left, #91B0B6, #FFF, #D8FFF4);
    background: linear-gradient(0.25turn, #91B0B6, #FFF, #D8FFF4); */
    background-color: var(--gray);
  }
  .blue-azure:hover {
    /* color: #444; */
    background-color: #000;
  }
  .blue {
    /* background: -webkit-gradient(linear, left top, right top, from(#91B0B6), to(#FFF));
    background: -o-linear-gradient(left, #91B0B6, #FFF);
    background: linear-gradient(0.25turn, #91B0B6, #FFF); */
    background-color: #FFF;
  }
  .blueInverse {
    /* background: -webkit-gradient(linear, left top, right top, from(#FFF), to(#91B0B6));
    background: -o-linear-gradient(left, #FFF, #91B0B6);
    background: linear-gradient(0.25turn, #FFF, #91B0B6); */
    /* background-color: #FFF; */
  }
  .azure {
    /* background: -webkit-gradient(linear, left top, right top, from(#D8FFF4), to(#FFF));
    background: -o-linear-gradient(left, #D8FFF4, #FFF);
    background: linear-gradient(0.25turn, #D8FFF4, #FFF); */
    background-color: #FFF;
  }
  .azureInverse {
    /* background: -webkit-gradient(linear, left top, right top, from(#FFF), to(#D8FFF4));
    background: -o-linear-gradient(left, #FFF, #D8FFF4);
    background: linear-gradient(0.25turn, #FFF, #D8FFF4); */
    /* background-color: #FFF; */
  }
  .cleo {
    padding: 10px 24px 15px;
    border-radius: 5px;
    font-size: 15px;
    line-height: 18px;
  }
  .cleo:hover {
    color: #FFF;
    background-color: #000;
  }
  .dropShadow {
    /* -webkit-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05));
            filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05)); */
  }
  .shadow {
    -webkit-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05));
            filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05));
  }
  .form-step {
    display: none;
    font-size: 15px;
    line-height: 18px;
  }
  .form-step.active {
    display: contents;
  }
  .option {
    /* border-radius: 99px;
    height: 37px;
    padding: 0px 30px 4px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content; */
    height: 29.5px;
  }
  select {
    /* padding: 0px 50px 4px 30px; */
    padding-right: 30px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    height: 29.5px;
    border-radius: 99px;
    /* height: 37px; */
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat, repeat;
    background-position: right 15px top 50%, 0 0;
    background-size: .6em auto, 100%;
    border: none;
  }
  select::-ms-expand {
    display: none;
  }
  .next, .submit {
    background-color: #000;
    color: #FFF;
    border-radius: 99px;
    /* height: 37px; */
    height: 29.5px;
    padding: 0px 30px 4px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin: auto;
    margin-top: 1.3em;
    margin-bottom: .5em;
    position: absolute;
    bottom: .5em;
    left: 50%;
    -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
            transform: translateX(-50%);
  }
  .next:hover {
    color: #FFF;
    background-color: #444;
  }
  .submit {
    bottom: unset;
    position: relative;
    width: 100%;
    margin-top: 0;
    background-color: #000;
    color: #FFF;
    border-radius: 5px;
  }
  .locked {
    pointer-events: none;
    background-color: #FFF;
    color: var(--gray);
  }
  .formBackground {
    display: block;
    padding: var(--margin);
    min-height: 250px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    row-gap: var(--margin);
    border-radius: 5px;
    font-size: 15px;
    line-height: 18px;
  }
  input {
    color: #A0A0A0;
    /* padding: 0px 10px 4px; */
    display: block;
    /* height: 33px; */
    /* border-radius: 5px; */
    border: none;
    border-bottom: 1px solid var(--lightGray);
    width: -webkit-fill-available;
    /* -webkit-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05));
            filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .05)); */
  }
  .formBackground>p {
    margin-top: .5em;
    margin-bottom: 1.3em;
  }
  textarea {
    border: solid 1px var(--lightGray);
    padding: var(--gutter);
    border-radius: 5px;
    resize: vertical;
  }
  select:focus, textarea:focus, input:focus{
    outline: none;
    color: #000;
  }
  .label {
    margin-left: 2px;
    margin-right: var(--margin);
    font-size: 15px;
    line-height: 18px;
    margin-top: var(--gutter);
    -ms-flex-preferred-size: 100%;
        flex-basis: 100%;
    text-align: left;
  }

  #cleo-spline {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    z-index: 1;
    display: block;
  }
  #cleo-spline.cleoPopup {
    -webkit-transform: translateX(-50%) translateY(var(--cleoPopupTranslate)) scale(.3);
        -ms-transform: translateX(-50%) translateY(var(--cleoPopupTranslate)) scale(.3);
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
    width: 400px;
    top: 47%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
    z-index: 3;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: auto;
    margin: auto;
  }
  #cleo-form {
    /* transform: scale(.8); */
  }
  @media only screen and (max-width: 1200px) {
    #suites>div {
      -ms-grid-columns: (1fr)[3];
      grid-template-columns: repeat(3, 1fr);
      overflow-x: scroll;
    }
    #suites>div>div {
      width: calc((100vw - var(--margin)*2 - var(--gutter)*2)/2.2);
    }
  }
  @media only screen and (max-width: 900px) {
    #cleo-spline {
      top: 45%;
    }
    #suites>div>div {
      width: calc((100vw - var(--margin)*2 - var(--gutter)*2)/1.6);
    }
    #cleo-content.cleoPopup {
      padding-bottom: 100px;
    }
    #cleo-logo {
      width: 25vw;
      padding: 10vh 0 var(--margin);
    }
  }
  @media only screen and (max-width: 600px) {
    h3 {
      font-size: 26px;
      line-height: 32px;
    }
    #suites>div {
      -ms-grid-columns: (1fr)[1];
      grid-template-columns: repeat(1, 1fr);
    }
    #suites>div>h3 {
      -ms-grid-column-span: 1;
      grid-column: span 1;
    }
    #suites>div>div {
      width: calc((100vw - var(--margin)*2));
      margin-bottom: var(--sectionMargin);
    }
    #cleo-popup {
      width: calc(100% - var(--margin)*2);
    }
    #cleo-form {
      width: -webkit-fill-available;
      display: flex;
      flex-direction: column;
      gap: var(--margin);
      transform: scale(.9);
    }
  }
</style>