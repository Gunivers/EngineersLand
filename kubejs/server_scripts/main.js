// Visit the wiki for more info - https://kubejs.com/
console.info('Hello, World! (Loaded server example script)')

// Listen to the block tag event
ServerEvents.tags('block', event => {

    event.remove('minecraft:infiniburn_overworld', 'tfmg:oil_deposit')
    event.remove('minecraft:dragon_immune', 'tfmg:oil_deposit')
    event.remove('minecraft:infiniburn_end', 'tfmg:oil_deposit')
    event.remove('minecraft:infiniburn_nether', 'tfmg:oil_deposit')
    event.remove('minecraft:lava_pool_stone_cannot_replace', 'tfmg:oil_deposit')
    event.remove('minecraft:mineable/pickaxe', 'tfmg:oil_deposit')
    event.remove('nova_structures:explosion_resistand', 'tfmg:oil_deposit')
    event.remove('minecraft:wither_immune', 'tfmg:oil_deposit')
    event.remove('minecraft:features_cannot_replace', 'tfmg:oil_deposit')

    //event.add('simulated:non_movable', 'tfmg:oil_deposit')
    event.add('create:non_movable', 'tfmg:oil_deposit')

    //event.add('simulated:non_movable', 'kubejs:cloud')
    event.add('create:non_movable', 'kubejs:cloud')


    event.add('kubejs:oil_replaced', 'tfmg:fossilstone')
    event.add('kubejs:oil_replaced', 'tfmg:crude_oil')
})

ServerEvents.tags('fluid', event => {

    event.removeAllTagsFrom('createbigcannons:molten_steel')
    event.add('kubejs:removed', 'createbigcannons:molten_steel')

    event.add('kubejs:oil_replaced', 'tfmg:crude_oil')

})

ServerEvents.tags('item', event => {


    // ------------------------- UNIFICATION -------------------------
    // Steel

    const other_steel = [
        'createnuclear:steel_ingot', 'createbigcannons:steel_ingot', // ingots
        'createnuclear:steel_nugget', 'createbigcannons:steel_scrap', // nuggets
        'createnuclear:steel_block', 'createbigcannons:steel_block', // blocks
        'createbigcannons:molten_steel_bucket'
    ]

    other_steel.forEach(i => {
        event.removeAllTagsFrom(i)
        event.add('kubejs:removed', i)
    })

    event.add('kubejs:steel_block', 'createnuclear:steel_block')
    event.add('kubejs:steel_block', 'createbigcannons:steel_block')
    event.add('kubejs:steel_block', 'tfmg:steel_block')


    // Molten cast iron

    const other_cast = [
        'createbigcannons:cast_iron_ingot',
        'createbigcannons:cast_iron_nugget',
        'createbigcannons:cast_iron_block'
    ]

    other_cast.forEach(i => {
        event.removeAllTagsFrom(i)
        event.add('kubejs:removed', i)
    })

    event.add('kubejs:cast_iron_block', 'createbigcannons:cast_iron_block')
    event.add('kubejs:cast_iron_block', 'tfmg:cast_iron_block')

    // Lead

    const other_lead = [
        'createnuclear:lead_ingot',
        'createnuclear:raw_lead',
        'createnuclear:lead_ore',
        'createnuclear:deepslate_lead_ore',
        'createnuclear:lead_block',
        'createnuclear:lead_nugget'
    ]

    other_lead.forEach(i => {
        event.removeAllTagsFrom(i)
        event.add('kubejs:removed', i)
    })

    event.add('kubejs:lead_block', 'createnuclear:lead_block')
    event.add('kubejs:lead_block', 'tfmg:lead_block')


    // Other

    event.removeAllTagsFrom('tfmg:copper_wire')
    event.add('kubejs:removed', 'tfmg:copper_wire')
})

// Listen for the "recipes" server event.
ServerEvents.recipes(event => {
    // ------------------------- UNIFICATION -------------------------
    // Steel


    const steel_to_remove = [
        'createbigcannons:mixing/alloy_steel',
        'createbigcannons:compacting/forge_steel_ingot',
        'createbigcannons:compacting/forge_steel_block',
        'createbigcannons:compacting/forge_steel_nugget',
        'createbigcannons:steel_ingot_from_block',
        'createbigcannons:steel_scrap',

        'createnuclear:mixing/steel',
        'createnuclear:crafting/crafting/steel_ingot_from_decompacting',
        'createnuclear:crafting/steel_ingot_from_decompacting',
        'createnuclear:crafting/crafting/steel_nuget_from_decompacting',
        'createnuclear:crafting/steel_nuget_from_decompacting',

    ]

    steel_to_remove.forEach(r => {
        event.remove({ id: r })
    })

    event.remove([{ output: 'createbigcannons:molten_steel' }, { input: 'createbigcannons:molten_steel' }])


    event.stonecutting('createnuclear:steel_block', '#kubejs:steel_block')
    event.stonecutting('createbigcannons:steel_block', '#kubejs:steel_block')
    event.stonecutting('tfmg:steel_block', '#kubejs:steel_block')

    // Molten cast iron

    const iron_cast_to_remove = [

        'createbigcannons:compacting/forge_cast_iron_ingot',
        'createbigcannons:compacting/forge_cast_iron_block',
        'createbigcannons:compacting/forge_cast_iron_nugget',

        'createbigcannons:compacting/iron_to_cast_iron_ingot',

        'createbigcannons:cast_iron_ingot_from_block',
        'createbigcannons:cast_iron_nugget',
    ]

    iron_cast_to_remove.forEach(r => {
        event.remove({ id: r })
    })

    event.stonecutting('createbigcannons:cast_iron_block', '#kubejs:cast_iron_block')
    event.stonecutting('tfmg:cast_iron_block', '#kubejs:cast_iron_block')


    // Lead

    const lead_to_remove = [

    ]

    lead_to_remove.forEach(r => {
        event.remove({ id: r })
    })

    event.stonecutting('createnuclear:lead_block', '#kubejs:lead_block')
    event.stonecutting('tfmg:lead_block', '#kubejs:lead_block')

    // Other

    event.remove({ id: 'tfmg:copper_wire_from_ingots_copper_stonecutting' })


    // ------------------------- CONFLICTS -------------------------

    // Wire copper simple radio
    event.remove({ id: 'simpleradio:copper_wire' })
    event.shapeless(
        Item.of('simpleradio:copper_wire', 1),
        [
            '2x #c:wires/copper'
        ]
    )


    // Additions

    event.custom({
        "type": "tfmg:vat_machine_recipe",
        "allowed_vat_types": [
            "tfmg:cast_iron_vat",
            "tfmg:steel_vat",
            "tfmg:firebrick_lined_vat"
        ],
        "heat_level": 2,
        "ingredients": [
            {
                "type": "neoforge:single",
                "amount": 500,
                "fluid": "tfmg:carbon_dioxide"
            }
        ],
        "machines": [
            "tfmg:mixing"
        ],
        "min_size": 1,
        "results": [
            {
                "amount": 1,
                "id": "kubejs:cloud"
            }
        ]
    })

})