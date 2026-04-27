// Youtube Videos - Check href info and remove if not in safe list
// Youtube Shorts - Remove all
// Youtube Sponsered Posts - Remove all

//
// Initalization
//

console.log("Content Running");

// Create observer to watch for page reloads
const observer = new MutationObserver(() => {
  processPage();
});

// Set an observer to watch all of the document's decendents
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

processPage();

//
// Helpers
//

// This function does the main processing of going through the videos and checking channels
function processPage() {
  removeJunk();
  processRelatedVideos();
  processHomePageVideos();
}

// This function processes each home page video aginst a set channel list
function processHomePageVideos() {
  const videos = document.querySelectorAll("ytd-rich-item-renderer");
  for (const video of videos) {
    // If the slot is actually an ad remove it
    if (video.querySelector("ytd-ad-slot-renderer")) {
      video.remove();
      continue;
    }

    // Get channel content
    const channelLink = video.querySelector('.ytLockupMetadataViewModelMetadata a[href^="/@"]');
    const channelName = channelLink?.getAttribute("href") ?? "";
    console.log(channelName);
  }
}

// This function processes each related video aginst a set channel list
function processRelatedVideos() {
  const videos = document.querySelectorAll("ytd-video-renderer");
  for (const video of videos) {
    const thumbnailElement = video.querySelector("a#thumbnail");
    const thumbnailLink = thumbnailElement?.getAttribute("href") ?? "";

    // If this video has a /shorts/ in its href then it is an embedded short so remove it
    if (thumbnailLink.includes("/shorts/")) {
      video.remove();
      continue;
    }

    // Get channel content
    const channelElement = video.querySelector("a#channel-thumbnail");
    const channelName = channelElement?.getAttribute("href") ?? "";
    console.log(channelName);
  }
}

// This function removes all useless sections of the youtube feed stuff like ads, shorts and other junk
function removeJunk() {
  const stuffToRemove: string[] = [
    "yt-horizontal-list-renderer",
    "grid-shelf-view-model",
    "ytd-search-pyv-renderer",
    "ytd-horizontal-card-list-renderer",
    "ytd-rich-shelf-renderer",
    "ytd-player-legacy-desktop-watch-ads-renderer",
    "#spinnerContainer",
  ];

  for (const toRemove of stuffToRemove) {
    const listOfItems = document.querySelectorAll(toRemove);
    for (const item of listOfItems) {
      item.remove();
    }
  }
}
