<template>
  <Layout>

    <div class="container">
      <introduction></introduction>
      <project></project>
      <blog></blog>
    </div>

  </Layout>
</template>

<script>
import Blog from '../components/Blog'
import Introduction from '../components/Introduction'
import Project from '../components/Project'

export default {
  components: { Introduction, Project, Blog },
  metaInfo: {
    title: 'My Blog'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
IntroductionProject