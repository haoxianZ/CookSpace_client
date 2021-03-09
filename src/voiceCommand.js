import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import React, { useState } from 'react'
export default function VoiceControl(){
    const [message, setMessage] = useState('')
    const commands = [
      {
        command: 'I would like to order *',
        callback: (food) => setMessage(`Your order is for: ${food}`)
      },
      {
        command: 'The weather is :condition today',
        callback: (condition) => setMessage(`Today, the weather is ${condition}`)
      },
      {
        command: 'My top sports are * and *',
        callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
      },
      {
        command: 'Pass the salt (please)',
        callback: () => setMessage('My pleasure')
      },
      {
        command: ['Hello', 'Hi'],
        callback: ({ command }) => {setMessage(`Hi there! You said: "${command}"`)
      console.log(command)},
        matchInterim: true
      },
      {
        command: 'Beijing',
        callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
        // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2
      },
      {
        command: ['eat', 'sleep', 'leave'],
        callback: (command) => setMessage(`Best matching command: ${command}`),
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2,
        bestMatchOnly: true
      },
      {
        command: 'clear',
        callback: ({ resetTranscript }) => resetTranscript()
      }
    ]
  
    const { transcript, resetTranscript } = useSpeechRecognition({commands})
  
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }
    SpeechRecognition.startListening({ continuous: true })

    return (
      <div>
        <h4> this is the command recorded</h4>
        <p>{message}</p>
        <h4>rubbish</h4>
        <p>{transcript}</p>
      </div>
    )

}