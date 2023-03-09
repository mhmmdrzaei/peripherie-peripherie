import React from "react";

const AudioPlayer = ({audioData})=> {
    return (

        <>
            <audio controls>
            <source src={audioData.audioFileUpload.mediaItemUrl} type={`audio/${audioData.fileTypeLowecase}`}/>
            Your browser does not support the audio element.
            </audio>
                
                
        </>
    )
}
export default AudioPlayer