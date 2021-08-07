// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    const projects = require('./src/data/projects.json');
    const projectCollection = addCollection({
      typeName: 'projects'
    })

    for (const project of projects) {
      projectCollection.addNode(project);
    }

    const journals = require('./src/data/journals.json');
    const journalCollection = addCollection({
      typeName: 'journals'
    })

    for (const journal of journals) {
      journalCollection.addNode(journal);
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
