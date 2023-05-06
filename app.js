
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

// Initialize the Agora SDK with your App ID
client.init('a3047c9acb804453b33e7ce7aeb18bb6');

// Create and publish the local stream
async function publish() {
  const localStream = await AgoraRTC.createStream({
    audio: true,
    video: true,
    screen: true,
  });
  await localStream.init();
  await client.publish(localStream);
}
publish()

// Subscribe to remote streams
client.on('stream-added', async (event) => {
  const remoteStream = event.stream;
  await client.subscribe(remoteStream);
});

// Handle remote stream events
client.on('peer-leave', (event) => {
  const remoteStream = event.stream;
  remoteStream.stop();
});

// Display the remote stream in the video element
const remoteStream = document.getElementById('remote-stream');
remoteStream.srcObject = remoteStream.stream;
