/**
 * List of image files names available as puzzle image
 * @type {string[]}
 */
export const imageList = [
    'cliff-cove.jpg',
    'creek-hike.jpg',
    'dog-field.jpg',
    'dublin-library.jpg',
    'elephants.jpg',
    'fruit-basket.jpg',
    'hill-city-sea.jpg',
    'inside-wood-cabin.jpg',
    'irish-scene-ruin-field.jpg',
    'mountain-beach-creek.jpg',
    'mountain-lake.jpg',
    'night-city.jpg',
    'old-building-court.jpg',
    'old-phone-stamps.jpg',
    'river-cliffs.jpg',
    'rock-sea-flowers.jpg',
    'rocky-desert.jpg',
    'seals-rock.jpg',
    'subway.jpg',
    'temple-bar.jpg',
    'tiger.jpg',
    'tropical-mangrove.jpg',
    'walk-bridge-forest.jpg',
    'waterfall-pond.jpg',
    'wood-stairs-outdoor.jpg',
];

/**
 * Selects a random puzzle image filename
 * @param {string[]} [exclude] optional list of files to exclude from the list of available images
 * @returns {string} filename of a image file
 */
export const pickRandomImage = (exclude = []) => {
    const subList = imageList.filter(img => !exclude.includes(img));
    return subList[Math.floor(Math.random() * subList.length)];
}