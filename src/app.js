import {
  ApisController,
  BookmarkController,
} from "./controllers/index.js";
import { countryOrCityLayout } from "./helpers/layouts.js";
import {
  $select,
  $attrib,
  $class,
  $text,
  $selectAll,
} from "./helpers/selectors.js";
import storage from "./helpers/storage.js";

const wrapUpCountrySelection = () => {
  switchTo('cities', 'current-nav-screen');
  toggleCrumb('content-nav');
};

/**
 *
 * @param { string } target
 */
const toggleStatus = (target) => {
  $class($select(`#${target} .${target}-wrapper`), 'hidden');
  $class($select(`#${target} .status`), 'hidden');
};

/**
 *
 * @param { HTMLElement } element
 */
const toggleNavItem = (element) => {
  $class($select('footer .nav-btn.active'), 'active');
  $class(element, 'active');
};

/**
 *
 * @param { HTMLElement } crumbLink
 * @param { boolean|undefined } force
 */
const toggleCrumbActivation = (crumbLink, force) => {
  if (crumbLink.tagName === 'BUTTON') {
    $class(crumbLink, 'active', force);
  }
};

/**
 *
 * @param { string } target
 */
const toggleCrumb = (target) => {
  if (target === 'home') {
    $selectAll('.crumb[data-target]').forEach(link => {
      $class(link, 'hidden', true);
      toggleCrumbActivation(link, false);
    });
  } else {
    const newTarget = $select(`#${target} .current-nav-screen`).id;
    if (newTarget === 'cities') {
      $selectAll('.crumb[data-target]').forEach(link => {
        const key = $attrib(link, 'data-target');
        const force = key === newTarget ? true : false;
        $class(link, 'hidden', false);
        toggleCrumbActivation(link, force);
      });
    } else {
      $selectAll(`.crumb[data-target="cities"]`).forEach(link => {
        $class(link, 'hidden', true);
        toggleCrumbActivation(link, false);
      });
      $selectAll(`.crumb[data-target="${newTarget}"]`).forEach(link => {
        $class(link, 'hidden', false);
        toggleCrumbActivation(link, true);
      });
    }
  }
};

/**
 *
 * @param { string } target
 * @param { Boolean? } flag
 */
const flagPopulating = (target, flag) => {
  toggleStatus(target);
  storage.loading = flag;
};

/**
 *
 * @param { string } filter
 * @param { string } targetClass
 */
const filterAny = (filter, targetClass) => {
  if (!filter) {
    $selectAll(`.${targetClass}.hidden`).forEach(element => { $class(element, 'hidden') })
  } else {
    $selectAll(`.${targetClass}:not([data-filter*="${filter}"])`)
      .forEach(element => { $class(element, 'hidden', true) });
    $selectAll(`.${targetClass}[data-filter*="${filter}"]`)
      .forEach(element => { $class(element, 'hidden', false) });
  }
};

/**
 *
 * @param { string } name
 * @param { string } targetClass
 */
const switchTo = (name, targetClass) => {
  $class($select(`.${targetClass}`), targetClass, false);
  $class($select(`#${name}`), targetClass, true);
};

/**
 *
 * @param { HTMLElement } container
 * @param { Function } listener
 */
const unbindCountryOrCities = (container, listener) => {
  Array.from(container.children).forEach(child => {
    child.removeEventListener('click', listener);
    child.remove();
  })
};

/**
 *
 * @param { HTMLElement } container
 * @param { Object[] } data
 * @param { Object } meta
 */
const bindCountryOrCities = (container, list, meta) => {
  const { className, render, listener } = meta;
  list.forEach(name => {
    const element = render(name, className);
    element.addEventListener('click', listener);
    container.appendChild(element);
  });
};

const populateCountries = () => {
  flagPopulating('countries', true);

  const container = $select('.countries-list');
  unbindCountryOrCities(container, handleCountrySelection);

  ApisController
    .getCountries()
    .then(countries => {
      bindCountryOrCities(container, countries, {
        render: countryOrCityLayout,
        listener: handleCountrySelection,
        className: 'country-item',
      })
    })
    .catch(() => { })
    .finally(() => { flagPopulating('countries') });
};

/**
 *
 * @param { string } country
 */
const populateCities = (country) => {
  if (storage.selectedCountry !== country) {
    flagPopulating('cities', true);

    const container = $select('.cities-list');
    unbindCountryOrCities(container, handleCitySelection);

    ApisController
      .getCities(country)
      .then(cities => {
        bindCountryOrCities(container, cities, {
          render: countryOrCityLayout,
          listener: handleCitySelection,
          className: 'city-item',
        })
      })
      .catch(() => { })
      .finally(() => { flagPopulating('cities') });
  }
};

/**
 *
 * @param { string } cityName
 */
const showStats = (cityName) => {
  toggleStatus('home');
  ApisController.getStats(cityName).then(stats => {
    const {
      location: { name, region, country, localtime },
      current: {
        temp_c, condition: { text, icon },
        wind_dir, wind_degree, humidity,
      },

    } = stats;

    const iconSlices = icon.split('/');
    const radical = iconSlices.slice(iconSlices.length - 2).join('/');

    $text($select('.home-head h3'), `${name} weather stats`);
    $text($select('.home-head span'), `${region}, ${country}`);

    $text($select('#temperature h5'), text);
    $text($select('#temperature span'), `${temp_c}℃`);
    $attrib($select('#temperature img'), 'src', `./src/assets/icons/${radical}`);

    $text($select('#humidity span'), humidity.toString());
    $text($select('#wind-degree span'), wind_degree.toString());
    $text($select('#wind-dir span'), wind_dir);
    $text($select('#localtime span'), localtime);
  })
    .catch(() => { })
    .finally(() => { toggleStatus('home') });
};

const loadBookmarks = () => {
  const [cityName,] = BookmarkController.getBookmarks();
  showStats(cityName);
};

function handleCitySelection() {
  if (storage.loading) return;

  const previous = $select('.city-item.active');
  if (previous) $class(previous, 'active');

  $class(this, 'active');
  switchTo('home', 'current-screen');
  toggleNavItem($select('footer .nav-btn[data-target="home"]'));
  toggleCrumb('home');
  showStats($attrib(this, 'data-key'));
}

function handleCountrySelection() {
  if (storage.loading) return;

  const previous = $select('.country-item.active');
  if (previous) {
    if (previous === this && storage.cities) return wrapUpCountrySelection();

    $class(previous, 'active');
  }
  $class(this, 'active');
  wrapUpCountrySelection();
  populateCities($attrib(this, 'data-key'));
}

function onChangeScreen() {
  const target = $attrib(this, 'data-target');

  toggleNavItem(this);
  toggleCrumb(target);
  switchTo(target, 'current-screen');
}

function handleFilterChange() {
  filterAny(this.value.toLowerCase(), $attrib(this, 'data-target'));
}

function handleCrumbLinkSelection() {
  const target = $attrib(this, 'data-target');
  switchTo(target, 'current-nav-screen');
  toggleCrumb('content-nav')
}

export const onStartup = () => {
  $selectAll('footer .nav-btn').forEach(navElement => {
    navElement.addEventListener('click', onChangeScreen);
  });
  $selectAll('.search-field').forEach(field => {
    field.addEventListener('input', handleFilterChange);
  });
  $selectAll('.crumb').forEach(crumbLink => {
    crumbLink.addEventListener('click', handleCrumbLinkSelection);
  });
  loadBookmarks();
  populateCountries();
};
