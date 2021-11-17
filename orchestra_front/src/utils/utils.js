function convertTimeElement(timeElement){
    let time = timeElement
    let miliseconds = time%1000
    time /= 1000
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time - (hours * 3600)) / 60)
    let seconds = parseInt(time - (hours * 3600) - (minutes * 60))
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    if(miliseconds < 10){ miliseconds = "00" + miliseconds; }
    else if(miliseconds < 100){ miliseconds = "0" + miliseconds; }
    let endTime = hours + ':' + minutes + ':' + seconds + ':' + miliseconds
    return endTime
}


function convertTimeElementArray(TimeElement){
    let time = TimeElement
    let miliseconds = time%1000
    time /= 1000
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time - (hours * 3600)) / 60)
    let seconds = time - (hours * 3600) - (minutes * 60)
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return [parseInt(hours), parseInt( minutes), parseInt( seconds), parseInt( miliseconds)]
}

export  {convertTimeElement, convertTimeElementArray}
