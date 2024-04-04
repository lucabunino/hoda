<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  console.log(data);
  
  import { onMount, afterUpdate, tick } from 'svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { page, navigating } from '$app/stores';
  import { fade, slide, fly } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
  import { browser } from '$app/environment';
  
  $: innerWidth = 1
	$: innerHeight = 1
  $: scrollY = ""
  $: logoHeight = "";
  $: navHeight = "";
  $: mobileMenu = false;
  
  let headerPosition = "down";
  let prevScrollY = 0;
  function scrolling() {
    const deltaScroll = scrollY - prevScrollY;
    if ($page.url.pathname === "/") {
      if (scrollY > innerHeight*.7 && deltaScroll > 0) {
        headerPosition = "up";
      } else if (deltaScroll < -10 || scrollY < 100) {
        headerPosition = "down";
      }
    } else {
      if (scrollY > 150 && deltaScroll > 0) {
        headerPosition = "up";
      } else if (deltaScroll < -10 || scrollY < 100) {
        headerPosition = "down";
      }
    }
    prevScrollY = scrollY
  }

  $: noTransition = false;
  $: resizeTimeout = "";
  function handleResize() {
    noTransition = true; // Set noTransition to true on resize
    clearTimeout(resizeTimeout); // Clear any existing timeout
    resizeTimeout = setTimeout(() => {
      noTransition = false; // Set noTransition back to false after a delay
    }, 200); // Adjust the delay time as needed
  }
  $: ready = false
  onMount(() => {
    if (innerHeight !== null) {
      ready = true
    }
	});
  $: delay1s = false;
  beforeNavigate(() => {
    delay1s = true
    setTimeout(() => {
      delay1s = false
    }, 1000);
	});
  afterNavigate(() => {
    mobileMenu = false
	});
  function pageTransition(node, { delay, duration, offset=window.scrollY}) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = quartInOut(t);
				return `
          opacity: ${eased};
          margin-top: -${offset}px;
				`;
			}
		};
	}
  function openMenu() {
    mobileMenu = !mobileMenu
	}
  $: mobileNewsletter = false
  function openNewsletter() {
    mobileNewsletter = true
	}
  function closeNewsletter() {
    mobileNewsletter = false
	}
  let bookNowButtons = false;
  let lodgifyActive = ""
  let scrollTop = null;
  let scrollLeft = null;
  $: timer = 3000;
  function book(i) {
    timer = 20000;
    console.log("book " + i);
    disableScroll()
    lodgifyActive = i
  }
  function unbook(i) {
    timer = 3000;
    bookNowButtons = false
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

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY={scrollY} on:resize={handleResize} on:scroll={scrolling}/>

<header bind:clientHeight={logoHeight} class={headerPosition} class:true={mobileMenu} class:closed={$page.url.pathname !== "/"}>
  <div class="headerBg"
  style={`--navHeight: ${navHeight}px`}
  class:true={mobileMenu}
  class:headerBgHidden={$page.url.pathname === "/" && scrollY < innerHeight - logoHeight}
  class:headerBgBorder={$page.url.pathname !== "/" || scrollY > innerHeight - logoHeight}>
  </div>
  {#if data.siteSettings[0].logo}
    <a id="logo" class:noTransition={noTransition == true} class:delay1s={delay1s == true} class:true={mobileMenu} class:closed={$page.url.pathname !== "/" || scrollY >= 100} href="/" aria-current={$page.url.pathname === '/'}>
      {@html data.siteSettings[0].logo}
    </a>
  {/if}
  <button id="menuSwitch" class="btn mobileOnly" class:true={mobileMenu} on:click={openMenu}>
    {#if mobileMenu}
      Close
    {:else}
      Menu
    {/if}
  </button>
  <nav
  bind:clientHeight={navHeight}
  class:noTransition={noTransition == true}
  class={mobileMenu} class:closed={$page.url.pathname !== "/" || scrollY >= 100 && innerWidth > 900}
  >
    <ul>
      <li><a class="menu-item menu-item-mobile" href="/about" aria-current={$page.url.pathname === '/about'}>About</a></li>
      <li><a class="menu-item menu-item-mobile" href="/suites" aria-current={$page.url.pathname === '/suites'}>Suites</a></li>
      <li class="hidden"><a class="menu-item menu-item-mobile" href="/neighborhood" aria-current={$page.url.pathname === '/neighborhood'}>Neighborhood</a></li>
      <li class="hidden"><a class="menu-item menu-item-mobile" href="/shop" aria-current={$page.url.pathname === '/shop'}>Shop</a></li>
    </ul>
    <ul>
      {#if !bookNowButtons}
        <li in:fade={{duration: 0, easing: quartInOut}}>
          <p class="menu-item menu-item-mobile btn" href="/about" on:click={() => bookNowButtons = true}>Book now</p>
        </li>
      {:else}
        <div id="bookNowContainer" in:fade={{duration: 0, easing: quartInOut}} on:mouseleave={() => setTimeout(() => bookNowButtons = false)}>
          {#each data.suitesIds as suite, i (suite)}
            <li>
              <p class="menu-item btn" on:click={() => book(i)}>{suite.title}</p>
            </li>
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
      {/if}
      <li><a id="languageSwitch" class="menu-item btn-mobile" href="/it">En</a></li>
    </ul>
  </nav>
</header>


{#key data.pathname}
  <div style="min-height: 100vh;" in:fade={{duration: 1000, delay: 1000, easing: quartInOut}} out:pageTransition={{duration: 1000, easing: quartInOut}}>
    <slot></slot>
  </div>
{/key}


{#if ready}
<div id="newsletter"
transition:slide={{duration: 1000, easing: quartInOut}}
on:mouseenter={openNewsletter}
on:mouseleave={closeNewsletter}
class:true={mobileNewsletter}>
  <p>Join the newsletter</p>
  <p>Sign-up to enjoy 10% off your first order.</p>
  <div id="mc_embed_shell">
  <div id="mc_embed_signup">
    <form action="https://hodamilano.us22.list-manage.com/subscribe/post?u=2116d9d590155d776f4f24a83&amp;id=65445ebeaf&amp;f_id=0042c6e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
        <div id="mc_embed_signup_scroll">
          <input type="email" name="EMAIL" class="required email" placeholder="Email" id="mce-EMAIL" required="" value="">
          <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
        </div>
    </form>
  </div>
  </div>
</div>
{/if}


<footer>
  <div>
    <p>©2024 HOD’A</p>
    {#if data.siteSettings[0].maps}
      <a class="maps" target="_blank" href="{data.siteSettings[0].mapsLink}">{data.siteSettings[0].maps}</a>
    {/if}
  </div>
  <div>
    <p>T. <a class="" target="_blank" href="tel:{data.siteSettings[0].phone.replace(/\s/g, '')}">{data.siteSettings[0].phone}</a></p>
    {#if data.siteSettings[0].mail}
      <p>M. <a target="_blank" href="mailto:{data.siteSettings[0].mail}">{data.siteSettings[0].mail}</a></p>
    {/if}
  </div>
  <div>
    <p>Follow us:</p>
    {#if data.siteSettings[0].instagram}
      <p><a target="_blank" href="{data.siteSettings[0].instagramLink}">{data.siteSettings[0].instagram}</a></p>
    {/if}
    {#if data.siteSettings[0].pinterest}
      <p><a target="_blank" href="{data.siteSettings[0].pinterestLink}">{data.siteSettings[0].pinterest}</a></p>
    {/if}
  </div>
  <div>
    <p><a target="" href="/about">About</a></p>
    <p><a target="" href="/suites">Suites</a></p>
    <p class="hidden"><a target="" href="/neighbourhood">Neighbourhood</a></p>
  </div>
  <div class="hidden">
    <p><a target="_blank" href="/shop">Shop</a></p>
    <p>Return policy shop</p>
    <p>Terms and conditions</p>
  </div>
  <div>
    <p>Cookie policy</p>
    <p>Privacy policy</p>
  </div>
</footer>

<style lang="css">
  header {
    position: fixed;
    top: 0;
    width: 100%;
    transition: var(--transition);
    padding: var(--margin) 0;
    z-index: 10;
  }
  header.up {
    transform: translateY(-101%);
  }
  header.closed {
    padding: var(--margin) 0;
  }
  #logo {
    margin: 0;
    display: grid;
    transition: var(--transition);
    transition-duration: 1500ms;
    margin: auto;
    width: calc(100% - var(--margin)*2);
    z-index: 10;
    position: relative;
  }
  #logo.closed {
    width: 140px;
  }
  #logo.noTransition,
  nav.noTransition {
    transition: none;
  }
  nav {
    position: absolute;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    height: 37px;
    width: 100%;
    transition: var(--transition);
    transition-duration: 1500ms;
    top: calc((100vw - var(--margin)*2)*.266 + var(--margin)*2);
  }
  nav.closed {
    top: var(--margin);
  }
  .headerBg {
    width: 100%;
    height: 100%;
    background-color: var(--white);
    position: absolute;
    top: 0;
    left: 0;
    transition: all cubic-bezier(0.770, 0.000, 0.175, 1.000) 100ms 1000ms;
    border-bottom: solid 1px var(--white);
  }
  .headerBgHidden {
    opacity: 0;
    transition-delay: 0ms;
  }
  .headerBgBorder {
    border-bottom: solid 1px var(--gray);
  }
  ul {
    display: flex;
    padding: var(--gutter) var(--margin);
    margin: 0;
    gap: var(--margin);
  }
  li {
    list-style: none;
  }
  ul>button.active {
    text-decoration: underline;
  }
  #bookNowContainer {
    display: flex;
    gap: var(--gutter);
  }





  #newsletter {
    position: sticky;
    bottom: 0;
    padding: var(--gutter) var(--margin);
    background-color: var(--lightGray);
    display: grid;
    gap: var(--gutter);
    grid-template-columns: repeat(6, 1fr);
    z-index: 10;
  }
  #newsletter>p+p {
    grid-column: span 2;
  }
  #mc_embed_shell, #mc_embed_signup {
    display: contents;
  }
  form {
    display: flex;
    grid-column: span 3;
  }
  form>div {
    display: grid;
    gap: var(--gutter);
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
  form>div>.email {
    border: none;
    padding: 0;
    background-color: transparent;
  }
  form>div>input:focus{
    outline: none;
  }
  form>div>input[type="submit"]{
    border: none;
    text-align: left;
    padding: 0;
    cursor: pointer;
  }
  form>div>input[type="submit"]:hover{
    color: var(--darkGray);
  }
  ::placeholder {
    color: var(--darkGray);
    opacity: 1; /* Firefox */
  }
  ::-ms-input-placeholder { /* Edge 12 -18 */
    color: #000;
  }
  footer {
    padding: var(--gutter) var(--margin) calc(var(--margin)*2);
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--gutter);
  }
  footer>div>a:hover,
  footer>div>p>a:hover {
    color: var(--darkGray);
  }
  @media only screen and (max-width: 900px) {
    header.up {
      transform: translateY(-101%);
      transition-duration: 800ms;
    }
    header.up.true {
      transform: translateY(0);
    }
    header,
    header.closed {
      padding: var(--margin) 0;
    }
    #menuSwitch {
      position: fixed;
      right: var(--margin);
      top: var(--margin);
      z-index: 1;
      width: 65px;
    }
    #menuSwitch.true {
      background-color: var(--black);
      color: var(--white);
    }
    #logo {
      margin-left: var(--margin);
      width: 60vw;
      transition-duration: 500ms;
    }
    #logo.true {
      width: 140px;
    }
    #logo.closed {
      width: 140px;
    }
    #logo.noTransition,
    nav.noTransition {
      transition: none;
    }
    #logo.delay1s {
      transition-delay: 1s;
    }
    nav,
    nav.closed {
      position: fixed;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      display: flex;
      flex-direction: column;
      height: auto;
      padding-bottom: var(--gutter);
      justify-content: flex-start;
      transition-duration: 0ms;
      transition-delay: 0ms;
      opacity: 1;
    }
    nav.true {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0ms;
    }
    .headerBg {
      transition: var(--transition);
      transition-duration: 0ms;
      transition-delay: 0ms;
      border-bottom: solid 1px var(--gray);
    }
    .headerBg.true {
      height: var(--navHeight);
      transition-delay: 0ms;
      opacity: 1;
    }
    ul {
      flex-direction: column;
      padding: 0 var(--margin);
      margin-top: 100px;
      gap: 0;
    }
    ul+ul {
      margin-top: 0;
    }
    .menu-item-mobile {
      font-family: 'arizona-flare-light', 'Times New Roman', Times, serif;
      font-size: 42px;
      line-height: 53px;
      letter-spacing: -0.03em;
      padding: 0;
      background-color: transparent;
    }
    .menu-item-mobile:hover {
      color: inherit;
    }
    ul>button.active {
      text-decoration: underline;
    }
    #languageSwitch {
      position: absolute;
      right: 90px;
      top: var(--margin);
      line-height: initial;
      background-color: var(--gray);
    }
    #newsletter {
      display: flex;
      flex-direction: column;
      gap: 0;
      bottom: -1.8em;
      transition: var(--transition);
      padding: var(--margin);
    }
    #newsletter.true {
      bottom: 0;
    }
    #newsletter>form {
      padding-top: var(--margin);
    }
    #newsletter>form>div {
      display: grid;
      gap: var(--gutter);
      grid-template-columns: repeat(2, 1fr);
    }
    footer {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 400px) {
    #newsletter>form>div {
      display: flex;
      justify-content: space-between;
    }
    footer {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>