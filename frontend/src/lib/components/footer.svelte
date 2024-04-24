<script lang="ts">
  export let siteSettings
	import { i18n } from '$lib/i18n.js'
  import * as m from "$lib/paraglide/messages"
  import { languageTag } from "$lib/paraglide/runtime.js"
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
</script>
<footer>
  <div>
    <p>©{new Date().getFullYear()} d’ARIA Srl</p>
    <p>{siteSettings.piva}</p>
    {#if siteSettings.maps}
      <p>{siteSettings.headquarters}</p>
    {/if}
  </div>
  <div>
    <p>{m.footerlocated()}</p>
    {#if siteSettings.maps}
      <a class="maps" target="_blank" href="{siteSettings.mapsLink}">{siteSettings.maps}</a>
    {/if}
  </div>
  <div>
    <p>{m.footercontact()}</p>
    <p>T. <a class="" target="_blank" href="tel:{siteSettings.phone.replace(/\s/g, '')}">{siteSettings.phone}</a></p>
    {#if siteSettings.mail}
      <p>M. <a target="_blank" href="mailto:{siteSettings.mail}">{siteSettings.mail}</a></p>
    {/if}
  </div>
  <div>
    <p>{m.footerfollow()}</p>
    {#if siteSettings.instagramLink}
      <p><a target="_blank" href="{siteSettings.instagramLink}">{siteSettings.instagram}</a></p>
    {/if}
    {#if siteSettings.pinterestLink}
      <p><a target="_blank" href="{siteSettings.pinterestLink}">{siteSettings.pinterest}</a></p>
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

<style>
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
    footer {
      -ms-grid-columns: (1fr)[2];
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 400px) {
    footer {
      -ms-grid-columns: (1fr)[1];
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>