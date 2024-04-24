<script lang="ts">
	import { i18n } from '$lib/i18n.js'
  import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime.js"
  import * as m from "$lib/paraglide/messages"
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
</script>
<ul>
  <li><a class="menu-item menu-item-mobile" href="/about" aria-current={$page.url.pathname === '/about'}>About</a></li>
  <li><a class="menu-item menu-item-mobile" href="/suites" aria-current={$page.url.pathname === '/suites'}>Suites</a></li>
  <li class="hidden"><a class="menu-item menu-item-mobile" href="/neighborhood" aria-current={$page.url.pathname === '/neighborhood'}>Neighborhood</a></li>
  <li class="hidden"><a class="menu-item menu-item-mobile" href="/shop" aria-current={$page.url.pathname === '/shop'}>Shop</a></li>
</ul>
<ul>
  <li in:fade={{duration: 0, easing: quartInOut}}>
    <a class="menu-item menu-item-mobile btn" href="https://www.booking.hodamilano.eu/{m.booknowlink()}" target="_blank">{m.booknow()}</a>
  </li>
  {#each availableLanguageTags as lang}
    <li class="">
      <!-- the hreflang attribute decides which language the link points to -->
      <a
        data-sveltekit-reload
        class:it={(languageTag() === "it")}
        href={i18n.route($page.url.pathname)}
        hreflang={lang}>{lang}
      </a>
    </li>
  {/each}
</ul>

<style>
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
    #bookNowContainer {
      margin: 5px 0;
      padding: var(--margin) 0;
    }
    #bookNowContainer-container {
      margin-top: 15px;
    }
  }
</style>