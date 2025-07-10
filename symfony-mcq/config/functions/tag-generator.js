const items = $input.all();

// Récupérer la date du jour
const now = new Date();
const year = String(now.getFullYear()).substring(2, 4);
const month = now.getMonth() + 1;
const day = now.getDate();
const baseTag = `v${year}.${month}.${day}`;

console.log(year);

// Extraire les noms de tags valides depuis l'input
const tags = items.flatMap(item => {
  const name = item.json?.tag_name;
  return typeof name === 'string' ? [name.trim()] : [];
});

// Filtrer les tags du jour
const todayTags = tags.filter(tag => tag.startsWith(baseTag));

// Extraire les incréments (`vYY.MM.DD.X`)
const increments = todayTags.map(tag => {
  // Match le suffixe ".X" uniquement
  const match = tag.match(/^v\d{2}.\d{2}.\d{2}(?:\.(\d+))?$/);
  if (match) {
    return match[1] !== undefined ? parseInt(match[1], 10) : 0;
  }
  return null;
}).filter(n => n !== null);

// Calcul du prochain tag
const nextIncrement = increments.length > 0 ? Math.max(...increments) + 1 : 0;
const nextTag = nextIncrement === 0 ? baseTag : `${baseTag}-${nextIncrement}`;

// Retour au format n8n
return [{
  json: {
    tag: nextTag,
    baseTag,
    todayTags,
    increments,
  }
}];
