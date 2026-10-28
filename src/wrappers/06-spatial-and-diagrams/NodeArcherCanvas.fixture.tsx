import { NodeArcherCanvas } from './NodeArcherCanvas';

export default {
  'Pipeline Diagram': (
    <NodeArcherCanvas
      nodes={[
        { id: 'node-1', label: 'Draft', x: 0, y: 100 },
        { id: 'node-2', label: 'Automated Check', x: 200, y: 100 },
        { id: 'node-3', label: 'Human Review', x: 400, y: 100 },
        { id: 'node-4', label: 'Approved', x: 600, y: 100 },
      ]}
      edges={[
        { from: 'node-1', to: 'node-2', label: 'Pass' },
        { from: 'node-2', to: 'node-3', label: 'Review' },
        { from: 'node-3', to: 'node-4', label: 'Approve' },
      ]}
    />
  ),
  'With Rejection Path': (
    <NodeArcherCanvas
      nodes={[
        { id: 'node-1', label: 'Draft', x: 0, y: 100 },
        { id: 'node-2', label: 'Automated Check', x: 200, y: 100 },
        { id: 'node-3', label: 'Rejected', x: 400, y: 100 },
      ]}
      edges={[
        { from: 'node-1', to: 'node-2', label: 'Pass' },
        { from: 'node-2', to: 'node-3', label: 'Fail' },
      ]}
    />
  ),
}