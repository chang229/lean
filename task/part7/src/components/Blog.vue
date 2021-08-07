<template>
  <div>
        <div class="latest-journals-heading container">
          <span class="label">Latest and greatest</span>
        </div>
        <div class="latest-journals">
          <div class="container">
            <a href="/journal/gridsome-forestry-cms/" class="journal" v-for="journal in $static.journals.edges" :key="journal.node.id">
              <h3 class="journal-title">{{journal.node.title}}</h3>
            </a>
          </div>
        </div>
  </div>
</template>

<static-query>
query {
  journals: allJournals {
    edges {
      node {
        id
        title
      }
    }
  }
}
</static-query>

<script>
export default {
    name: 'Blog'
}
</script>

<style>

</style>