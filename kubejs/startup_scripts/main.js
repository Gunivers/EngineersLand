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

const $TagKey = Java.loadClass("net.minecraft.tags.TagKey");
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");

const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");

function convertBlockPos(pos) {
    return pos.x + ',' + pos.y + ',' + pos.z
}


BlockEvents.modification(event => {
    event.modify('tfmg:oil_deposit', block => {
        block.hasCollision = false;
        block.destroySpeed = 0
        block.explosionResistance = 0
        //block.requiredTool = false;

        let tag = $TagKey.create($Registries.BLOCK, $ResourceLocation.fromNamespaceAndPath("kubejs", "oil_replaced"));
        block.randomTickCallback = (tick) => {
            // console.log("Ticking: " + tick.block)
            let level = tick.getLevel()
            let server = tick.getServer()
            let up = new BlockPos(tick.block.pos.x, tick.block.pos.y + 1, tick.block.pos.z);
            let to_check = [convertBlockPos(up)];
            let where_changed = false;

            let visited = []
            // console.log(tag)

            while (to_check.length > 0) {
                let poss = to_check.shift();
                let posa = poss.split(',').map(Number)
                let pos = new BlockPos(posa[0], posa[1], posa[2])

                // console.log("include " + poss)
                // console.log(posa)
                // console.log(pos)
                // console.log(to_check.join(' | '))

                if (visited.includes(poss)) continue;

                let block = level.getBlockState(pos)
                let fluid = level.getFluidState(pos)
                // console.log(block + " " + fluid)

                // if (block.toString().includes("tfmg:crude_oil") || fluid.is(tag)) {
                if (block.is(tag) || fluid.is(tag)) {
                    where_changed = true;
                    // level.setBlock(up, Block.id("minecraft:emerald_block"), 1)
                    level.setBlockAndUpdate(pos, Block.id("kubejs:cloud"));

                    // console.log("detected !")
                    to_check.push(pos.x + ',' + (pos.y + 1) + ',' + pos.z)
                    to_check.push(pos.x + ',' + (pos.y - 1) + ',' + pos.z)
                    to_check.push((pos.x + 1) + ',' + pos.y + ',' + pos.z)
                    to_check.push((pos.x - 1) + ',' + pos.y + ',' + pos.z)
                    to_check.push(pos.x + ',' + pos.y + ',' + (pos.z + 1))
                    to_check.push(pos.x + ',' + pos.y + ',' + (pos.z - 1))
                }
                visited.push(poss);
            };

            if (where_changed) {
                // let placedFeature = $BuiltInRegistries.FEATURE.get($ResourceLocation.fromNamespaceAndPath("tfmg", "oil_deposit"));

                // // Place the feature at the given position
                // if (placedFeature != null) {
                //     placedFeature.place(level, level.getChunkSource().getGenerator(), level.getRandom(), tick.block.pos);
                // }
                // console.log("done")
            }

        }
    })
})
