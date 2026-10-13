/**Dumb randomizer by lilunderduck, licenced under MIT
 * 
 * What does it do?
 * - Just a good old css class name obfuscation, instead of random character, it generates
 * (almost) a full sentence, also to confuse someone who reading the source code
 * 
 * What you shouldn't use
 * - Password hashing
 * - Password randomizer
 * - Basically anything related to password, and encryption, and stuff
 * - Well, it uses Math.random(), and that is presudo-random
 * - Does not count for production, it's just a "workaround"
 * 
 * Default source sets are adapted from: 
 *   https://copypastatext.com/the-missile-knows-where-it-is/
 *   https://docs.neoforged.net/docs/concepts/registries/
 *   https://docs.neoforged.net/docs/1.21.1/concepts/events/#event-buses
 *   https://docs.fabricmc.net/develop/items/food
 * 
 * Did test it, and I love the cursed combination of my randomizer 
 *   header.it_is_not_sure -> 
 *   main.where_it_is__is -> (not mentioned what 'is'... is) 
 *   ul.know_about_these_objects_ -> 
 *   li.position_where_it_is_ ->
 *   div.being_the_difference_between -> (between [not mentioned]) 
 *   div.and_where_it_wasn_t_
 * 
 * Lovely!
 */
// ...

const splitAndClean = (something: string) => something
  .toLowerCase()
  .replaceAll("\n", "")
  .replaceAll(/,|\.|\:|\(|\)|\;|@|-|'|"|\?/gm, "_")
  .split(" ")
// ...

const getRandomNumberInclusive = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min
// ...

const CHARSET_FOR_RANDOM_STR = splitAndClean(`
The missile knows where it is at all times. It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is (whichever is greater), it obtains a difference, or deviation. The guidance subsystem uses deviations to generate corrective commands to drive the missile from a position where it is to a position where it isn't, and arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position that it was, is now the position that it isn't.

In the event that the position that it is in is not the position that it wasn't, the system has acquired a variation, the variation being the difference between where the missile is, and where it wasn't. If variation is considered to be a significant factor, it too may be corrected by the GEA. However, the missile must also know where it was.

The missile guidance computer scenario works as follows. Because a variation has modified some of the information the missile has obtained, it is not sure just where it is. However, it is sure where it isn't, within reason, and it knows where it was. It now subtracts where it should be from where it wasn't, or vice-versa, and by differentiating this from the algebraic sum of where it shouldn't be, and where it was, it is able to obtain the deviation and its variation, which is called error.


Registration is the process of taking the objects of a mod (such as items, blocks, entities, etc.) and making them known to the game. Registering things is important, as without registration the game will simply not know about these objects, which will cause unexplainable behaviors and crashes.


While most events are posted on the NeoForge.EVENT_BUS, some events are posted on the mod event bus instead. These are generally called mod bus events. Mod bus events can be distinguished from regular events by their superinterface IModBusEvent.


Food is a core aspect of survival Minecraft, so when creating edible items you have to consider the food's usage with other edible items.

Unless you're making a mod with overpowered items, you should consider:
- How much hunger your edible item adds or removes.
- What potion effect(s) does it grant?
- Is it early-game or endgame accessible?
`)

export function createRandomizer(source = CHARSET_FOR_RANDOM_STR) {
  const generated = new Set<string>()
  return function roll(length: number): string {
    let randomPrefix: string[] = []

    const grabbedIndex = getRandomNumberInclusive(0, source.length - length)
    for (let i = 0; i < length; i++) {
      randomPrefix.push(source[grabbedIndex + i])
    }

    const rolled = randomPrefix.join("_")
    if (generated.has(rolled)) { // if found duplicate
      return roll(length) // reroll
    }

    generated.add(rolled)
    return rolled
  }
}