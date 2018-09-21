import _ from "lodash";

const bodySVG = require.context("../../assets/images/avatar_asset/00_body/", true, /^\.\/.*\.svg$/);
const eyesSVG = require.context("../../assets/images/avatar_asset/01_eyes/", true, /^\.\/.*\.svg$/);
const eyebrowsSVG = require.context("../../assets/images/avatar_asset/02_eyebrows/", true, /^\.\/.*\.svg$/);
const nosesSVG = require.context("../../assets/images/avatar_asset/03_nose/", true, /^\.\/.*\.svg$/);
const mouthesSVG = require.context("../../assets/images/avatar_asset/04_mouth/", true, /^\.\/.*\.svg$/);
const beardsSVG = require.context("../../assets/images/avatar_asset/05_beards/", true, /^\.\/.*\.svg$/);
const accessoriesSVG = require.context("../../assets/images/avatar_asset/06_accessories/", true, /^\.\/.*\.svg$/);
const clothesSVG = require.context("../../assets/images/avatar_asset/07_clothes/", true, /^\.\/.*\.svg$/);
const hairSVG = require.context("../../assets/images/avatar_asset/08_hair/", true, /^\.\/.*\.svg$/);

export const male_asset = {
    body: [
        { name: "Mokko", src: "body_dark_skin_1" },
        { name: "Сappuccino", src: "body_medium_skin_1" },
        { name: "Latte", src: "body_light_skin_1" }
    ],
    eyes: [
        { name: "Curious dotes", src: "eyes_01" },
        { name: "Skeptical", src: "eyes_02" },
        { name: "After reading your code", src: "eyes_03" }
    ],
    eyebrows: [
        { name: "Rock Lee (Naruto)", src: "eyebrows_01_black" },
        { name: "Two fluffy dark slugs", src: "eyebrows_02_black" },
        { name: "Two dark kittens", src: "eyebrows_03_black" },
        { name: "Zushi", src: "eyebrows_01_brown" },
        { name: "A couple of furry slugs", src: "eyebrows_02_brown" },
        { name: "A fluffy couple", src: "eyebrows_03_brown" },
        { name: "Non-anime thick brows", src: "eyebrows_01_red" },
        { name: "The bushy red slugs", src: "eyebrows_02_red" },
        { name: "The resting felines", src: "eyebrows_03_red" },
        { name: "Shion Koga", src: "eyebrows_01_blonde" },
        { name: "A pair of fuzzy slugs", src: "eyebrows_02_blonde" },
        { name: "A pair of long cats", src: "eyebrows_03_blonde" }
    ],
    nose: [{ name: "An eagle", src: "nose_01" }, { name: "Mediocrity", src: "nose_02" }, { name: "Bulb", src: "nose_03" }],
    mouth: [
        { name: "Super Mario", src: "mouth_01" },
        { name: "One Punch Man", src: "mouth_02" },
        { name: "Sonic the Hedgehog", src: "mouth_03" }
    ],
    beard: [
        { name: "After barbershop", src: "beard_01_black" },
        { name: "Charismatic asshole", src: "beard_02_black" },
        { name: "Ghost-beard", src: "beard_03_black" },
        { name: "Hipsta", src: "beard_01_brown" },
        { name: "Charming prick", src: "beard_02_brown" },
        { name: "Brown almost beard", src: "beard_03_brown" },
        { name: "Hot goatee owner", src: "beard_01_red" },
        { name: "Leprechaun", src: "beard_02_red" },
        { name: "Hot ginger stubble", src: "beard_03_red" },
        { name: "Woodcutter-codewriter", src: "beard_01_blonde" },
        { name: "Devilishly handsome", src: "beard_02_blonde" },
        { name: "Blond designer stubble", src: "beard_03_blonde" },
        { name: "Clean-shaven", src: null }
    ],
    accessories: [{ name: "Four-eyed", src: "access_01" }, { name: "Fancy one here", src: "access_02" }],
    hair: [
        { name: "Elvis Presley", src: "hair_01_black" },
        { name: "No time for haircut", src: "hair_02_black" },
        { name: "Dark asymmetry", src: "hair_03_black" },
        { name: "Dark square head", src: "hair_04_black" },
        { name: "Brown old-fashioned", src: "hair_01_brown" },
        { name: "Too lazy for haircut", src: "hair_02_brown" },
        { name: "Messy medium brown", src: "hair_03_brown" },
        { name: "Two-legged headcrab", src: "hair_04_brown" },
        { name: "Ginger classic look", src: "hair_01_red" },
        { name: "Not a bug... a feature!", src: "hair_02_red" },
        { name: "Autumn fallen leaf", src: "hair_03_red" },
        { name: "Brutal red head", src: "hair_04_red" },
        { name: "Blond pompadour", src: "hair_01_blonde" },
        { name: "No money for haircut", src: "hair_02_blonde" },
        { name: "Blond freestyle", src: "hair_03_blonde" },
        { name: "Blond flat surface", src: "hair_04_blonde" },
        { name: "Bruce Willis", src: null }
    ],
    clothes: [
        { name: "Casual style", src: "clothes_01" },
        { name: "Noticeably neat shirt", src: "clothes_02" },
        { name: "Suspenders", src: "clothes_03" }
    ]
};

export const female_asset = {
    body: [
        { name: "Dark Chocolate", src: "body_dark_skin" },
        { name: "Milk Chocolate", src: "body_medium_skin" },
        { name: "White Chocolate", src: "body_light_skin" }
    ],
    eyes: [
        { name: "Before deadline", src: "eyes04" },
        { name: "At the start of deadline", src: "eyes05" },
        { name: "In the middle of deadline", src: "eyes06" },
        { name: "After deadline", src: "eyes07" }
    ],
    eyebrows: [
        { name: "Jasmine", src: "eyebrows04_black" },
        { name: "Tousled dark", src: "eyebrows05_black" },
        { name: "Esmeralda", src: "eyebrows06_black" },
        { name: "Pocahontas", src: "eyebrows07_black" },
        { name: "Moana", src: "eyebrows04_brown" },
        { name: "Ruffled brown", src: "eyebrows05_brown" },
        { name: "Miranda Lawson", src: "eyebrows06_brown" },
        { name: "Belle", src: "eyebrows07_brown" },
        { name: "Lilith", src: "eyebrows04_red" },
        { name: "Spiky ginger", src: "eyebrows05_red" },
        { name: "Aloy", src: "eyebrows06_red" },
        { name: "Merida", src: "eyebrows07_red" },
        { name: "Amy Dunne", src: "eyebrows04_blonde" },
        { name: "Mussed blond", src: "eyebrows05_blonde" },
        { name: "Rapunzel", src: "eyebrows06_blonde" },
        { name: "Kara Thrace", src: "eyebrows07_blonde" }
    ],
    nose: [
        { name: "A potato", src: "nose04" },
        { name: "Elegant", src: "nose05" },
        { name: "Turned-up", src: "nose06" },
        { name: "Snuffy", src: "nose07" }
    ],
    mouth: [
        { name: "Charming leader", src: "mouth04" },
        { name: "Hatching a plan", src: "mouth05" },
        { name: "Hot CEO", src: "mouth06" },
        { name: "Cheerful", src: "mouth07" }
    ],
    accessories: [
        { name: "Just a necklace", src: "accessories03" },
        { name: "Navy earrings", src: "accessories04" },
        { name: "Old fashion beads", src: "accessories05" },
        { name: "A stylish amulet", src: "accessories06" },
        { name: "Gothic earrings", src: "accessories07" },
        { name: "Super Star Tatoo", src: "tattoo01" }
    ],
    hair: [
        { name: "Sarah Silv erman", src: "hair05_black" },
        { name: "Pucca", src: "hair06_black" },
        { name: "Xena", src: "hair07_black" },
        { name: "Gothic", src: "hair08_black" },
        { name: "The vintage Barbie", src: "hair05_brown" },
        { name: "Cheburashka", src: "hair06_brown" },
        { name: "Francie Doll", src: "hair07_brown" },
        { name: "Neformal brown", src: "hair08_brown" },
        { name: "Back to 1950s", src: "hair05_red" },
        { name: "Cute ginger buns", src: "hair06_red" },
        { name: "Mary Jane Watson", src: "hair07_red" },
        { name: "Ginger star", src: "hair08_red" },
        { name: "Modern Barbie", src: "hair05_blonde" },
        { name: "Princess Leia Blond", src: "hair06_blonde" },
        { name: "Emma Stone", src: "hair07_blonde" },
        { name: "Bond non-conformist", src: "hair08_blonde" }
    ],
    clothes: [
        { name: "Wonk", src: "clothes04" },
        { name: "Dark mistress", src: "clothes05" },
        { name: "Second hand jamper", src: "clothes06" },
        { name: "Modern princess", src: "clothes07" }
    ]
};

export const other_asset = {
  body: male_asset.body.concat(female_asset.body),
  eyes: male_asset.eyes.concat(female_asset.eyes),
  eyebrows: male_asset.eyebrows.concat(female_asset.eyebrows),
  nose: male_asset.nose.concat(female_asset.nose),
  mouth: male_asset.mouth.concat(female_asset.mouth),
  beard: male_asset.beard,
  accessories: male_asset.accessories.concat(female_asset.accessories),
  hair: male_asset.hair.concat(female_asset.hair),
  clothes: male_asset.clothes.concat(female_asset.clothes),
};

export const generateMaleAvatar = () => {
    let have_beard = Boolean(Math.round(Math.random()));
    let have_accessories = Boolean(Math.round(Math.random()));
    let hair = _.sample(male_asset.hair);
    let beard = _.sample(male_asset.beard);
    return {
        body: bodySVG(`./${_.sample(male_asset.body).src}.svg`),
        eyes: eyesSVG(`./${_.sample(male_asset.eyes).src}.svg`),
        eyebrows: eyebrowsSVG(`./${_.sample(male_asset.eyebrows).src}.svg`),
        nose: nosesSVG(`./${_.sample(male_asset.nose).src}.svg`),
        mouth: mouthesSVG(`./${_.sample(male_asset.mouth).src}.svg`),
        beard: have_beard ? beard ? beardsSVG(`./${_.sample(male_asset.beard).src}.svg`) : null : null,
        accessories: have_accessories ? accessoriesSVG(`./${_.sample(male_asset.accessories).src}.svg`) : null,
        hair: hair ? hairSVG(`./${hair.src}.svg`) : null,
        clothes: clothesSVG(`./${_.sample(male_asset.clothes).src}.svg`)
    };
};

export const generateFemaleAvatar = () => {
    let have_accessories = Boolean(Math.round(Math.random()));

    return {
        body: bodySVG(`./${_.sample(female_asset.body).src}.svg`),
        eyes: eyesSVG(`./${_.sample(female_asset.eyes).src}.svg`),
        eyebrows: eyebrowsSVG(`./${_.sample(female_asset.eyebrows).src}.svg`),
        nose: nosesSVG(`./${_.sample(female_asset.nose).src}.svg`),
        mouth: mouthesSVG(`./${_.sample(female_asset.mouth).src}.svg`),
        accessories: have_accessories ? accessoriesSVG(`./${_.sample(female_asset.accessories).src}.svg`) : null,
        hair: hairSVG(`./${_.sample(female_asset.hair).src}.svg`),
        clothes: clothesSVG(`./${_.sample(female_asset.clothes).src}.svg`)
    };
};

export const customizeAvatar = (gender, body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes) => {
    if (gender === "male"){
      return {
        body: bodySVG(`./${male_asset.body[body].src}.svg`),
        eyes: eyesSVG(`./${male_asset.eyes[eyes].src}.svg`),
        eyebrows: eyebrowsSVG(`./${male_asset.eyebrows[eyebrows].src}.svg`),
        nose: nosesSVG(`./${male_asset.nose[nose].src}.svg`),
        mouth: mouthesSVG(`./${male_asset.mouth[mouth].src}.svg`),
        beard: beard ? male_asset.beard[beard].src ? beardsSVG(`./${male_asset.beard[beard].src}.svg`) : null : null,
        accessories: accessoriesSVG(`./${male_asset.accessories[accessories].src}.svg`),
        hair: male_asset.hair[hair].src ? hairSVG(`./${male_asset.hair[hair].src}.svg`) : null,
        clothes: clothesSVG(`./${male_asset.clothes[clothes].src}.svg`)
      };
    } else if (gender === "female"){
      return {
        body: bodySVG(`./${female_asset.body[body].src}.svg`),
        eyes: eyesSVG(`./${female_asset.eyes[eyes].src}.svg`),
        eyebrows: eyebrowsSVG(`./${female_asset.eyebrows[eyebrows].src}.svg`),
        nose: nosesSVG(`./${female_asset.nose[nose].src}.svg`),
        mouth: mouthesSVG(`./${female_asset.mouth[mouth].src}.svg`),
        beard: null,
        accessories: accessoriesSVG(`./${female_asset.accessories[accessories].src}.svg`),
        hair: female_asset.hair[hair].src ? hairSVG(`./${female_asset.hair[hair].src}.svg`) : null,
        clothes: clothesSVG(`./${female_asset.clothes[clothes].src}.svg`)
      };
    } else {
      return {
        body: bodySVG(`./${other_asset.body[body].src}.svg`),
        eyes: eyesSVG(`./${other_asset.eyes[eyes].src}.svg`),
        eyebrows: eyebrowsSVG(`./${other_asset.eyebrows[eyebrows].src}.svg`),
        nose: nosesSVG(`./${other_asset.nose[nose].src}.svg`),
        mouth: mouthesSVG(`./${other_asset.mouth[mouth].src}.svg`),
        beard: beard ? other_asset.beard[beard].src ? beardsSVG(`./${other_asset.beard[beard].src}.svg`) : null : null,
        accessories: accessoriesSVG(`./${other_asset.accessories[accessories].src}.svg`),
        hair: other_asset.hair[hair].src ? hairSVG(`./${other_asset.hair[hair].src}.svg`) : null,
        clothes: clothesSVG(`./${other_asset.clothes[clothes].src}.svg`)
      };
    }
  
};
