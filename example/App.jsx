import { SweetAlert2Provider } from 'rn-sweetalert2'
import ExampleScreen from './src/ExampleScreen'

export default function App() {
  return (
    <SweetAlert2Provider>
      <ExampleScreen />
    </SweetAlert2Provider>
  )
}
