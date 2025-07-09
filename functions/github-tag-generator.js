const items = $input.all();

// Récupérer la date du jour
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const baseTag = `v${year}-${month}-${day}`;

// Extraire les noms de tags valides depuis l'input
const tags = items.flatMap(item => {
  const name = item.json?.tag_name;
  return typeof name === 'string' ? [name.trim()] : [];
});

// Filtrer les tags du jour
const todayTags = tags.filter(tag => tag.startsWith(baseTag));

// Extraire les incréments (`vYYYY-MM-DD.X`)
const increments = todayTags.map(tag => {
  // Match le suffixe ".X" uniquement
  const match = tag.match(/^v\d{4}-\d{2}-\d{2}(?:\.(\d+))?$/);
  if (match) {
    return match[1] !== undefined ? parseInt(match[1], 10) : 0;
  }
  return null;
}).filter(n => n !== null);

// Calcul du prochain tag
const nextIncrement = increments.length > 0 ? Math.max(...increments) + 1 : 0;
const nextTag = nextIncrement === 0 ? baseTag : `${baseTag}.${nextIncrement}`;

// Retour au format n8n
return [{
  json: {
    tag: nextTag,
    baseTag,
    todayTags,
    increments,
  }
}];
