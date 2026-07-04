// Visit the wiki for more info - https://kubejs.com/
console.info('Hello, World! (Loaded client example script)')

RecipeViewerEvents.removeEntries('item', event => {
  event.remove('#kubejs:removed')
})

RecipeViewerEvents.removeEntries('fluid', event => {
  event.remove('#kubejs:removed')
})