import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import routes from './routes/routes'
import * as Toast from '@radix-ui/react-toast'
import { PatientsProvider } from './store/PatientsContext'


const router = createBrowserRouter(routes)

export default function App() {
  return (
    <PatientsProvider>
      <Toast.Provider swipeDirection="right">
        <RouterProvider router={router} />
        <Toast.Viewport className="toast-viewport" />
      </Toast.Provider>
    </PatientsProvider>
  )
}