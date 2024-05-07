<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  
  import {PortableText} from '@portabletext/svelte'
  import PortableTextStyle from '$lib/components/portableTextStyleAbout.svelte';
  import {urlFor} from '$lib/utils/image';
  import { onMount, afterUpdate, tick } from 'svelte';
  import * as m from "$lib/paraglide/messages"
  import { languageTag } from "$lib/paraglide/runtime.js"
  $: lang = languageTag()

  import { register } from 'swiper/element/bundle';
  register();

  $: innerWidth = 0
	$: innerHeight = 0

  let ready = false;
  onMount(() => {
    mountSlider();
  });

  function mountSlider() {
    let swiperEl = document.getElementById('swiperEl');
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
    Object.assign(swiperEl, params);
    swiperEl.initialize();
    swiperEl.swiper.autoplay.stop()
    swiperEl.addEventListener("mouseover", (e) => {
      swiperEl.swiper.autoplay.start();
    });
    swiperEl.addEventListener("mouseout", () => {
      swiperEl.swiper.autoplay.stop();
    });
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

{#if data.aboutPage[0].aboutIntro}
  <section id="intro">
    <PortableText
    value={data.aboutPage[0].aboutIntro[languageTag()]}
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

<section id="images">
  <swiper-container
    init=false
    id={`swiperEl`}
    speed=500
    rewind={true}
    effect='fade'
    slidesPerView=1
    navigation={true}
    pagination={{
      clickable: true
    }}
  >
    {#each data.aboutPage[0].aboutImages as slide, i (slide)}
      <swiper-slide
      :key={i}
      >
        <picture>
          <img
          src={urlFor(slide).url()}
          alt="{m.alt()} HOD’A"
          />
        </picture>
      </swiper-slide>
    {/each}
  </swiper-container>
</section>

{#if data.aboutPage[0].aboutCTAs}
  <section class="hidden" id="cta" style="height: 50vh;">
    <p>CTAs</p>
    {#each data.aboutPage[0].aboutCTAs as aboutCTA, i (aboutCTA)}
      {aboutCTA.question[languageTag()]}
    {/each}
  </section>
{/if}
{#if data.siteSettings[0]}
  <section class="hidden" id="contacts" style="height: 50vh;">
    Contacts
  </section>
{/if}
<section id="contacts-mock" class="s-y_bCXRrkrYfP">
  <h3>{m.contacts()}</h3>
  <p>{m.contactsquestion1()}<br>
    {m.contactswriteat()} <a href="mailto:together@d-aria.eu" target="_blank" class="">together@d-aria.eu</a></p>
  <p>{m.contactsquestion2()}<br>
    Write at <a href="mailto:welcome@hodamilano.eu" target="_blank" class="">welcome@hodamilano.eu</a></p>
</section>

<style>
  :root {
    --sectionMargin: 130px;
  }
  section {
    display: block;
    padding: var(--margin);
  }

  /* INTRO */
  #intro {
    padding: 170px var(--margin) var(--sectionMargin);
    text-align: center;
    margin: auto;
    max-width: 900px;
  }
  @media only screen and (max-width: 900px) {
    #intro {
      padding: calc(70px + var(--gutter)) var(--margin) calc(var(--margin)*2);
    }
  }

  /* IMAGES */
  #images {
    position: relative;
    padding-bottom: var(--gutter);
  }
  swiper-container {
    width: 100%;
    height: 80vh;
    border-radius: var(--gutter);
    overflow: hidden;
  }
  swiper-slide {
  }
  swiper-slide>picture {
    display: block;
    height: 100%;
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

  /* CONTACTS MOCK */
  #contacts-mock {
    padding-top: 0;
    margin-bottom: var(--sectionMargin);
  }
  #contacts-mock>p,
  #contacts-mock>h3 {
    font-size: 30px;
    line-height: 36px;
    max-width: 800px;
    margin-bottom: calc(var(--margin)*1.2);
  }
  a {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }
  a:hover {
    color: var(--darkGray);
  }
  @media only screen and (max-width: 600px) {
    #contacts-mock>p,
    #contacts-mock>h3 {
      font-size: 26px;
      line-height: 32px;
    }
  }
</style>