import PortalLayout from '../../layouts/portal'
import { WithPageLayout } from '../../interfaces/with-page-layout';

const Portal: WithPageLayout = () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      Test Page
    </main>
  )
}

Portal.PageLayout = PortalLayout;

export default Portal