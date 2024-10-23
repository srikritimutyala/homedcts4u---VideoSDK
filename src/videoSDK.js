// videoSDK.js
import fetch from 'node-fetch';

async function createRoom(VIDEOSDK_TOKEN) {
  const options = {
    method: "POST",
    headers: {
      "Authorization": VIDEOSDK_TOKEN,
      "Content-Type": "application/json",
    },
  };

  try {
    const url = 'https://api.videosdk.live/v2/rooms';
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
}

export { createRoom };
