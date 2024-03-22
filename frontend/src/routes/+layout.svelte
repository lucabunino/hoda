<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { onMount, afterUpdate, tick } from 'svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { page, navigating } from '$app/stores';
  import { fade, slide, fly } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
  
  $: innerWidth = 1
	$: innerHeight = 1
  $: scrollY = ""
  $: logoHeight = "";
  $: navHeight = "";
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
  $: mobileMenu = false
  function openMenu() {
    mobileMenu = !mobileMenu
	}
  $: mobileNewsletter = false
  function openNewsletter() {
    mobileNewsletter = !mobileNewsletter
	}
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
    <a id="logo" class:noTransition={noTransition == true} class:true={mobileMenu} class:closed={$page.url.pathname !== "/" || scrollY >= 100} href="/" aria-current={$page.url.pathname === '/'}>
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
      <li><a class="menu-item menu-item-mobile btn" href="/about">Book now</a></li>
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
on:click={openNewsletter}
class:true={mobileNewsletter}>
  <p>Join the newsletter</p>
  <p>Sign-up to enjoy 10% off your first order.</p>
  <form action="YOUR_MAILCHIMP_FORM_ACTION_URL" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
      <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email" required>
      <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
    </div>
  </form>
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
  #newsletter>form {
    display: flex;
    grid-column: span 3;
  }
  #newsletter>form>div {
    display: grid;
    gap: var(--gutter);
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
  #newsletter>form>div>.email {
    border: none;
    padding: 0;
    background-color: transparent;
  }
  #newsletter>form>div>input:focus{
    outline: none;
  }
  #newsletter>form>div>input[type="submit"]{
    border: none;
    text-align: left;
    padding: 0;
    cursor: pointer;
  }
  #newsletter>form>div>input[type="submit"]:hover{
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
    #logo {
      margin-left: var(--margin);
      width: 60vw;
    }
    #logo.true {
      width: 140px;
      transition-duration: 500ms;
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
    header.up {
      transform: translateY(-101%);
      transition-duration: 800ms;
    }
    header.up.true {
      transform: translateY(0);
    }
    header.closed {
      padding: var(--margin) 0;
    }
    #logo.closed {
      width: 140px;
    }
    #logo.noTransition,
    nav.noTransition {
      transition: none;
    }
    nav {
      position: fixed;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      display: flex;
      flex-direction: column;
      height: auto;
      padding-bottom: var(--gutter);
      justify-content: flex-start;
      transition-duration: 800ms;
      transition-delay: 0ms;
      opacity: 1;
    }
    nav.true {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 200ms;
    }
    .headerBg {
      transition: var(--transition);
      transition-duration: 800ms;
      transition-delay: 200ms;
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
      margin-top: 24vw;
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
      bottom: -2.1em;
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