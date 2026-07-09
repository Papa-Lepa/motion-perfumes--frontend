// frontend/src/data/productImages.js
//
// The database only stores name/price/notes — not image files — so every
// page that shows perfumes looks up the matching local image by exact name
// here. If you add a new perfume in the database, add its image import +
// a matching entry here too, or it'll render with no image.

import dior from "../images/dior.png";
import bleu from "../images/bleu.png";
import versace from "../images/versace.png";
import blackopium from "../images/blackopium.png";
import tomford from "../images/tomford.png";
import coco from "../images/coco.png";
import gucci from "../images/gucci.png";
import baccarat from "../images/baccarat.png";

const IMAGE_BY_NAME = {
  "Dior Sauvage": dior,
  "Bleu de Chanel": bleu,
  "Versace Eros": versace,
  "YSL Black Opium": blackopium,
  "Tom Ford Oud Wood": tomford,
  "Chanel Coco Mademoiselle": coco,
  "Gucci Bloom": gucci,
  "Baccarat Rouge 540": baccarat,
};

export default IMAGE_BY_NAME;
