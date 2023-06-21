import React from "react";

interface Audio {
    
    fileTypeLowecase: string;
    audioFileUpload: {
        mediaItemUrl:string;
        id: string;
    };
            

}
interface Props {
    audioData: Audio;
  }

const AudioPlayer: React.FC<Props>  = ({audioData})=> {
    return (

        <>
        <div className="audioParent">
        <audio controls key={audioData.audioFileUpload.id}>
            <source src={audioData.audioFileUpload.mediaItemUrl} type={`audio/${audioData.fileTypeLowecase}`}/>
            Your browser does not support the audio element.
            </audio>

        </div>

            
        </>
    )
}
export default AudioPlayer