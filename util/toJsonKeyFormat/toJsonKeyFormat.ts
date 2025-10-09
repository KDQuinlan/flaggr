const toJsonKeyFormat = (name: string): string => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
};

export default toJsonKeyFormat;
