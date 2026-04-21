import { SimpleAlertProvider } from 'simple-reactnative-alerts'
import ExampleScreen from './src/ExampleScreen'

export default function App() {
  return (
    <SimpleAlertProvider>
      <ExampleScreen />
    </SimpleAlertProvider>
  )
}
