<!-- PortableTextStyle -->
<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'

  export let portableText: BlockComponentProps

  $: ({global, value} = portableText)
  $: ({style} = value)
</script>

{#if style === 'h2'}
  <h2><slot /></h2>
{:else if style === 'h3'}
  <h3><slot /></h3>
{:else if style === 'h4'}
  <h4><slot /></h4>
{:else if style === 'h5'}
<div class="btn">
  <slot/>
</div>
{:else if style === 'normal'}
  <p><slot /></p>
{:else if value.href}
  <a href={value.href} target={value.blank ? '_blank' : undefined}>
    <slot />
  </a>
{/if}

<style>
  * {
    max-width: 640px;
  }
  a {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }
  a:hover {
    color: var(--darkGray);
  }
  p {
    color: red;
  }
  h2 {
    font-size: 30px;
    line-height: 36px;
    max-width: 800px;
    margin-bottom: calc(var(--margin)*1.2);
  }
  h3 {}
  h4 {}
  h5 {}
  @media only screen and (max-width: 600px) {
    h2 {
      font-size: 26px;
      line-height: 32px;
    }
  }
</style>