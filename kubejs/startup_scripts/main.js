// Visit the wiki for more info - https://kubejs.com/
console.info('Hello, World! (Loaded startup example script)')

StartupEvents.registry('block', event => {
    event.create('cloud') // Create a new block
        .displayName('Cloud') // Set a custom name
        .soundType('wool') // Set a material (affects the sounds and some properties)
        .hardness(0) // Set hardness (affects mining time)
        .resistance(0) // Set resistance (to explosions, etc)
        .opaque(false)
        .renderType('translucent')
        //.textureAll('kubejs:block/cloud')
        .noCollision()
        .notSolid()
        .noDrops()
        .slipperiness(0.5)
        .noValidSpawns(true)
        .viewBlocking(false)
        .transparent(true)
})


BlockEvents.modification(event => {
    event.modify('tfmg:oil_deposit', block => {
        block.hasCollision = false;
        block.destroySpeed = 0
        block.explosionResistance = 0
        //block.requiredTool = false;
    })
})