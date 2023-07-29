export const cityLayout = (ref, name) => (
  `
    <button type="button" class="city-item" data-key="${name}" data-ref="${ref}">
      ${name}
    </button>
  `
);

export const countryLayout = (key, name) => (
  `
    <button type="button" class="country-item" data-key="${key}">
      ${name}
    </button>
  `
);

export const cityStatLayout = ({ name, stats }) => (
  `
    <div class="screen city-stats"></div>
  `
);
