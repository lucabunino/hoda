<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  
  import { onMount, afterUpdate, tick } from 'svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { page, navigating } from '$app/stores';
  import { fade, slide, fly } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
  import { browser } from '$app/environment';
  import {urlFor} from '$lib/utils/image';

  $: ready = false
  $: innerWidth = 1280
	$: innerHeight = 800
  $: scrollY = ""
  $: logoHeight = "";
  $: navHeight = "";
  $: mobileMenu = false;
  $: logoMaxWidth = ""
  $: logoWidthDifference = ""
  $: logoWidth = ""
  $: navMaxTop = ""
  $: navTopDifference = ""
  $: navTop = ""
  $: margin = ""
  $: headerPosition = "down";
  $: prevScrollY = 0;
  $: noTransition = false;
  $: resizeTimeout = "";
  $: delay1s = false;
  $: mobileNewsletter = false


  onMount(() => {
    if (innerHeight !== null) {
      if (innerWidth > 900) {
        margin = 16
      } else {
        margin = 12
      }
      logoMaxWidth = (innerWidth - 2*margin);
      navMaxTop = (innerWidth - margin*2)*.266 + margin*2
      calcHeaderPosition()
    }
    ready = true;
	});

  beforeNavigate(() => {
    delay1s = true
    setTimeout(() => {
      delay1s = false
    }, 1000);
	});

  afterNavigate(() => {
    mobileMenu = false
	});
  
  function scrolling() {
    if ($navigating) {
      console.log("navigating");
    } else {
      if (data.pathname === "/") {
        applyNoTransition();
        logoWidthDifference = (scrollY - 50)/(innerHeight);
        navTopDifference = (scrollY - 50)/(innerHeight*.9);
        logoWidth = logoMaxWidth - logoMaxWidth*logoWidthDifference;
        if (logoWidth < 140) {
          logoWidth = 140
        }
        navTop = navMaxTop - navMaxTop*navTopDifference;
        if (navTop < margin) {
          navTop = margin
        }
      };
      calcHeaderPosition()
    }
  }

  function calcHeaderPosition() {
    const deltaScroll = scrollY - prevScrollY;
    if (data.pathname === "/") {
      if (scrollY > innerHeight && deltaScroll > 0) {
        headerPosition = "up";
      } else if (deltaScroll < -10 || scrollY < 50) {
        headerPosition = "down";
      }
    } else {
      if (scrollY > 150 && deltaScroll > 10) {
        headerPosition = "up";
        console.log("its me");
      } else if (deltaScroll < -10 || scrollY < 50) {
        headerPosition = "down";
      }
    }
    prevScrollY = scrollY
  }

  function applyNoTransition() {
    noTransition = true; // Set noTransition to true on resize
    clearTimeout(resizeTimeout); // Clear any existing timeout
    resizeTimeout = setTimeout(() => {
      noTransition = false; // Set noTransition back to false after a delay
    }, 200); // Adjust the delay time as needed
  }

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
  
  // let currentUrl = ""
  // let wip = false;
  // if (browser) {
  //   currentUrl = window.location.host;
  // }
  // if (currentUrl === "hodamilano.eu") {
  //   wip = true
  // } else {
  //   wip = false
  // }
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY={scrollY} on:resize={applyNoTransition} on:scroll={scrolling} on:wheel|nonpassive={e => {if(scrollLock)e.preventDefault()}}/>
<svelte:head>
  <title>{data.siteSettings[0].SEOTitle.en}</title>
  <meta name="description" content="{data.siteSettings[0].SEODescription.en}" />
  
  <meta property="og:title" content="{data.siteSettings[0].SEOTitle.en}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://hodamilano.eu/" />
  <meta property="og:image" content="{urlFor(data.siteSettings[0].SEOImage).url()}" />
</svelte:head>

<!-- {#if wip}
<div style="position: fixed; display:grid; align-items:center; justify-items:center; background-color: #FFF, width: 100dvw; width: 100vw; height: 100dvh; height: 100vh;">
  <h1>Coming soon</h1>
</div>
{:else} -->

{#if ready}
<header id="header"
bind:clientHeight={logoHeight}
class={headerPosition}
class:true={mobileMenu}
class:closed={$page.url.pathname !== "/"}
>
  <div class="headerBg"
  style={`--navHeight: ${navHeight}px`}
  class:true={mobileMenu}
  class:noTransition={noTransition == true}
  class:headerBgHidden={$page.url.pathname === "/" && scrollY < innerHeight - logoHeight}
  class:headerBgBorder={$page.url.pathname !== "/" || scrollY > innerHeight - logoHeight}>
  </div>

  {#if data.siteSettings[0].logo}
    <a id="logo"
    style={scrollY > 50 && data.pathname === "/" && innerWidth ? `width: ${logoWidth}px` : ''}
    class:noTransition={noTransition == true && innerWidth > 900}
    class:delay1s={delay1s == true}
    class:true={mobileMenu}
    class:closed={$page.url.pathname !== "/" || scrollY > 50}
    href="/" aria-current={$page.url.pathname === '/'}>
      {@html data.siteSettings[0].logo}
    </a>
  {/if}

  <div id="menuSwitch" class="mobileOnly" class:true={mobileMenu} on:click={() => { mobileMenu = !mobileMenu }}>
    <div class="line top" class:cross={mobileMenu}></div>
    <div class="line middle" style="transform: translateY(-50%) scaleX({mobileMenu ? 0 : 1})"></div>
    <div class="line bottom" class:cross={mobileMenu}></div>
  </div>
  <nav
  bind:clientHeight={navHeight}
  class:noTransition={noTransition == true}
  class={mobileMenu}
  class:closed={$page.url.pathname !== "/" || scrollY > 50 && innerWidth > 900}
  style={scrollY > 50 && data.pathname === "/" ? `top: ${navTop}px` : ''}
  >
    <ul>
      <li><a class="menu-item menu-item-mobile" href="/about" aria-current={$page.url.pathname === '/about'}>About</a></li>
      <li><a class="menu-item menu-item-mobile" href="/suites" aria-current={$page.url.pathname === '/suites'}>Suites</a></li>
      <li class="hidden"><a class="menu-item menu-item-mobile" href="/neighborhood" aria-current={$page.url.pathname === '/neighborhood'}>Neighborhood</a></li>
      <li class="hidden"><a class="menu-item menu-item-mobile" href="/shop" aria-current={$page.url.pathname === '/shop'}>Shop</a></li>
    </ul>
    <ul>
      <li in:fade={{duration: 0, easing: quartInOut}}>
        <a class="menu-item menu-item-mobile btn" href="https://www.booking.hodamilano.eu/en/all-properties" target="_blank">Book now</a>
      </li>
      <li class="hidden"><a id="languageSwitch" class="menu-item btn-mobile" href="/it">En</a></li>
    </ul>
  </nav>
</header>
{/if}

{#if ready}
{#key data.pathname}
  <div style="min-height: 100vh;" in:fade={{duration: 1000, delay: 1000, easing: quartInOut}} out:pageTransition={{duration: 1000, easing: quartInOut}}>
    <slot></slot>
  </div>
{/key}
{/if}


{#if ready}
<div id="newsletter"
class="hidden"
transition:slide={{duration: 1000, easing: quartInOut}}
on:mouseenter={() => { mobileNewsletter = true }}
on:mouseleave={() => { mobileNewsletter = false }}
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

{#if ready}
<footer>
  <div>
    <p>©{new Date().getFullYear()} d’ARIA Srl</p>
    <p>{data.siteSettings[0].piva}</p>
    {#if data.siteSettings[0].maps}
      <p>{data.siteSettings[0].headquarters}</p>
    {/if}
  </div>
  <div>
    <p>We are located in:</p>
    {#if data.siteSettings[0].maps}
      <a class="maps" target="_blank" href="{data.siteSettings[0].mapsLink}">{data.siteSettings[0].maps}</a>
    {/if}
  </div>
  <div>
    <p>Contact us:</p>
    <p>T. <a class="" target="_blank" href="tel:{data.siteSettings[0].phone.replace(/\s/g, '')}">{data.siteSettings[0].phone}</a></p>
    {#if data.siteSettings[0].mail}
      <p>M. <a target="_blank" href="mailto:{data.siteSettings[0].mail}">{data.siteSettings[0].mail}</a></p>
    {/if}
  </div>
  <div>
    <p>Follow us:</p>
    {#if data.siteSettings[0].instagramLink}
      <p><a target="_blank" href="{data.siteSettings[0].instagramLink}">{data.siteSettings[0].instagram}</a></p>
    {/if}
    {#if data.siteSettings[0].pinterestLink}
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
  <div class="hidden">
    <p>Cookie policy</p>
    <p>Privacy policy</p>
  </div>
</footer>
{/if}

<style lang="css">
  header {
    position: fixed;
    top: 0;
    width: 100%;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    padding: var(--margin) 0;
    z-index: 10;
  }
  header.up {
    -webkit-transform: translateY(-101%);
        -ms-transform: translateY(-101%);
            transform: translateY(-101%);
  }
  header.closed {
    padding: var(--margin) 0;
  }
  #logo {
    margin: 0;
    display: -ms-grid;
    display: grid;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    -webkit-transition-duration: 1500ms;
         -o-transition-duration: 1500ms;
            transition-duration: 1500ms;
    margin: auto;
    width: calc(100% - var(--margin)*2);
    z-index: 10;
    position: relative;
  }
  #logo.closed {
    width: 140px;
  }
  .noTransition {
    -webkit-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
  }
  nav {
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: baseline;
        -ms-flex-align: baseline;
            align-items: baseline;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    height: 37px;
    width: 100%;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    -webkit-transition-duration: 1500ms;
         -o-transition-duration: 1500ms;
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
    -webkit-transition: all cubic-bezier(0.770, 0.000, 0.175, 1.000) 100ms 1000ms;
    -o-transition: all cubic-bezier(0.770, 0.000, 0.175, 1.000) 100ms 1000ms;
    transition: all cubic-bezier(0.770, 0.000, 0.175, 1.000) 100ms 1000ms;
    border-bottom: solid 1px var(--white);
  }
  .headerBgHidden {
    opacity: 0;
    -webkit-transition-delay: 0ms;
         -o-transition-delay: 0ms;
            transition-delay: 0ms;
  }
  .headerBgBorder {
    border-bottom: solid 1px var(--gray);
  }
  ul {
    display: -webkit-box;
    display: -ms-flexbox;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: var(--gutter);
  }
  #bookNowContainer-container {
    display: flex;
    align-items: baseline;
  }
  @media only screen and (max-width: 900px) {
    #bookNowContainer {
      margin: 5px 0;
      padding: var(--margin) 0;
    }
    #bookNowContainer-container {
      margin-top: 15px;
    }
  }

  #newsletter {
    position: sticky;
    bottom: 0;
    padding: var(--gutter) var(--margin);
    background-color: var(--lightGray);
    display: -ms-grid;
    display: grid;
    gap: var(--gutter);
    -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
    grid-template-columns: repeat(6, 1fr);
    z-index: 10;
  }
  #newsletter>p+p {
    -ms-grid-column-span: 2;
    grid-column: span 2;
  }
  #mc_embed_shell, #mc_embed_signup {
    display: contents;
  }
  form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-grid-column-span: 3;
    grid-column: span 3;
  }
  form>div {
    display: -ms-grid;
    display: grid;
    gap: var(--gutter);
    -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr;
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
  ::-webkit-input-placeholder {
    color: var(--darkGray);
    opacity: 1; /* Firefox */
  }
  ::-moz-placeholder {
    color: var(--darkGray);
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder {
    color: var(--darkGray);
    opacity: 1; /* Firefox */
  }
  ::-ms-input-placeholder {
    color: var(--darkGray);
    opacity: 1; /* Firefox */
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
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--gutter);
  }
  footer>div>a:hover,
  footer>div>p>a:hover {
    color: var(--darkGray);
  }
  @media only screen and (max-width: 900px) {
    header.up {
      -webkit-transform: translateY(-101%);
          -ms-transform: translateY(-101%);
              transform: translateY(-101%);
      -webkit-transition-duration: 800ms;
           -o-transition-duration: 800ms;
              transition-duration: 800ms;
    }
    header.up.true {
      -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
              transform: translateY(0);
    }
    header,
    header.closed {
      padding: var(--margin) 0;
    }
    #menuSwitch {
      position: fixed;
      right: var(--margin);
      top: calc(var(--margin)*1.2);
      z-index: 1;
      width: 34px;
      height: 18px;
    }
    .line {
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: black;
      -webkit-transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
      -o-transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;;
    }
    .line.top {
      top: 0;
      -webkit-transform-origin: bottom left;
          -ms-transform-origin: bottom left;
              transform-origin: bottom left;
    }
    .line.middle {
      top: 50%;
    }
    .line.bottom {
      bottom: 0;
      -webkit-transform-origin: top left;
          -ms-transform-origin: top left;
              transform-origin: top left;
    }
    .line.top.cross {
      -webkit-transform: rotate(45deg) translateY(-6px);
          -ms-transform: rotate(45deg) translateY(-6px);
              transform: rotate(45deg) translateY(-6px);
    }
    .line.bottom.cross {
      -webkit-transform: rotate(-45deg) translateY(6px);
          -ms-transform: rotate(-45deg) translateY(6px);
              transform: rotate(-45deg) translateY(6px);
    }
    #logo {
      margin-left: var(--margin);
      width: 60vw !important;
      -webkit-transition-duration: 500ms;
           -o-transition-duration: 500ms;
              transition-duration: 500ms;
    }
    #logo.true {
      width: 140px !important;
    }
    #logo.closed {
      width: 140px !important;
    }
    #logo.delay1s {
      -webkit-transition-delay: 1s;
           -o-transition-delay: 1s;
              transition-delay: 1s;
    }
    nav,
    nav.closed {
      position: fixed;
      top: 0 !important;
      left: 0;
      -webkit-transform: translateY(-100%);
          -ms-transform: translateY(-100%);
              transform: translateY(-100%);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      height: auto;
      padding-bottom: var(--gutter);
      -webkit-box-pack: start;
          -ms-flex-pack: start;
              justify-content: flex-start;
      -webkit-transition-duration: 0ms;
           -o-transition-duration: 0ms;
              transition-duration: 0ms;
      -webkit-transition-delay: 0ms;
           -o-transition-delay: 0ms;
              transition-delay: 0ms;
      opacity: 1;
    }
    nav.true {
      opacity: 1;
      -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
              transform: translateY(0);
      -webkit-transition-delay: 0ms;
           -o-transition-delay: 0ms;
              transition-delay: 0ms;
    }
    .headerBg {
      -webkit-transition: var(--transition);
      -o-transition: var(--transition);
      transition: var(--transition);
      -webkit-transition-duration: 0ms;
           -o-transition-duration: 0ms;
              transition-duration: 0ms;
      -webkit-transition-delay: 0ms;
           -o-transition-delay: 0ms;
              transition-delay: 0ms;
      border-bottom: solid 1px var(--gray);
    }
    .headerBg.true {
      height: var(--navHeight);
      -webkit-transition-delay: 0ms;
           -o-transition-delay: 0ms;
              transition-delay: 0ms;
      opacity: 1;
    }
    ul {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
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
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      gap: 0;
      bottom: -1.8em;
      -webkit-transition: var(--transition);
      -o-transition: var(--transition);
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
      display: -ms-grid;
      display: grid;
      gap: var(--gutter);
      -ms-grid-columns: 1fr var(--gutter) 1fr;
      grid-template-columns: repeat(2, 1fr);
    }
    footer {
      -ms-grid-columns: (1fr)[2];
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 400px) {
    #newsletter>form>div {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
    }
    footer {
      -ms-grid-columns: (1fr)[1];
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>