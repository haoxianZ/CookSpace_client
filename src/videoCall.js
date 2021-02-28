import React, { useEffect, useState } from 'react';
import {Jutsu} from 'react-jutsu'
import VoiceControl from './voiceCommand'

function VideoCall() {
const roomName = 'our cooking app'
const userFullName = 'thinkfulProject'

  return (
    <div className="videoCall">
      <h2>{userFullName}'s Room</h2>
      <Jutsu
      roomName={roomName}
      />
      {/* let user click to start voice command */}
      <VoiceControl/>
    </div>
  );
}

export default VideoCall;
