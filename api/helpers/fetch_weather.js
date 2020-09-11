import fetch from 'node-fetch';

const get_data = async city => {
  try {
    const host = process.env.API_URL,
    APIKey = process.env.APIKey;

    const url = `${host}${city}&appid=${APIKey}`
    const response = await fetch(url);
    const data = await response.json();
  } catch (error) {
    console.log('Error occured while fetching..', error)
  }

  return data;
}

export default get_data;
