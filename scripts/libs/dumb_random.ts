/* ### Dumb randomizer by `lilunderduck`, licenced under MIT.
 * 
 * A randomizer, but not... random, predictable random*.
 * 
 * What does it do?
 * - Just a good old css class name obfuscation, instead of random combination of character 
 *   (which is boring), it generates (almost) a full sentence, also to confuse someone 
 *   who reading the source code.
 * 
 * What you shouldn't use
 * - Password hashing
 * - Password randomizer
 * - Basically anything related to password, and encryption, and banks, and anything that needs 
 *   true random, you should **use a bunch of lava lamps** as the source of true randomness 
 *   instead of this
 * - Does not count for production, it's just a "workaround"
 * 
 * Lovely!
 */
// ...

const splitAndClean = (something: string) => something
  .toLowerCase()
  .replaceAll("\n", "")
  // ultra specific case, do not touch
  .replaceAll(".", "_dot_")
  .replaceAll(/'|"|\?|-/gm, "")
  .replaceAll(/,|\:|\(|\)|\;|@/gm, "_")
  .split(" ")
// ...

/**The default source set for `createWordSlidingRandomizer()` function to generate some names.
 * 
 * The sources are adapted from: 
 * - [`The missle knows where it is at all times`](https://copypastatext.com/the-missile-knows-where-it-is/)
 * - [`Neoforge's Registries for 1.21.1`](https://docs.neoforged.net/docs/concepts/registries/)
 * - [`Neoforge's Events for 1.21.1`](https://docs.neoforged.net/docs/1.21.1/concepts/events/#event-buses)
 * 
 * @see {@link createWordSlidingRandomizer()}
 */
const CHARSET_FOR_RANDOM_STR = `
The missile knows where it is at all times. It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is (whichever is greater), it obtains a difference, or deviation. The guidance subsystem uses deviations to generate corrective commands to drive the missile from a position where it is to a position where it isn't, and arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position that it was, is now the position that it isn't.

In the event that the position that it is in is not the position that it wasn't, the system has acquired a variation, the variation being the difference between where the missile is, and where it wasn't. If variation is considered to be a significant factor, it too may be corrected by the GEA. However, the missile must also know where it was.

The missile guidance computer scenario works as follows. Because a variation has modified some of the information the missile has obtained, it is not sure just where it is. However, it is sure where it isn't, within reason, and it knows where it was. It now subtracts where it should be from where it wasn't, or vice-versa, and by differentiating this from the algebraic sum of where it shouldn't be, and where it was, it is able to obtain the deviation and its variation, which is called error.


Registration is the process of taking the objects of a mod (such as items, blocks, entities, etc.) and making them known to the game. Registering things is important, as without registration the game will simply not know about these objects, which will cause unexplainable behaviors and crashes.

A registry is, simply put, a wrapper around a map that maps registry names (read on) to registered objects, often called registry entries. Registry names must be unique within the same registry, but the same registry name may be present in multiple registries. The most common example for this are blocks (in the BLOCKS registry) that have an item form with the same registry name (in the ITEMS registry).

Every registered object has a unique name, called its registry name. The name is represented as an Identifier. For example, the registry name of the dirt block is minecraft:dirt, and the registry name of the zombie is minecraft:zombie. Modded objects will of course not use the minecraft namespace; their mod id will be used instead.

Custom registries allow you to specify additional systems that addon mods for your mod may want to plug into. For example, if your mod were to add spells, you could make the spells a registry and thus allow other mods to add spells to your mod, without you having to do anything else. It also allows you to do some things, such as syncing the entries, automatically.


While most events are posted on the NeoForge.EVENT_BUS, some events are posted on the mod event bus instead. These are generally called mod bus events. Mod bus events can be distinguished from regular events by their superinterface IModBusEvent.
`

export type AnyRandomizerFn = /* roll */(length: number) => string

/**A factory function that generate an (almost) sensical sentence, but will be cut 
 * off by no reason.
 * 
 * When generating a new name, what it will do is **(nerdy alert)**:
 * - Grab some words offsetted by `nextIndex`, the amount of words it grabbed is controlled by 
 *   the provided `length` parameter in the `roll()` function returned by this factory function.
 * - Increase `nextIndex` so next time, you can grab a different word.
 * - If the generated word is already generated, it will try to generated a different name
 *   but longer, `length + 1` to be exact
 * 
 * @example
 * ```
 * // not really a randomizer to be honest
 * const randomizer = createWordSlidingRandomizer()
 * console.log(randomizer(6))
 * // the_missile_knows_where_it
 * console.log(randomizer(6))
 * // at_all_times_dot_it_knows_this
 * ```
 * @param source any source you want, default is `CHARSET_FOR_RANDOM_STR`
 * @returns 
 * @see {@link CHARSET_FOR_RANDOM_STR} - default random set.
 * @see {@link splitAndClean()} - utility function to clean up the source set.
 */
export function createWordSlidingRandomizer(source: string[] = splitAndClean(CHARSET_FOR_RANDOM_STR)): AnyRandomizerFn {
  const generated = new Set<string>()
  let nextIndex = 0
  return function roll(length) {
    let randomPrefix: string[] = []

    for (let i = 0; i < length; i++) {
      randomPrefix.push(source[nextIndex + i])
    }

    const rolled = randomPrefix.join("_")
    if (generated.has(rolled)) { // if found duplicate
      return roll(length + 1) // reroll with increased length
    }

    generated.add(rolled)
    nextIndex += length - 1
    return rolled
  }
}

/**A factory function that generate only a single word with the provided source set.
 * 
 * Unlike {@link createWordSlidingRandomizer()}, it only generates a single word name, unless it
 * found no duplicated name generated.
 * @param source any source you want, default is `CHARSET_FOR_RANDOM_STR`
 * @returns 
 * @see {@link CHARSET_FOR_RANDOM_STR} - default random set.
 * @see {@link splitAndClean()} - utility function to clean up the source set.
 */
export function createAtomicRandomizer(
  source: string[] = splitAndClean(CHARSET_FOR_RANDOM_STR)
): AnyRandomizerFn {
  const generated = new Set<string>()
  let currentWordIndex = 0
  let randomPrefix: string[] = []
  let wordLength = 1
  return function roll(length) {
    length = wordLength
    randomPrefix.push(source[currentWordIndex])

    const rolled = randomPrefix.join("_")
    if (generated.has(rolled)) { // if found duplicate
      currentWordIndex += 1
      return roll(length)
    }

    generated.add(rolled)
    currentWordIndex += 1
    randomPrefix = []
    return rolled
  }
}