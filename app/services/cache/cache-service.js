import RNFetchBlob from 'rn-fetch-blob'

export function canRequestCacheForKey(key, fileCacheMap) {
    const currentStatus = fileCacheMap[key];
    return (
        // If there's no current status, then we haven't tried caching the file yet
        !currentStatus ||
        // If we're currently trying to cache the file or have already cached it, don't send a request to cache it again
        (currentStatus.type !== "FileCacheInProgress" &&
            currentStatus.type !== "FileCacheSucceeded")
    )
}

export function setCacheStatus(url, status, state) {
    return {
        ...state,
        fileCacheMap: {
            ...state.fileCacheMap,
            [url]: status
        }
    }
}

export function handleFileCacheRequest(url) {
    // this.addRequestToQueue(url);
    const name = '' + Math.random().toString(36).substr(2, 9)
    RNFetchBlob.config({ path: RNFetchBlob.fs.dirs.DocumentDir + "/" + name + '.mp3' })
        .fetch("GET", url)
        .then(result => {
            console.log(result.path())
            // props.completeFileCacheActions(url, result.path());
            // this.removeRequestFromQueue(url);
        })
        .catch((error) => {
            console.log(error)
            // this.props.failFileCach(url);
            // this.removeRequestFromQueue(url);
        });
}

export function addRequestToQueue(url, requestQueue) {
    const newQueue = requestQueue.concat([url])
    return newQueue
}

export function removeRequestFromQueue(element, requestQueue) {
    const newQueue = requestQueue.filter(el => el !== element);
    return newQueue
}