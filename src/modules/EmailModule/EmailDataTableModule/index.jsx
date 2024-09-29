import { sksLayout } from '@/layout';
import sksPanel from '@/modules/sksPanelModule';

export default function EmailDataTableModule({ config }) {
  return (
    <sksLayout>
      <sksPanel config={config}></sksPanel>
    </sksLayout>
  );
}
