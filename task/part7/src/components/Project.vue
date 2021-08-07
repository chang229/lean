<template>
  <div class="projects">
          <div class="project" v-for="project in $static.projects.edges" :key="project.node.id">
            <a href="/projects/chelsea-landmark/" class="project-link">
              <img alt="Banana" :src="project.node.src" class="thumbnail g-image g-image--lazy g-image--loading">
              
              <h3 class="project-title">{{project.node.title}}</h3>
              <div class="categories">
                <span class="category" v-for="category in project.node.categories" :key="category">{{category}}</span>
              </div>
            </a>
          </div>
  </div>
</template>

<static-query>
query {
  projects: allProjects {
    edges {
      node {
        id
        title
        categories
        src
      }
    }
  }
}
</static-query>

<script>
export default {
    name: 'Project'
}
</script>

<style>

</style>