import {
  ApisController,
  BookmarkController,
} from "./controllers/index.js";
import { countryLayout } from "./helpers/layouts.js";
import { $select, $attrib, $class, $html, $text, $selectAll } from "./helpers/selectors.js";

/**
 *
 * @param { string } name
 */
const switchTo = (name) => {
  $class($select('.current-screen'), 'current-screen', false);
  $class($select(`#${name}`), 'current-screen', true);
};

const populateCountries = (countries) => {
  const html = countries.map(({ key, name }) => countryLayout(key, name));
  $html($select('#countries'), html.join(''));
};

const showStats = (cityName) => {
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
    const temperatureImage = $select('#temperature img');

    $attrib(temperatureImage, 'src', `./assets/icons/${radical}`);
    $class(temperatureImage, 'hidden');

    $text($select('.home-head h3'), `${name} weather stats`);
    $text($select('.home-head span'), `${region}, ${country}`);
    $text($select('#temperature h5'), text);
    $text($select('#temperature span'), `${temp_c}℃`);
    $attrib($select('#temperature img'), 'src');
    $text($select('#humidity span'), humidity);
    $text($select('#wind-degree span'), wind_degree);
    $text($select('#wind-dir span'), wind_dir);
    $text($select('#localtime span'), localtime);
  }).catch(() => {});
};

const loadBookmarks = () => {
  const [ cityName, ] = BookmarkController.getBookmarks();
  showStats(cityName);
};

function onSelectCity () {
  showStats($attrib(this, 'data-key'))
}

function onChangeScreen() {
  $class($select('footer .nav-btn.active'), 'active');
  $class(this, 'active');
  switchTo($attrib(this, 'data-target'));
}

export const onStartup = () => {
  $selectAll('footer .nav-btn').forEach(navElement => {
    navElement.addEventListener('click', onChangeScreen);
  });
  loadBookmarks();
};
