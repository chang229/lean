<template>
    <div id="app" class="layout sticky-header">
      <header class="header sticky">
        <div class="container">
          <div class="left">
            <g-link to="/" aria-current="page" class="home-link active--exact active">
              <img src="/img/logo.svg" alt="Nichlas W. Andersen" class="logo">
            </g-link>
          </div>
          <nav class="nav right">
            <g-link to="/journal" class="nav__link">Journal</g-link>
            <g-link to="/contact" class="nav__link">Say Hi!</g-link>
          </nav>
        </div>
      </header>

      <slot />

      <footer class="footer">
        <div class="container">
          <span>Copyright &copy; 2021</span>
        </div>
      </footer>
    </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
</style>
