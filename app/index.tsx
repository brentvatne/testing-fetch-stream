import { Text, View, Button } from "react-native";
import { fetch } from 'expo/fetch';

async function fetchData() {
  const resp = await fetch('https://httpbin.org/drip?numbytes=512&duration=2', {
    headers: { Accept: 'text/event-stream' },
  });
  if (!resp.ok || !resp.body) {
    console.error('Error fetching data');
    return;
  }

  const reader = resp.body.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }
  const buffer = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  console.log(buffer.length); // 512
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button onPress={fetchData} title="Fetch data" />
    </View>
  );
}
